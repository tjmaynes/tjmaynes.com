# Spring Actuator

## Notes
- Use actuator's `/actuator/refresh` endpoint to force the spring app to get the latest data from the Spring Cloud Config server without having to redeploy your app. To accomplish this make sure you have included actuator and spring-cloud-config client in your maven `pom.xml` or `build.gradle` file. Once these dependencies are included, on app start-up, the spring-cloud-config-client will attempt to connect toa locally run spring-cloud-config-server (running on `localhost:8888`) and actuator endpoints will be available. *Note*: to include the refresh endpoint in your `application.properties` or `application.yml` file: `management.endpoints.web.exposure.include: health,info,refresh`. 
