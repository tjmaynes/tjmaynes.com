---
description: >-
  This page will be discussing an analogy I use to depict what (I believe) a
  monad is.
---

# The Monad Analogy

I've been using the Either and Option monads on various projects \(in different runtimes\) over the last couple of years. I like utilizing these monads as a way of handle errors from external systems. However, when it comes time to introducing someone new to these monads, I'm unable to describe what makes a monad a _monad_. However, after doing some research I found an analogy that encapsulates what I believe to be the spirit of what makes a monad a _monad_.

> A monad is an abstract data type that allows programmers to chain complex, nondeterministic operations.

An abstract data type \(ADT\) is a kind of data type defined by it's behavior from the point of view from a user. Since an ADT is created from the user's point of view, it's internal presentation is hidden, thus enabling us to focus more on behavior than caring what data is being held \(it could be a String, Integer, YourCustomObject, etc\).

The ability to chain operations is the _functor_ attribute of monads. In category theory, a _functor_ is a something has enables /mappable/ behavior, such as iterating over a list of objects/strings/etc. To enable the chaining of /nondeterministic/ operations, two functions are found on monadic types: _return_ and _bind_.

The _return_ function _places_ a value into a monadic context, whereas the _bind_ function _applies_ a function in a monadic context.

> _Note_: Depending on the programming language or library that you are using, the _return_ function will typically be represented through the _constructor_ method and _bind_ may have a different name such as _flatMap_ or _map_.

Let's write an example of monads in action using [Kotlin](https://kotlinlang.org/) and a functional programming library called [Arrow](https://arrow-kt.io/docs/apidocs/arrow-core-data/arrow.core/-option/). A quick real-world example is when I'm trying to eat a donut from my favorite donut place in the Upper West Side, [Daily Provisions](https://www.dailyprovisionsnyc.com/menus/). Let's write a function that encapsulates the operation of getting a donut from Daily Provisions and, for simplicity, we'll choose the Option monad as its return type.

```text
fun getDonut(time: Date): Option<Donut> =
  if (donutsAreAvailable(time)) {
    Some(Donut())
  } else {
    None
  }
```

The above function could return either my donut or nothing depending on some external factor \(time\). When we pass a value into the Some function, we are effectively using the _return_ trait of a monadic type. The None function is a type of Option that returns...nothing! Next, do something with...something.

```text
val eatADonut = getDonut(timeBefore11am)
  .map { donut -> donut.eat() }
```

The above variable gets a donut and if a donut is found it will _map_, or _bind_, to a function that eats the donut. If the _getDonut_ returns a None, because I overslept and missed the opportunity to get a donut, then our _map_ method will never get called.

