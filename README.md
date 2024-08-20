# Sleep Tracker
The Sleep Tracker can be used by anybody on the web to track their sleeping hours with the ability to see the last 7 days worth of records.

<details>

<summary>📷 App Screenshots</summary>

## Dashboard
<p align="center">
  <img width="750px" src="https://github.com/user-attachments/assets/d9743d3d-c436-4872-bdb9-63e9e6a59799" />
</p>

## Recent Sleep Recordings for User
<p align="center">
  <img width="750px" src="https://github.com/user-attachments/assets/b3d3e7d1-b18f-42fb-98a4-f9102475428f" />
</p>

## Add Sleep Recording
<p align="center">
  <img width="750px" src="https://github.com/user-attachments/assets/1716aa12-b9b6-4328-9b64-f58794742d62" />

</p>

</details>

# Run Locally

Complete the following steps in your preferred terminal.

## Client

1. Navigate to `./client`.
2. Run `npm i` to install dependencies.
3. Run `npm run dev` to start the client.

> [!NOTE]  
> The client can be access from the browser at `http://localhost:5173`.

## Server

> [!IMPORTANT]  
> You will need to ensure `Docker` is installed on your system.

1. Navigate to `./server`.
2. Run `npm i` to install dependencies.
3. Run `docker compose up` to create a database instance.
4. Create a `.env` file in `./server/` and add the following string making sure to replace `<username>` and `<password>` accordingly.
   - ```
     DATABASE_URL="postgresql://<username>:<password>@localhost:5432/sleeper"
     ```
6. Run `npx prisma generate` to generate the database client.
7. Run `npx prisma migrate dev` to push all database migrations to PostgreSQL.
8. Run `npx prisma db seed` to seed the data with default values.
9. Finally run `npm run start` to start the server.

> [!NOTE]  
> The server runs on `http://localhost:3000`.

# Application Stack

## Client

- `React` + `Typescript` - as the framework.
- [`Mantine`](https://mantine.dev/) - component library.
  - Plus additional packages from Mantine; Date
- [`Mantine React Table`]() - table library.
- [`Tanstack Query`](https://tanstack.com/query/latest) - fetching data from server.
- `Zod` - request body validation.
- `axios` - api request handling.
- `react-hook-form` - form management.
- `Jest` - for testing framework.

## Server

- `Express` + `Typescript` - as the framework.
- `Nodemon` + `ts-node` - live reloading.
- [`Prisma`](https://www.prisma.io/) - as ORM.
- `Zod` - request body validation.
- `PostgreSQL` - data persistence.

# Assumptions
- There can be multiple users with the same name but different genders, e.g., Ryan may be a Man, Woman, or others.
- When it comes to adding records if no gender is specified but the name exists, the first entry found is used.
  - This can cause erronous behaviour, e.g. if 2 users named Ryan exist and an entry is make for Ryan without any gender selected the record could be associated to either user.
  - Potential fixes include:
    - Expose name + gender combinations to all users and use auto-complete/show message if unclear which user the record will associate to.
    - Make the gender field mandatory.

# Future Improvements/Features
- Fully unit test all user journeys for the client.
- Return all existing names on `Add Sleep` form and add auto-complete to the `name` field.
- Custom data range for sleeping hours rather than the last 7 days.
- User accounts.

# Development Guide

## Prisma

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
