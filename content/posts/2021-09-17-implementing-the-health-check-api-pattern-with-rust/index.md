+++
title = "Implementing the Health Check API pattern with Rust"
description = "In this blog post, we are going to be implementing the Health Check API pattern for a Rust-based microservice and discussing what kind of information you should expect to see in your Health Check API endpoint response."
date = "2021-09-17 19:52:44"

[taxonomies]
tags=["rust", "kubernetes", "microservices"]

[extra]
author = "tjmaynes"
+++
This week while I was preparing a Rust-based backend service to be deployed to a Kubernetes cluster, I realized I hadn't yet configured my backend service to be probed by [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) for [liveness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-startup-probes) and [readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes) checks. I was able to accomplish this requirement by adding a `/health` API endpoint that responds with an `Ok` or `ServiceUnavailable` HTTP status based on the current state of your service.

This `/health` API endpoint solution is an implementation of the [Health Check API pattern](https://microservices.io/patterns/observability/health-check-api.html), a pattern for checking the health of your API service. In web frameworks like [Spring](https://spring.io/) a drop-in solution like [Spring Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html) is available for you to integrate into your Spring project. However, in many web frameworks you have to build this Health Check API behavior yourself.

In this blog post, we are going to implement the Health Check API pattern using the [actix-web](https://actix.rs/) web framework that uses [sqlx](https://github.com/launchbadge/sqlx) to connect to a local PostgreSQL database instance.

## Prerequisites

Before getting started make sure that you have [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) and [Rust](https://www.rust-lang.org/) installed on your machine. *The easiest way to install these tools is to use [rustup](https://rustup.rs/).*

Also have [Docker](https://docs.docker.com/get-docker/) installed on your machine so we can easily create and connect to a PostgreSQL database instance.

If this is your first time seeing the [Rust](https://rust-lang.org) programming language, I hope this blog post inspires you to take a deeper look into an interesting statically typed language and ecosystem.

*If you'd like to follow along with code by your side, I've made the source code for this project available on [GitHub](https://github.com/tjmaynes/health-check-rust).*

## Creating a new Actix-Web project

Let's go ahead and open your favorite [Command-line terminal](https://github.com/alacritty/alacritty) and create a new Cargo project via `cargo new my-service --bin`.

> The `--bin` flag will tell Cargo to automatically create a `main.rs` file to let Cargo know that this project is not a library but will produce an executable.

Next, let's check that we are able to run the project by running the command: `cargo run`. After you've run this command, you should have something printed like the text below.

```bash
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/health-endpoint`
Hello, world!
```

*Easy-peezee, right?*

Next, let's get our PostgreSQL instance up and running.

## Running PostgreSQL
Before we create our PostgreSQL instance with Docker Compose, we need to create an initial SQL script that create our database. Let's add the following into a SQL file called `init.sql` in a directory called `db` in the root of the project.

```sql
SELECT 'CREATE DATABASE member'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'member')\gexec
```

This script will check to see if a database called "member" already exists and if not it will create the database for us. Next, let's copy the following YAML into a `docker-compose.yml` file and run `docker compose up`.

```bash
version: '3.1'

services:
  my-service-db:
    image: "postgres:11.5-alpine"
    restart: always
    volumes:
      - my-service-volume:/var/lib/postgresql/data/
      - ./db:/docker-entrypoint-initdb.d/
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

After some colorful text has 🌈 printed down your console window, you should have PostgreSQL up and running.

Okay now that we have confirmed our service runs and we have an instance of PostgreSQL running locally, let's open up your favorite [text editor](https://code.visualstudio.com/) or [IDE](https://www.jetbrains.com/idea/) and add our project dependencies to our `Cargo.toml` file.

```toml
[dependencies]
actix-web = "4.0.0-beta.8"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.5.7", features = [ "runtime-actix-native-tls", "postgres" ] }
```

For `sqlx`, we want to make sure we include the "postgres" feature during compilation, so we have PostgreSQL drivers to connect to our PostgreSQL database with. Next, we'll want to make sure we have the `runtime-actix-native-tls` feature included so that sqlx can support the `actix-web` framework which uses the [tokio](https://tokio.rs/) *runtime*. Finally, let's include `serde` and `serde_json` for serializing our Health Check API response body for later in the post.

> ***Note:** For newcomers to Rust, you may be thinking to yourself, "what the heck? Actix *runtime?* I thought actix-web was *just* a web framework for Rust." Well it is *and* it's much more. Since Rust was not designed to with any specific [runtime](https://en.wikipedia.org/wiki/Runtime_system) in mind, a specific runtime is needed for the problem domain that you are currently in. There are runtimes specifically for handling client/server communication needs such as [Tokio](https://docs.rs/tokio/1.12.0/tokio/), a popular event-driven, non-blocking I/O runtime. [Actix](https://docs.rs/actix/), the underlying runtime behind actix-web, is an [actor-based](https://en.wikipedia.org/wiki/Actor_model) messaging framework built on-top of the tokio runtime.*

So, now that we've added our dependencies, let's go ahead and create our `actix-web` service. To do this let's replace the content in the `src/main.rs` file with the following Rust code:

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
           // ^ Our new health route points to the get_health_status handler
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

The code above gives us an HTTP server running on port `8080` and a `/health` endpoint that always returns an `Ok` HTTP Response status code.

Back in your terminal, run `cargo run` to see the service up and running. In a new tab, go ahead run `curl -i localhost:8080/health` and see that you receive a response like below:

```bash
$ curl -i localhost:8080/health
HTTP/1.1 200 OK
content-length: 8
content-type: application/json
date: Wed, 22 Sep 2021 17:16:47 GMT

Healthy!%
```

Now that we have basic health API endpoint up and running, let's change the behavior of our health API to return an `Ok` HTTP Response status code when the connection to our PostgreSQL database is alive. To do this, we'll first need to establish a database connection using `sqlx`.

## Creating the database connection

Before we can establish a database connection using sqlx's [connect](https://docs.rs/sqlx/0.5.7/sqlx/postgres/struct.PgConnection.html#method.connect) method, we'll need to create a database connection string, formatted as such `<database-type>://<user>:<password>@<db-host>:<db-port>/<db-name>`, that matches our local PostgreSQL setup.

Also, instead of hardcoding our database connection string, let's make it [configurable](https://12factor.net/config) through an environment variable called `DATABASE_URL` and prepend the variable before each of our `cargo run` calls, as seen below:

```bash
DATABASE_URL=postgres://root:postgres@localhost:5432/member?sslmode=disable cargo run
```

With the `DATABASE_URL` environment variable available to us, let's add a line to our `main` function to fetch our newly exported environment variable. 

```rust
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = std::env::var("DATABASE_URL").expect("Should set 'DATABASE_URL'");
    ...
```

Next, let's write some more code to create a database connection in our `main` function.

```rust
    ...
    let db_conn = PgPoolOptions::new()
        .max_connections(5)
        .connect_timeout(Duration::from_secs(2))
        .connect(database_url.as_str()) // <- Use the str version of database_url variable.
        .await
        .expect("Should have created a database connection");
    ...
```

Before we can pass our database connection to our health endpoint handler, we'll first need to create a `struct` that represents our service's shared mutable state. Actix-web enables us to share our database connection between routes, so that we don't create a new database connection on each a request which is an expensive operation and can really slow down the performance of our service.

To accomplish this, we'll need to create a Rust `struct` (above our `main` function) that we'll call `AppState` containing our `db_conn` reference.

```rust
...
use sqlx::{Pool, Postgres, postgres::PgPoolOptions};
...

struct AppState {
    db_conn: Pool<Postgres>
}
```

Now, underneath our `db_conn` instantiation, we're going to create an AppState data object that is wrapped in a `web::Data` wrapper. The `web::Data` wrapper will allow us to access our AppState reference within our request handlers.

```rust
    ...
    let app_state = web::Data::new(AppState {
        db_conn: db_conn
    });
    ...
```

And finally, let's set the App's `app_data` to our cloned `app_state` variable and update our `HttpServer::new` closure with a `move` statement. 

```rust
    ...
    let app_state = web::Data::new(AppState {
        db_conn: db_conn
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone()) // <- cloned app_state variable
            .route("/health", web::get().to(get_health_status))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
```

If we don't clone the `app_state` variable Rust will complain that our `app_state` variable was not created inside of our closure and there is no way for Rust to guarantee that `app_state` won't be destroyed when called upon. For more on this, checkout [Rust Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) and the [Copy trait](https://hashrust.com/blog/moves-copies-and-clones-in-rust/) docs.

So far our service code should look like the following:

```rust
use actix_web::{web, App, HttpServer, HttpResponse};
use sqlx::{Pool, Postgres, postgres::PgPoolOptions};

async fn get_health_status() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("application/json")
        .body("Healthy!")
}

struct AppState {
    db_conn: Pool<Postgres>
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = std::env::var("DATABASE_URL").expect("Should set 'DATABASE_URL'");

    let db_conn = PgPoolOptions::new()
        .max_connections(5)
        .connect_timeout(Duration::from_secs(2))
        .connect(database_url.as_str())
        .await
        .expect("Should have created a database connection");

    let app_state = web::Data::new(AppState {
        db_conn: db_conn
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .route("/health", web::get().to(get_health_status))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

Now that we have passed our `app_state` object, containing our database connection, into our `App` instance, let's go ahead and update our `get_health_status` function to check whether our database connection is alive and well.

### The database connection check
To capture our `AppState` data from our `get_health_status` function, we need to add an `Data<AppState>` argument to our `get_health_status` function.

```rust
async fn get_health_status(data: web::Data<AppState>) -> HttpResponse {
    ...
```

Next, let's write a lightweight PostgreSQL query to check our database connection using the `SELECT 1` query.

```rust
async fn get_health_status(data: web::Data<AppState>) -> HttpResponse {
    let is_database_connected = sqlx::query("SELECT 1")
        .fetch_one(&data.db_conn)
        .await
        .is_ok();
    ...
```

Next, let's update the `HttpResponse` response to return an `Ok` when our database is connected, and `ServiceUnavailable` when it is not. Also, for debugging purposes let's include a more useful response body, than `healthy` or `not healthy`, by serialize a Rust `struct`, using `serde_json`, that describes *why* our health check succeeded or failed.

```rust
    ...
    if is_database_connected {
        HttpResponse::Ok()
            .content_type("application/json")
            .body(serde_json::json!({ "database_connected": is_database_connected }).to_string())
    } else {
        HttpResponse::ServiceUnavailable()
            .content_type("application/json")
            .body(serde_json::json!({ "database_connected": is_database_connected }).to_string())
    }
}
```

Finally, let's run our service with the `cargo run` command:

```bash
DATABASE_URL=postgres://root:postgres@localhost:5432/member?sslmode=disable cargo run
```

Next, open up another terminal tab and run the following `curl` command:

```bash
curl -i localhost:8080/health
```

Which should return the following response:

```bash
HTTP/1.1 200 OK
content-length: 27
content-type: application/json
date: Tue, 12 Oct 2021 15:56:00 GMT

{"database_connected":true}%
```

If we were to turn off our database via `docker compose stop`, then after two seconds you should see a `ServiceUnavailable` HTTP response when you call the previous `curl` command again.

```bash
HTTP/1.1 503 Service Unavailable
content-length: 28
content-type: application/json
date: Tue, 12 Oct 2021 16:07:03 GMT

{"database_connected":false}%
```

## Conclusion

I hope this blog post served as a useful guide for implementing the Health Check API pattern. You can apply more information to your `/health` API endpoint such as, and where applicable, number of current users, cache connection checking, etc. Whatever information is needed to ensure what "healthy" looks like for your backend service. Which varies from service to service. Thank you for reading for this blog post!