# Equipment Service

Simple Spring Boot microservice for managing equipment inventory, user requests and approvals.

## Overview
This service provides REST APIs to:
- Manage equipment items (CRUD, search, categories).
- Create and manage equipment requests by users.
- Approve or reject requests (approval workflow).
- Basic JWT-based auth integration for route protection.

The project follows typical Spring Boot layering:
- controller — REST controllers
- service — business logic
- repository — Spring Data JPA repositories
- security — JWT auth filter and security configuration
- dto/entity — data transfer and persistence models
- client — HTTP client for external auth validation

## Prerequisites
- macOS / Linux / Windows
- JDK 17+
- Maven (wrapper provided; use `./mvnw` or `mvn`)
- A running relational DB (Postgres/MySQL/H2). Configure connection in application.properties.

## Configuration
Check `src/main/resources/application.properties` (or application-*.yml) for:
- datasource URL / username / password
- Hibernate / JPA settings
- Flyway migration settings
- JWT secret and auth endpoints (if present)

Example minimal properties:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/equipmentdb
spring.datasource.username=postgres
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=none
spring.flyway.enabled=true
```

## Database migrations
Flyway migrations are in `src/main/resources/db/migration`. Keep migrations idempotent and follow Flyway naming (V1__..., V2__...).

## Build & run
Build:
```bash
./mvnw clean package
```

Run (dev):
```bash
./mvnw spring-boot:run
```

Run the packaged jar:
```bash
java -jar target/equipmentservice-*.jar
```

## Tests
Run unit/integration tests:
```bash
./mvnw test
```

## API
- Main entry: `src/main/java/org/bits/assignment/equipmentservice/EquipmentServiceApplication.java`
- Controllers are under `controller` package. Use a tool like Postman or curl to exercise endpoints.
- Auth: endpoints may require a Bearer JWT in `Authorization` header.

## Development tips
- Use the provided Flyway scripts to keep schema changes tracked.
- Keep DTOs separate from entities to avoid leaking persistence concerns to the API.
- Use the JWT filter in `security` package to mock/validate tokens during local testing.

## Contact / Notes
- Adjust logging and profiles for local vs production runs.
- For quick local testing, consider using an embedded H2 profile and set `spring.jpa.hibernate.ddl-auto=create-drop`.
