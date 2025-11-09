# User Service

A Spring Boot microservice that provides user management and authentication for an application. Key features:
- User signup and login with JWT-based authentication
- Role-based access control (STUDENT, STAFF, ADMIN)
- User listing, search and status management (ADMIN-protected)
- Password reset trigger (placeholder implementation)

---

## Table of contents
- Project overview
- Requirements
- Quick start (build & run)
- Configuration (application.properties / environment variables)
- JWT behavior and secure key guidance
- API endpoints & example requests
- Data model
- Testing
- Troubleshooting & common errors
- Development notes and next steps
- Contributing

---

## Project overview
This service exposes REST endpoints to manage users and authenticate them. Typical responsibilities:
- Persist users (name, email, password hash, role, status)
- Issue JWTs on successful login/signup
- Protect administrative endpoints with ROLE_ADMIN
- Simple endpoint to trigger password reset workflow (needs full implementation)

Project structure (high level):
- controller/ : REST controllers (AuthController, UserController)
- service/    : Business logic (UserService)
- repository/ : JPA repositories (UserRepository)
- entity/     : JPA entities (User, Role)
- security/   : JWT utilities, filters, and Spring Security configuration
- UserServiceApplication.java : Spring Boot entrypoint

---

## Requirements
- Java 17+ (or version targeted by project)
- Maven or Gradle (Maven examples below)
- A JDBC-compatible database (H2 for local development, Postgres/MySQL for production)
- Recommended: Docker (for running DB in development)

---

## Quick start

1. Configure application properties (see next section).
2. Build:
   - Maven: mvn clean package
3. Run:
   - java -jar target/user-service-<version>.jar
   - or run `UserServiceApplication` from your IDE

For development with H2 (in-memory), set datasource to H2 and spring.jpa.hibernate.ddl-auto=update to bootstrap schema.

---

## Configuration

Prefer configuring via `src/main/resources/application.properties` for local dev or environment variables in production.

Example application.properties (local dev):
```
spring.datasource.url=jdbc:h2:mem:userdb;DB_CLOSE_DELAY=-1
spring.datasource.username=sa
spring.datasource.password=
spring.datasource.driverClassName=org.h2.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Environment variables (common):
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- SPRING_JPA_HIBERNATE_DDL_AUTO
- SERVER_PORT

JWT secret guidance:
- Current implementation may generate an in-memory key at runtime (not suitable for production).
- Recommended: provide a persistent secret/key via config, example:
  - application.properties: app.jwt.secret=your-256-bit-base64 or path to keystore
  - OR env var: APP_JWT_SECRET

When using a symmetric key, ensure it is strong and stored securely (Vault, AWS KMS, environment variables with restricted access).

---

## JWT behavior

- Tokens include the user's email as the subject and a `role` claim.
- Tokens are expected in the `Authorization` header as: `Authorization: Bearer <token>`
- JwtAuthFilter validates tokens and populates Spring Security's Authentication with `ROLE_{role}`.
- Tokens generated before a process restart will be invalid if an in-memory signing key is used. Use a fixed secret for token persistence.

---

## API endpoints & example requests

Base path: /api

Auth endpoints (no auth required)
- POST /api/auth/signup
  - Payload:
    {
      "name": "Alice",
      "email": "alice@example.com",
      "password": "secret",
      "role": "STUDENT"
    }
  - Response: 200 OK { user, token }

- POST /api/auth/login
  - Payload:
    {
      "email": "alice@example.com",
      "password": "secret"
    }
  - Response: 200 OK { user, token }

- POST /api/auth/forgot-password
  - Payload:
    { "email": "alice@example.com" }
  - Response: 200 OK (trigger acknowledged; implement email workflow later)

User management endpoints (require ADMIN role)
- GET /api/users
  - Returns list of users

- GET /api/users/search?q={query}&role={role}
  - Query name/email and optional role filter

- PATCH /api/users/{id}/status
  - Payload:
    { "status": "active|suspended|inactive" }

Example curl (signup):
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret","role":"STUDENT"}'

Example curl (access protected endpoint):
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/users

---

## Data model (brief)
User entity (typical fields):
- id: Long
- name: String
- email: String (unique)
- password: String (BCrypt hash)
- role: Role (STUDENT, STAFF, ADMIN)
- status: String (active, suspended, etc.)
- transient or computed fields: activeRequests, totalBorrows (not persisted)

Passwords must always be stored hashed (BCrypt used in service layer).

---

## Testing
- Unit tests: write tests for service layer (mock repositories).
- Integration tests: use an in-memory DB or Testcontainers to run against a real DB.
- Manual test flow:
  1. Signup a user via /api/auth/signup
  2. Login via /api/auth/login and copy token
  3. Access protected endpoint with Authorization header

---

## Troubleshooting & common errors

401 Unauthorized / Invalid credentials
- Verify the email and password used for login.
- Confirm password hashing and storage (BCrypt).

403 Forbidden
- Ensure token contains the required role claim and SecurityConfig maps roles correctly.
- Check the request path and method against security matchers.

Token invalid after restart
- Cause: runtime-generated in-memory signing key. Fix: configure persistent secret.

Database connection errors
- Check datasource URL, credentials, and that the DB is reachable.
- For Postgres/MySQL ensure JDBC driver is on classpath.

500 server errors on startup
- Inspect logs for missing beans (often due to misconfigured properties or missing dependencies).

---

## Development notes & next steps
- Persist JWT signing key via config or keystore.
- Implement full password reset flow (email with secure, single-use token).
- Add DTO validation (@Valid), global exception handling, and more robust error responses.
- Add request/response DTOs to avoid leaking sensitive fields (e.g., password).
- Add logging and structured metrics.
- Harden security headers and CORS policies.

---

## Contributing
- Fork the repo, create feature branches, and open PRs with clear descriptions.
- Add unit/integration tests for new features.
- Run mvn test and mvn package before submitting PRs.

---

If you want, I can:
- Add example application.properties files for Postgres and H2.
- Modify JwtUtil to read a configurable secret from application.properties.
- Add a sample Postman collection or curl scripts for all endpoints.

