+++
title = "A Functional Approach: Error Handling"
date = "2020-01-15T12:00:00+01:00"
description = "In this blog post we'll be discussing some object-oriented error handling strategies that will iterate into the Either monad."
draft = true

[taxonomies]
tags=["kotlin", "functional programming"]

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

From a functional programming perspective, the `add1` function would be considered [pure](https://en.wikipedia.org/wiki/Pure_function). A **pure** function is a function that has the same return value for the same input value and does not contain any side effects. The guarentees of a pure function enable software developers to write safer software. But what happens when you need to introduce a side effect into your application. Side effects are not necessarily a bad thing, it's actually great thing that they occur; it means your program is *useful*. Useful features of an application, may include (but not limited to):
- User input
- Talking to a database or external service
- Receiving command-line arguments
- Reading environment variables

While usefulness has its rewards, it also comes at a cost. Anytime we introduce a side effect into our software, we introduce additional ways for our application to fail. Let's take a look at what happens when we write a function that attempts to fetch a thing `<T>` from a database.

```kotlin
fun <T> getById(id: String): T =
  databaseDriver.getById(id)
```

This simple function takes an id and returns a thing that is fetched from a database using a database driver. But, what happens when the thing is not in the database? If the thing is not in the database, then our function will not return our thing. Maybe we should rethink our approach to this function.

```kotlin
fun <T> getById(id: String): T? =
  databaseDriver.getById(id) ?: null
```

There! That's it! We changed our return type to return an optional thing. This is convenient for us because that let's the caller of this function decide what to do when a thing is not found in our database.

But, what happens if we can't find our thing because we were able to connect to our database?

Let's assume our getById function provided by databaseDriver throws an exception. Unfortunately we have not managed what happens when our internal dependency throws an exception. Let's go through two different approaches to error handling throwable functions.

A common pattern for dealing with functions that throw, is to utilize the Try...catch pattern. As seen below...

```kotlin
fun <T> getById(id: String): T? =
  try {
    databaseDriver.getById(id) ?: null
  } catch (e: Exception) {
    null
  }
```

This works pretty well for us. We've removed the implicit throwable from the function and are now back to returning a simple optional `T` value. However, 

```kotlin
val result: Object? = getById("some-id")
if (result.isNullOrEmpty()) { // we can only check for nullability
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