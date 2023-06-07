# FAVA - API (Finite Automata Validation App) 🫘

Automata testing and validating API for [FAVA](https://fava.vercel.app/) platform.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js (version 12 or higher)
- Node.JS package manager (yarn or npm)
- PostgreSQL (locally installed or accessible)

## Step 1: Clone the Repository

First, clone the fava-api repository to your local machine. Open a terminal and run the following command:

```bash
git clone https://github.com/joaobb/fava-api.git
```

This command will create a local copy of the repository on your machine.

## Step 2: Install Dependencies

Navigate to the project directory by running the following command:

```bash
cd fava-api
```

Once inside the project directory, use Yarn to install the required dependencies. Run the following command:

```bash
yarn install # or npm run install
```

This will download and install all the necessary Node.js modules specified in the `package.json` file.

## Step 3: Set up the Database

This API requires a PostgreSQL database server. You can either run your own, locally, by using Docker for example, or use an existing database created and deployed (it might be unavailable when you try to use it). If you reather use the second option, it's credentials are declared in the `.env.deploy` file.

### Configuring the Database

If you chose to use a local database, run the following command then replace its variables values to match with your database configuration:
```bash
cp .env.example .env
```
Otherwise, for using the deployed database, run this command, and you're ready to go!
```bash
cp .env.deploy .env
```

## Step 4: Run Migrations and Seed Data (Optional)

If you're using a local PostgreSQL database, you'll need to run migrations and seed the initial data.

To run the migrations, use the following command:

```bash
yarn migrate:generate
yarn migrate:run
```

This command will create the necessary database tables.

To seed the initial data, run the following commands:

```bash
yarn seed
```

This will populate the database with some sample data.

## Step 5: Start the API

Finally, you can start the fava-api server by running the following command:

```bash
yarn dev
```

This command will start the development server and make the API accessible at the specified port (usually `http://localhost:8080`).

Congratulations! You have successfully set up and started the fava-api. You can now start making requests to the API and use it for your desired purposes.
