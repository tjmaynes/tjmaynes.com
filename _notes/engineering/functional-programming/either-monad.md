---
description: >-
  This page will be discussing some common object-oriented error handling
  strategies and then discuss a functional approach called the Either monad.
---

# The Either Monad

We can utilize the [Either monad](https://github.com/tjmaynes/tjmaynes.github.io/blob/blog-as-notebook/_posts) to write more correct code. Let's take a look at the following function written in [Kotlin](https://kotlinlang.org/docs/reference/):

```text
fun add1(x: Int): Int = x + 1
```

This function is pretty straightforward, but let's say what it's intent is in a sentence: "Function add1 takes an Integer element 'x' and returns the Integer plus one." We can guarentee that every time this function is called with any integer value it will return the same result.

```text
assertEquals(1, add1(0))
assertEquals(2, add1(1))
assertEquals(3, add1(2))
...
...
```

From a functional programming perspective, this function would be considered [pure](https://en.wikipedia.org/wiki/Pure_functionXS). A pure function is a function that has the same return value for the same input value and does not contain any side effects. The guarentees of a pure function enable software developers to write safer software. But what happens when you need to introduce a side effect into your application. Side effects are not necessarily a bad thing, it's actually great thing that they occur; it means your program is useful. Useful features of an application, may include \(but not limited to\):

* User input
* Talking to a database or external service
* Receiving command-line arguments
* Reading environment variables

While usefulness has its rewards, it also comes at a cost. Anytime we introduce a side effect into our software, we introduce additional ways for our application to fail. Let's take a look at what happens when we write a function that attempts to fetch a thing \(T\) from a database.

```text
fun <T> getById(id: String): T =
  databaseDriver.getById(id)
```

This simple function takes an id and returns a thing that is fetched from a database using a database driver. But, what happens when the thing is not in the database? If the thing is not in the database, then our function will not return our thing. Maybe we should rethink our approach to this function.

```text
fun <T> getById(id: String): T? =
  databaseDriver.getById(id) ?: null
```

There! That's it! We changed our return type to return an optional thing. This is convenient for us because that let's the caller of this function decide what to do when a thing is not found in our database.

But, what happens if we can't find our thing because we were able to connect to our database?

Let's assume our getById function provided by databaseDriver throws an exception. Unfortunately we have not managed what happens when our internal dependency throws an exception. Let's go through two different approaches to error handling throwable functions.

A common pattern for dealing with functions that throw, is to utilize the Try...catch pattern. As seen below...

```text
fun <T> getById(id: String): T? =
  try {
    databaseDriver.getById(id) ?: null
  } catch (e: Exception) {
    null
  }
```

This works pretty well for us. We've removed the "invisible"/implicit throwable from the function and are now back to returning a simple optional T value. However, this simplicity has come at a price.

With the above approach we have given the caller of this method a not so "truthy" return value. If an exception occurs, the caller of this method will not know, based on the name of the function, if the item was found or something else has happened \(unable to connect to database, table not found, etc\).

I think we can do better job giving more information back to the caller of this method. Let's rewrite the function using two callbacks: onSuccess and onFailure.

```text
fun <T> getById(id: String, onSuccess: (T?) -> Void, onFailure: (Exception) -> Void) {
  try {
    onSuccess(databaseDriver.getById ?: null)
  } catch (e: Exception) {
    onFailure(e)
  }
}
```

The above function says "given an id, we could be in a success or failure state". The function signature tells us \(without looking at the implementation code\) that our getById method can succeed or fail for different reasons. While this code is functionally more correct, it is harder to use now since we are relying on callbacks.

Let's look at how this is harder to use now. Previously we were able to get our value in one line. As so...

```text
val result: AnObject? = getById("some-id")
if (result != null) {
  // do something
} else {
  // do something else
}
```

The above style of using our getById function is easier to reason about since it following a conventional style of programming that most developers are used to. But with callbacks, we have to work with our function this way...

```text
getById("some-id", { result ->
  // do something
}, { exception ->
  // do something else
})
```

What if we had a type that could represent these types...

### Enter The Either Monad

The _Either_ monad is a monadic data type that allows you to encapsulate a result that returns either one possible outcome or another possible outcome. Since Kotlin does not include an Either monad is it's standard library, we'll need to pull in a functional programming library called [Arrow](https://arrow-kt.io/docs/core/) for our example code.

```text
fun <T> getById(id: String): Either<RepositoryError, T> =
  try {
    val result = databaseDriver.getById(id)
    if (result) {
      Either.Right(result)
    }
    Either.Left(RepositoryError.NotFound)
  } catch (e: Exception) {
    Either.Left(RepositoryError.Unknown(e.localizedMessage))
  }
```

When we _map_, equivalently _bind_, over our list, we gain the ability to safely access the /Right/ results from our country variable. If we have any /Right/ values then we transform/apply the /capitalize/ method to all of our /Right/ values. If we have any /Left/ values then we will log exceptions.

```text
when(val result = getById("some-id")) {
  is Either.Right -> // do something
  is Either.Left -> // handle error
}
```

