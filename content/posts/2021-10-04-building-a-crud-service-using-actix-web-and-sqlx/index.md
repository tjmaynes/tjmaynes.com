+++
title = "Building a CRUD Service using Actix-web and SQLX"
description = "In this blog post, we are going to be adding a Health API endpoint to a Rust-based microservice and discuss what kind of information you should expect to see in your health endpoint response." 
date = "2021-10-04 19:52:44"
draft = true

[extra]
author = "tjmaynes"
+++
To prepare your microservice for a [Kubernetes](https://kubernetes.io/) deployment, you need to provide a way for your service to tell Kubernetes whether your service is ready to serve requests ([readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command)) and is still alive after deployment (liveness). One way that you can accomplish this is by implementing the [Health API endpoint](https://microservices.io/patterns/observability/health-api.html) pattern.

In this blog post, we are going to be adding a `/health` endpoint to a [Rust](https://actix.rs/)-based microservice and discuss *what kind of information* you should expect to see in your health API endpoint response.

> ***Note:** The blog post is meant to be read by folks who already have a basic understanding of Rust ownership and how a Kubernetes `deployment` resource works.*

Before embarking on our health journey, we need to make sure we understand *why* we are building a Health API endpoint in the first place.

## Background
Due to the highly connected nature of the world we live in today, people expect the services that power their favorite mobile apps to *always* work. However, some times these services don't always work 100% of the time. Maybe, an outage at a datacenter occurs, or more likely, a software deployment was botched. The more complex a system, the harder it becomes to maintain. As said famously by [Edward A. Murphy Jr.](https://en.wikipedia.org/wiki/Edward_A._Murphy_Jr.) - *"Anything that can go wrong will go wrong."* In practice, we do our best to take these words seriously and try to build software with [availability](https://www.blameless.com/sre/availability-maintainability-reliability-whats-the-difference) in mind.

Since many things can go wrong in a production enviroment, we tend to try to control issues that are considered [known unknowns](https://www.overops.com/blog/continuous-reliability-handling-known-unknowns-and-unknown-unknowns/) as best we can. One of the things that can go wrong in production is pushing a change to production that causes an outage (the dreaded `4xx` and `5xx` status codes). To reduce the likelihood and impact of these issues, software developers tend to use patterns like test-driven development, Continuous Integration and automation (and in combination Continuous Delivery) to reduce the likelihood of production outages. However, more work will need to be done to ensure our production environments themselves know whether your deployed application is responsive or not. One such work, as you may have guessed, is Health API pattern.

### The Health API Pattern
The [Health API pattern](https://microservices.io/patterns/observability/health-api.html) is a microservices pattern for ensuring that a deployed application is up and running through its lifetime in a production environment. It involves creating an API endpoint that responds with either a `200 status` or a `500 status` with a response body.

Usually when designing this endpoint, it's important to succeed and fail for the *right* reasons. What *right* looks like to you depends on your service. You should consider what dependencies your application relies on and think of different ways these dependencies can fail on you in production. Generally, I try to write my health API to fail when our service is unable to connect to it's own [backing services](https://12factor.net/backing-services) (like a database, caching layer, etc) and let the client know why it failed via a json-based body response (for a developer to read, understand and debug).

Kubernetes allows you to use both approaches for it's [liveness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command) and [readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes) probes. A liveness probe is used periodically by Kubernetes to detect if you're API service can *continue* serving requests, whereas a readiness probe detects whether your API service is *ready* to serve requests.

Okay, with the background out of the way, let's make our way to building a health API endpoint for our actix-web microservice. If you'd like to learn more about the health API pattern, take a look [here](https://dzone.com/articles/an-overview-of-health-check-patterns).

***BTW** if you'd like to follow along with code by your side, I've made the source code for this project available on [GitHub](https://github.com/tjmaynes/health-rust).*

## Getting healthy

Before getting started, please make sure that you have [cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) and [rust](https://www.rust-lang.org/) installed on your machine. *The easiest way to install these tools is to use [rustup](https://rustup.rs/).*

Next, let's go ahead and open your favorite [terminal](https://github.com/alacritty/alacritty) and create a new Cargo project via `cargo new my-service --bin`. The `--bin` flag will tell Cargo to automatically create a `main.rs` file to let Cargo know that this project is not a library but will produce an executable.

Back in your terminal, let's make sure that are project is runnable by running `cargo run`. You should get back something like the below text after you've run this command. *Easy-peezee, right?*

```bash
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/health-endpoint`
Hello, world!
```

Ok, now that we know we're able to run the application, let's open up your favorite [text editor](https://code.visualstudio.com/) or [IDE](https://www.jetbrains.com/idea/) and add the `actix-web` dependency to the `Cargo.toml` file. ***Note**: If you haven't already downloaded official Rust plugins for your editor of choice, please do so now.*

### Creating the initial service

Let's go ahead and add our `actix-web` web framework dependency to our `Cargo.toml` file by adding the following line under `[dependencies]`:

```toml
[dependencies]
actix-web = "4.0.0-beta.8"
```

***Note**: at the time of writing this blog post, we need to use a beta release for `actix-web` so that we can pull in the latest updates for sqlx, our Rust SQL library, which uses a newer version of the tokio runtime than current `actix-web` stable `v3.2.2`. *

After running `cargo install --path .`, you should see something like the following:

```bash
...
    Finished release [optimized] target(s) in 1m 14s
  Installing /Users/tjmaynes/.cargo/bin/my-service
   Installed package `my-service v0.1.0 (/Users/tjmaynes/workspace/tjmaynes/my-service)` (executable `my-service`)
```

Next let's go ahead and update the generated `src/main.rs` file with a new actix-web `main` function to run our service running on port `8080`:

```rust
use actix_web::{App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| { App::new() })
      .bind(("127.0.0.1", 8080))?
      .run()
      .await
}
```

Let's make sure the server is up and running with `cargo run`. In another terminal tab, run `curl -i localhost:8080/health` and you should receive a `404` status code response since we have yet to implement the `/health` API endpoint.

```bash
$ curl -i localhost:8080/health
HTTP/1.1 404 Not Found
content-length: 0
date: Wed, 22 Sep 2021 17:08:10 GMT
```

### Adding the initial health API endpoint

To build this health endpoint, we're going to need to add a new route to our actix-web app and supply a handler function to handle the request. Let's go ahead and write that logic as seen below:

```rust
use actix_web::{web, App, HttpServer, HttpResponse};

async fn get_health_status() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("application/json")
        .body("Healthy!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
           .route("/health", web::get().to(get_health_status))
           // ^^^ Our new health route uses the get_health_status request handler
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

Next, let's re-run our service via `cargo run` and in a new terminal tab run `curl -i localhost:8080/health` we should bare witness to our newly found health API endpoint.

```bash
$ curl -i localhost:8080/health
HTTP/1.1 200 OK
content-length: 8
content-type: application/json
date: Wed, 22 Sep 2021 17:16:47 GMT

Healthy!%
```

The health API now returns a `200` status code response every time an HTTP client calls `/health`. We could end this blog post here, but I want to take some time and add a more complex (real-world) scenario: what if our service relied on a database? If our service relied on a database then we'd want to make sure that our service is connected to the database throughout the lifetime of the running service. This will especially be an important aspect of our service for Kubernetes to be able probe liveness checks against.

So, let's jump in and make our microservice more complex.

## Getting healthier

For this section of the blog post, we're going to write some code for our service to connect to a SQL database, [PostgreSQL](https://www.postgresql.org/), using [sqlx](https://github.com/launchbadge/sqlx). There are a few popular Rust database libraries that we can choose from, I just happen to like sqlx's simplicity and documention.

To accomplish this let's first install `PostgreSQL`, which you learn how to do [here](https://www.postgresql.org/download/). However, one of the easiest ways to get a PostgreSQL database up and running is through Docker Compose. If you already have Docker running on your machine, you should be able to copy the following YAML into a `docker-compose.yml` file and run the `docker compose up` command to have a your PostgreSQL database up and running.

```bash
version: '3.1'

services:
  my-service-db:
    image: "postgres:11.5-alpine"
    restart: always
    volumes:
      - my-service-volume:/var/lib/postgresql/data/
    networks:
      - my-service-network 
    ports:
      - "5432:5432"
    environment:
        POSTGRES_HOST: localhost
        POSTGRES_DB: my-service
        POSTGRES_USER: root
        POSTGRES_PASSWORD: postgres

volumes:
  my-service-volume:

networks:
  my-service-network:
```

With PostgreSQL up and running, we'll need to add the `sqlx` library to our `Cargo.toml` file.

```toml
...
[dependencies]
actix-web = "3.3.2"
sqlx = { version = "0.5.7", features = [ "runtime-actix-native-tls", "postgres" ] }
```

Rust libraries have the ability to expose certain optional ["features"](https://doc.rust-lang.org/cargo/reference/features.html) to the user. For sqlx, we want to make sure we include the "postgres" feature during compilation, so we have PostgreSQL drivers to connect to our PostgreSQL database with. Next, we'll want to make sure we have the "runtime-actix-native-tls" feature included so that sqlx can support the actix framework which uses the [tokio](https://tokio.rs/) *runtime*.

> ***Note:** For newcomers to Rust, you may be thinking to yourself, "what the heck? Actix *runtime??* I thought actix-web was *just* a web framework for Rust." Well it is *and* it's much more. Since Rust was not designed to with any specific [runtime](https://en.wikipedia.org/wiki/Runtime_system) in mind, a specific runtime is needed for the problem domain that you are currently in. There are runtimes specifically for handling client/server communication needs such as [Tokio](https://docs.rs/tokio/1.12.0/tokio/), a popular event-driven, non-blocking I/O runtime. [Actix](https://docs.rs/actix/), the underlying runtime behind actix-web, is an [actor-based](https://en.wikipedia.org/wiki/Actor_model) messaging framework built on-top of the tokio runtime.*

So, now that we've added the sqlx dependency line, let's go ahead and create a database connection to our PostgreSQL database. 

### Creating the database connection

Since we have PostgreSQL up and running already, and the host, database name, user and password already set, let's export an environment variable named `DATABASE_URL` that will serve as the database connection string that will be read in by sqlx's [connect](https://docs.rs/sqlx/0.5.7/sqlx/postgres/struct.PgConnection.html#method.connect) method.

A database connection string is formatted to look something like this: `<database-type>://<user>:<password>@<db-host>:<db-port>/<db-name>`. So, for our usecase we'll run the following line `export DATABASE_URL=postgres://root:postgres@localhost:5432/oauth?sslmode=disable` whose configuration matches our local PostgreSQL setup.

> **Note:** you will need to run the "export DATABASE_URL=..." line everytime you load a new terminal shell. In a production environment, we'd set this environment variable every time our service is deployed. However, for local development, this can be a pain, so I usually recommend a version controlled approach like [dotenv](https://crates.io/crates/dotenv). You can read more about this configuration approach from the twelve factor application website [here](https://12factor.net/config).

With the `DATABASE_URL` environment variable available to us, let's add a line to our `main` function to fetch our newly exported environment variable. 

```rust
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = std::env::var("DATABASE_URL").expect("Should set 'DATABASE_URL'");
    println!("{}", database_url);
    ...
```

Ok, great! Let's go ahead and re-run the service by running the following command:

```bash
DATABASE_URL=postgres://root:postgres@localhost:5432/oauth?sslmode=disable cargo run
```

You should eventually see the service running and the `database_url` value printed to the screen.

```bash
Compiling my-service v0.1.0 (/Users/tjmaynes/workspace/tjmaynes/my-service)
    Finished dev [unoptimized + debuginfo] target(s) in 2.95s
     Running `target/debug/my-service`
postgres://root:postgres@localhost:5432/oauth?sslmode=disable
```

This also confirms that we are properly capturing our `DATABASE_URL` environment variable because our program would fail at runtime (due to our `.expect()` method call) and we can see the `DATABASE_URL` value printed.

Next, let's write some more Rust code to create a database connection to our PostgreSQL database.

Inside of our `main` function, let's add some lines, below the `database_url` variable instantiation, to create the PostgreSQL database connection pool. Also, feel free to comment out the `println!` macro statement.

```rust
    ...
    let db_conn = PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url.as_str()) // <- Use the str version of database_url variable.
        .await
        .expect("Should have created a database connection");
    ...
```

Next, we'll need to pass our `db_conn` reference to our health endpoint handler. Let's do that now.

### Passing the database connection to the health endpoint handler

Before we can pass our database connection to our health endpoint handler, we'll first need to create a `struct` that represents our service's shared mutable state. Actix-web enables us to share our database connection between routes, so that we don't create a new database connection on each a request which is an expensive operation and can really slow down the performance of our service.

To accomplish this, we'll need to create a `struct` (above our `main` function) that we can call `AppState` containing our `db_conn` reference.

```rust
...
use sqlx::{Pool, Postgres, postgres::PgPoolOptions};
...
...
struct AppState {
    db_conn: Pool<Postgres>
}
...
```

Now, underneath our `db_conn` instantiation, we're going to create an AppState dat object that is wrapped in a `web::Data` wrapper. The `web::Data` wrapper will allow us to access our AppState reference within our request handlers.

```rust
    ...
    let app_state = web::Data::new(AppState {
        db_conn: db_conn
    });
    ...
```

And finally, let's set the App's `app_data` to our cloned `app_state` variable and update our `HttpServer::new` closure with a `move` statement. 

```rust
    let app_state = web::Data::new(AppState {
        db_conn: db_conn
    });

    HttpServer::new(move || { // <- busta ah move
        App::new()
            .app_data(app_state.clone()) // <- cloned app_state variable
            .route("/health", web::get().to(get_health_status))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
```

If we don't clone the `app_state` variable Rust will complain that our `app_state` variable was not created inside of our closure and there is no way for Rust to guarantee that `app_state` won't be destroyed when called upon. For more on this, checkout [Rust Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) and the [Copy trait](https://hashrust.com/blog/moves-copies-and-clones-in-rust/) docs.

### Checking the database connection

## Conclusion
