# Spring Service Discovery

## Notes
- [Spring Eureka Server](https://spring.io/guides/gs/service-registration-and-discovery/) is a ervice registration and discovery server that spring apps use to connect (over HTTP) with other spring apps. It works by having a running [Spring Cloud Netflix Eureka](https://spring.io/projects/spring-cloud-netflix) service and including the Eureka client library in your spring app classpath. On app start-up, the spring app will automatically attempt to connect to the Eureka service on `localhost:8761`, unless otherwise specified in your spring app (via `eureka.client.serviceUrl.defaultZone`).
