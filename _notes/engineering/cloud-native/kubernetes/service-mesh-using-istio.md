---
description: 'Link: https://istio.io/docs'
---

# Service Mesh using Istio

## Introduction

A suite of tools for controlling the flow of traffic and API calls between services, conduct a range of tests, and upgrade gradually with red/black deployments.

### What is a service mesh?

It’s a network of microservices that make up applications and interactions between them. As a service mesh grows in size and complexity, it becomes harder to understand and manage. Requirements include discovery, load balancing, failure recovery, metrics, and monitoring. Also, includes A/B testing, canary rollouts, rate limiting, access control, and end-to-end authentication.

## Why use Istio?

Makes it easy to create a network of deployed services with load balancing, service-to-service authentication, monitoring, and more. Your application code shouldn’t know anything about the infrastructure it runs on \(Onion Architecture\). You add Istio support to services by deploying a special sidecar proxy throughout your environment that intercepts all network communication between microservices, then configure and manage Istio using its control plane functionality.

#### Istio Control Plane functionality

Automative load balancing for HTTP, gRPC, WebSocket, and TCP traffic. Fine-grained control of traffic behavior with rich routing rules, retries, failover, and fault injection. A pluggable policy layer and configuration API supporting access controls, rate limits, and quotas. Automatic metics, logs, and traces for all traffic within a cluster, including cluster ingress and egress. Secure service-to-service communication in a cluster with strong identity-based AuthN and AuthZ.

