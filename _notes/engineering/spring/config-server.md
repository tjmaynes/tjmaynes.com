# Spring Cloud Config Server

## Notes
- [Spring Cloud Config Server](https://cloud.spring.io/spring-cloud-config/reference/html/) is a solution for managing your spring app configs at "cloud scale". To utilize this feature, your spring app needs to include the spring-cloud-config-client in its classpath. On app start-up, your spring app will automatically connect to your running config server on `localhost:8888` (unless otherwise specified with `spring.config.import=optional:configserver:http://myconfigserver.com/`).
- With Spring Cloud Config Server, you can centralize your spring app configs in git, local filesystem (useful for development purposes), Azure Vault, etc.
