+++
title = "Building a Health API endpoint for your Rust microservice"
description = "In this blog post, we are going to be adding a Health API endpoint to a Rust-based microservice and discuss what kind of information you should expect to see in your health endpoint response." 
date = "2021-09-12 19:52:44"
draft = true

[taxonomies]
tags=["rust", "kubernetes", "microservices"]

[extra]
author = "tjmaynes"
+++
To prepare your application for a [Kubernetes](https://kubernetes.io/) deployment, you need to provide a mechanism for telling Kubernetes whether your application is ready to serve requests ([readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command)) and is still alive after deployment (liveness). You can accomplish this availablity creating an HTTP-based `/health` endpoint. In this blog post, we are going to be adding a [Health API endpoint](https://microservices.io/patterns/observability/health-api.html) to a [Rust](https://actix.rs/)-based microservice and discuss *what kind of information* you should expect to see in your health check endpoint response.

Before embarking on our health journey, we need to make sure we understand *why* we are building a Health API endpoint in the first place.

## Background
Due to the highly connected nature of the world we live in today, people expect the services that power their favorite mobile apps to *always* work. However, some times these services don't always work 100% of the time. Maybe, an outage at a datacenter occurs, or more likely, a software deployment was botched. The more complex a system, the harder it becomes to maintain. As said famously by [Edward A. Murphy Jr.](https://en.wikipedia.org/wiki/Edward_A._Murphy_Jr.) - *"Anything that can go wrong will go wrong."* In practice, we do our best to take these words seriously and try to build software with [availability](https://www.blameless.com/sre/availability-maintainability-reliability-whats-the-difference) in mind.

Since many things can go wrong in a production enviroment, we tend to try to control issues that are considered [known unknowns](https://www.overops.com/blog/continuous-reliability-handling-known-unknowns-and-unknown-unknowns/) as best we can. One of the things that can go wrong in production is pushing a change to production that causes an outage (the dreaded `4xx & 5xx status codes`). To reduce the likelihood of these software developers tend to use patterns like test-driven development, Continuous Integration and automation (and in combination Continuous Delivery) to reduce the likelihood of production outages. However, more work will need to be done to ensure our production environments themselves know whether your deployed application is responsive or not. One such work, as you may have guessed, is Health API pattern.

### The Health API Pattern
The [Health API pattern](https://microservices.io/patterns/observability/health-api.html) is a microservices pattern for ensuring that a deployed application is up and running through its lifetime in a production environment. The pattern is an API request that returns either a `200 status` with a response body or a `500 status` with a response body containing the problem reason.

Usually when designing this endpoint, it's important to succeed and fail for the *right* reasons. What *right* looks like to you depends on your service. You should consider what dependencies your application relies on and think of different ways these dependencies can fail on you in production. Generally, I try to write my health API to fail my health check request when our service is unable to connect to it's own [backing services](https://12factor.net/backing-services) (like a database, cache service, etc) and let the client know why it failed via a json-based body response (for a developer to read, understand and debug).

Kubernetes allows you to use both approaches for it's [liveness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command) and [readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes) probes. A liveness probe is used periodically by Kubernetes to detect if you're API service can *continue* serving requests, whereas a readiness prob is used by Kubernetes to detect whether your API service is *ready* to serve requests.

Okay, with the background out of the way, let's make our way to building a health check endpoint for our Actix-based microservice. If you'd like to learn more about the health check pattern, take a look at this [here](https://dzone.com/articles/an-overview-of-health-check-patterns).

***BTW** if you'd like to follow along with code by your side, I've made the source code for this project available on [GitHub](https://github.com/tjmaynes/health-rust).*

## Getting healthy

Before getting started, please make sure that you have [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) and [rust](https://www.rust-lang.org/) installed on your machine. *The easiest way to install these tools is to use [rustup](https://rustup.rs/).*

Next, let's go ahead and open your favorite [terminal](https://github.com/alacritty/alacritty) and create a new Cargo project via `cargo new health-check-rust --bin`. The `--bin` flag will tell Cargo to automatically create a `main.rs` file to let Cargo know that this project is not a library but will produce an executable.

Back in your terminal, let's make sure that are project is runnable by running `cargo run`. You should get back something like the below text after you've run this command. *Easy-peezee, right?*

```bash
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/health-endpoint`
Hello, world!
```

Ok, now that we know we're able to run the application, let's open up your favorite [text editor](https://code.visualstudio.com/) or [IDE](https://www.jetbrains.com/idea/) and add the `actix-web` dependency to the `Cargo.toml` file. ***Note**: If you haven't already downloaded official Rust plugins for your editor of choice, please do so now.*

Let's go ahead and add our `actix-web` web framework dependency to our `Cargo.toml` file by adding the following line under `[dependencies]`:
```toml
[dependencies]
actix-web = "3.3.2"
```
***Note**: at the time of writing this blog post, the latest stable release for `actix-web` is `3.3.2`.*

After running `cargo install --path .`, you should see something like the following:
```bash
...
    Finished release [optimized] target(s) in 1m 14s
  Installing /Users/tjmaynes/.cargo/bin/healthcheck-endpoint
   Installed package `healthcheck-endpoint v0.1.0 (/Users/tjmaynes/workspace/tjmaynes/healthcheck-endpoint)` (executable `healthcheck-endpoint`)
```

## Conclusion