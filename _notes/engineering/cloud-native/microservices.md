---
description: 'Link: https://martinfowler.com/articles/microservices.html'
---

# Microservices

Microservices describe a system built out of many different components running in different processes and communicating over defined APIs. Microservices stand in contrast to monolithic systems, which tend to place all of the functionality for a service within a single, tightly coordinated application.

Microservices break a system down into its small pieces, each focused on providing a single service.

Reduced team size reduces the overhead of maintaining many services thus allowing the team to focus and keep in one direction. By separating each service out, each service can scale to their needs.

Downsides include debugging is much more difficult to do in a decoupled system and difficult to design and architect.

Patterns make the systems easier to debug because they enable developers to apply lessons learned across a number of different systems that use the same patterns.

## **Articles**

### **Mastering Chaos - A Netflix Guide to Microservices**

\*\*\*\*[https://www.youtube.com/watch?v=CZ3wIuvmHeM](https://www.youtube.com/watch?v=CZ3wIuvmHeM)

* Introduction
  * What is a microservice?
    * The microservice architectural style is an approach to developing a single application as a suite a small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API.
      * [https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
    * An evolutionary response
      * Separation of concerns
        * Modularity, encapsulation
      * Scalability
        * Horizontally scaling
        * Workload partitioning
      * Virtualized & elastic environment
        * Automated operations
        * On demand provisioning
  * Edge services
    * ELB -&gt; Zuul -&gt; API
  * Middle Tier & Platform
    * Product
      * Bucket testing
      * Subscriber
      * Recommendations
    * Platform
      * Routing
      * Configuration
      * Crypto
    * Persistence
      * Cache
      * Database
  * Microservices are an abstraction
    * Provide client libraries to access your microservice
      * Using gRPC can generate the client library for us.
      * Consists of an EVCache and Service Client
* Challenges and Solutions
  * Dependency
    * Intra-service Requests
      * 
    * Client Libraries
    * Data Persistence
    * Infrastructure
  * Scale
  * Variance
  * Change

