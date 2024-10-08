+++
title = "A Functional Approach: Error Handling"
date = "2020-01-15T12:00:00+01:00"
description = "In this blog post we'll be discussing some object-oriented error handling strategies that will iterate into the Either monad."
draft = true

[extra]
author = "tjmaynes"
+++
Recently, I've been asking myself, "How can this function fail?" This question has led to a different style of programming that I've chosen to utilize in various problem solving scenarios (mostly around integrations with external systems). Let's take a look at the following function written in [Kotlin](https://kotlinlang.org/docs/reference):

```kotlin
fun add1(x: Int): Int = x + 1
```

This function is pretty straightforward, but let's say what it's intent is in a sentence: "Function add1 takes an Integer element 'x' and returns the Integer plus one." We can guarentee that every time this function is called with any integer value it will return the same result.

```kotlin
assertEquals(1, add1(0))
assertEquals(2, add1(1))
assertEquals(3, add1(2))
...
```

From a functional programming perspective, the `add1` function would be considered [pure](https://en.wikipedia.org/wiki/Pure_function). A **pure** function is a function that has the same return value for the same input value and does not contain any side effects. The guarentees of a pure function enable software developers to write safer software. But what happens when you need to introduce a side effect into your application. Side effects are not necessarily a bad thing, it means your program is *useful*. Useful features of an application may include:
- User input
- Talking to a database or external service
- Receiving command-line arguments
- Reading environment variables

While side effects are useful, they also come at a cost. Anytime we introduce a side effect into our software, we incur the cost of an additional way that our application can fail. Let's dive into what happens when we need to write a our own class for doing for [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) fetching an item by their id from a database (a common feature in a  application) using Kotlin.

```kotlin
interface Repository {
  fun <T> getById(id: String): T 
}

class DefaultRepository(val databaseDriver: DatabaseDriver): Repository {
  fun <T> getById(id: String): T =
    databaseDriver.getById(id)
}
```

This relatively simple function looks up an item `T` in a database by it's `id` and returns the item `T` using the database driver. But, what happens when the item is not in the database? If the item is not in the database, then our function will not return our item and thus an exception should occur. Let's rethink our approach to this function. Instead of our `getById` function returning an type `T`, what if it returned an optional type `T` as seen below:

```kotlin
...
fun <T> getById(id: String): T? =
  databaseDriver.getById(id) ?: null
...
```

This "optional" refactor solves our missing item problem, however, is doesn't solve a another problem with external dependencies...*what happens if we can't connect to our database?* Our function needs to account for this, or else, the caller of the function will have to manage the nasty surprise themselves. In this particular situation, we should be able to manage this for the caller without the caller having to manage their own try/catch statement to handle an exception our `getById` function can throw.

Let's assume our `databaseDriver` will throw an exception for a database connection issue (ie `ConnectionException`) and refactor our code to use a try/catch statement to capture our database driver's connection failure exception and since we are expecting an optional `T` to be returned let's also return `null` when our database connection drops.

```kotlin
...
fun <T> getById(id: String): T? =
  try {
    databaseDriver.getById(id) ?: null
  } catch (e: ConnectionException) {
    null
  }
...
```
This works pretty well for us. We've removed the suprising throwable functionality from our `getById` function and are now back to returning a simple optional `T` value. However, 

```kotlin
val person: Person? = personRepository.getById("some-id")
if (person.isNullOrEmpty()) {
  // do something
} else {
  // do something else
}
```

Since the caller of the `getById` function is unable to make a decision. For instance, if our `getById` function could tell us that a database connection issue occurred then the caller could have the option to apply retry logic, instead of handling the absence an object.

With the optional approach, we have given the caller of this method a not so "truthy" return value. I

I think we can do a better job giving more information back to the caller of this method. Let's rewrite the function using two callbacks: `onSuccess` and `onFailure`.

```kotlin
fun <T> getById(id: String, onSuccess: (T?) -> Void, onFailure: (Exception) -> Void) {
  try {
    onSuccess(databaseDriver.getById ?: null)
  } catch (e: Exception) {
    onFailure(e)
  }
}
```

The above function says "given an id, i'll let you know when a success or failure is given". The function signature tells us (without looking at the implementation code) that our `getById` method can succeed or fail for different reasons. While this code is functionally more correct, it is harder to use now since we are relying on callbacks.

Let's look at how this is harder to use now. Previously we were able to get our value in one line. As so...

The above style of using our getById function is easier to reason about since it following a conventional style of programming that most developers are used to. But with callbacks, we have to work with our function this way...

```kotlin
getById("some-id", { result ->
  // do something
}, { exception ->
  // do something else
})
```

What if we had a type that could represent these types...

## Enter the Either Monad
The *Either* monad is a monadic data type that allows you to encapsulate a result that returns either one possible outcome or another possible outcome.

> A **monad** is an abstract data type that enables programmers to chain complex, nondeterministic operations in a readable way.

An abstract data type (ADT) is a kind of data type defined by it's behavior from the point of view from a user. Since an ADT is created from the user's point of view, it's internal presentation is hidden, thus enabling us to focus more on behavior than caring what data is being held. For instance, an `array` can be thought of as an ADT, it holds a collection of values (of type `T`) and can be mapped over, filtered or reduced into a some other type `U`.

The ability to chain operations is the functor attribute of monads. In category theory, a functor is a something has enables mappable behavior, such as iterating over a list of objects/strings/etc. To enable the chaining of nondeterministic operations, two functions are found on monadic types: return and bind.

The return function places a value into a monadic context, whereas the bind function applies a function in a monadic context.

Note: Depending on the programming language or library that you are using, the return function will typically be represented through the /constructor/ method and bind may have a different name such as flatMap or map.

Since Kotlin does not include an Either monad is it's standard library, we'll need to pull in a functional programming library called [ArrowKt](https://arrow-kt.io/docs/core/) for our example code.

```kotlin
fun <T> getById(id: String): Either<RepositoryError, T> =
  try {
    val result = databaseDriver.getById(id)

    if (!result.isNullOrEmpty()) Either.Right(result)
    else Either.Left(RepositoryError.NotFound)
  } catch (e: Exception) {
    Either.Left(RepositoryError.Unknown(e.localizedMessage))
  }
```

When we `map`, equivalently `bind`, over our list, we gain the ability to safely access the `Right` results from our country variable. If we have any `Right` values then we transform/apply the `capitalize` method to all of our `Right` values. If we have any `Left` values then we will log exceptions.

```kotlin
when(val result = getById("some-id")) {
  is Either.Right -> // do something
  is Either.Left -> // handle error
}
```
