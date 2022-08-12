+++
title = "A Delicate Introduction to Istio"
description = "In this blog post, we're going to be discussing how Istio helps developers deploy their software using microservices best practices."
date = "2021-01-24 12:00:00"
draft = true

[extra]
author = "tjmaynes"
+++
Istio is a service mesh platform that provides a uniform way to integrate, and manage, traffic flow between microservices, enforce policies and aggregate telemetry data, all without requiring changes to application code. This allows application developers to safely spend more time delivering value to customers without having to directly manage traffic: `routing`, `security` and `observability`.

While Istio is an exciting and very new tool, it can become quite overwhelming to learn Istio head-on. So, in this blog post, I'm going to be discussing how Istio is able to help us sercomevent many of the distributed system fallacies and , including it's many uses and the benefits of adopting it in your Kubernetes environment.

Before we can start to discuss Istio, we need to look at why companies started to adopt Kubernetes to begin with. Before the first tweet that contained "Kubernetes" or "K8s", servers were pre-dominantly managed by companies with large 

Many organizations have started to adopt Kubernetes in their infrastructure. 

Why pull Istio into your kubernetes cluster?
Istio is being used by many different companies' and organizations', including the Department of Defense, Cloud Native tech stack.