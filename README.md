# tesseract-coding-challenge
This project is for the Tesseract coding challenge.

I added an extra health check route `/ping` that helps in checking if the server is alive to help.  
Helpful in checking that the toy project is booting up and you are able to call it.

## Getting started
Setting up containers and seeing that everything boots
```sh
docker compose build;
docker compose up;
```

Running the project from docker in development mode
```sh
docker compose up -d
```

Running tests
```sh
docker compose up -d;
docker compose exec app npm run test:watch;
```

## Development roadmap
Table below lists the items on the way towards being able to deploy, further develop and maintain this REST Api in production. Tasks are
ordered according to their priority with **the topmost row being the next item the team picks for development**.
| Item | Rationale |
|-----------------------------------|------------------------------------------------------------------------------------------|
| CI/CD | We should have in place a CI/CD pipeline, including build, dependency vulnerability check, static code analysis for both coding standards and security, and deployment. |
| Add test coverage reporting | Developers should have a convenient way to find blind spots in their test automation. |
| DB migration management | Using `db.sync()` with Sequelize supports only schema migrations but not e.g. data migration. This could be done e.g. with `umzug`. |
| Add API authorization | This API deals with users and their email addresses and therefore needs to be protected. |
| Request logging | Typically we want to log when the server is called and the HTTP status code it's responding with. This can be done in the infrastructure layer (often preferable to catch also catastrophic failures) or in the middleware. |
| Security headers | Right now we are not sending any CORS headers, strict TLS headers etc which should typically be in place unless we have a good reason not to set them. |
| Compression | Right now we are not using any compression in responses, which would typically be best practice. |
| Backoff retries | Backoff retries can significantly reduce issues from poor network connection, deadlock issues with DB calls etc. This can be either implemented in the infrastructure or the application level. |
| Telemetry | Add e.g. OpenTelemetry Node SDK for tracing and exporting metrics and logs. This improves the observability in prod considerably. OpenTelemetry traces can become noisy though. One option to mitigate this downside is to add e.g. a query parameter that tells the server to trace the request. |
| Performance testing | Add tests to verify application performance under realistic load condition to ensure we stay at the level we want to be at. |
| ... | ... |
