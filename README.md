# Sleep Tracker

## Client

- `React` + `Typescript` - as the framework.
- [`Mantine`](https://mantine.dev/) - for component library.
- [`Tanstack Query`](https://tanstack.com/query/latest) - fetching data from server.
- `Jest` - for testing framework.

## Server

- `Express` + `Typescript` - as the framework.
- `Nodemon` + `ts-node` - live reloading.
- [`Prisma`](https://www.prisma.io/) - as ORM.
- `PostgreSQL` - for data persistence.

### Prisma

Prisma is used as the ORM for the application. You'll need to be aware of the following commands - these will need to be executed anytime you change the models:

```
// Generates the prisma client for connection, is aware of your models.
npx prisma generate

// Run a migration to sync code models to database (you may want to use  --create-only flag)
// IMPORTANT: this should run only in your local environment
npx prisma migrate dev --name <what_has_been_added/removed?>


// For production use - typically should be part of CI/CD pipeline
npx prisma migrate deploy
```

When setting up a new development environment run the following command to run all migrations:

```
npx prisma migrate dev
```

For seeding with predefined data use:

```
npx prisma db seed
```
