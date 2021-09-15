+++
title = "Building a custom healthcheck endpoint for your Rust microservice"
description = "In this blog post, we are going to be adding a health endpoint to a Rust-based microservice (using actix-web) based microservice and discuss what kind of information you should expect to see in your health endpoint response." 
date = "2021-09-12 19:52:44"
draft = true

[extra]
author = "tjmaynes"
+++
When deploying an application to a cloud native environment like Kubernetes, you need a way for your application to tell your deployment orchestrator (Kubernetes) whether your application is ready to serve requests There are two ways to accomplish this: create a `/healthcheck` endpoint or write to a custom file on the filesystem.

In this blog post, we are going to be adding a health endpoint to a Rust-based microservice (using [actix-web](https://actix.rs/)) and discuss *what kind of information* you should expect to see in your health endpoint response.

## Preparation
Before embarking on our heathchecking journey, we need to make sure we understand *why* we are building a healthcheck endpoint in the first place. Due to the highly 