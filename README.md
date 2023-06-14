# FAVA - API (Finite Automata Validation App) 🫘

Automata testing and validating API for [FAVA](https://fava.vercel.app/) platform.

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- Node.js (version 12 or higher)
- Node.JS package manager (yarn or npm)
- PostgreSQL server

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
yarn
```

Using npm:

```bash
npm install
```

This will download and install all the necessary Node.js modules specified in the `package.json` file.

## Step 3: Set up the Database

This API requires a PostgreSQL database server, that could be created using Docker, for example.

### Using Docker (Optional)
If you choose to use Docker, follow these steps to set up a PostgreSQL container:

Install Docker on your machine by following the official Docker installation guide for your operating system.

Open a terminal and run the following command to start a PostgreSQL container:

```bash
docker run --name fava-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```
This command will create a new PostgreSQL container named fava-postgres with the specified password (mysecretpassword). The container will be accessible on port 5432.

### Configuring the Database

Now run the following command and then replace its variables values to match with your database configuration:
```bash
cp .env.example .env
```

## Step 4: Get JSON WebStorage Keys

Get yourself a API key from [Extended Class](https://extendsclass.com/json-storage.html).

This will be need for storaging automata payloads.

After creating it, paste its result on .env's `EXTENDS_CLASS_API_KEY`

## Step 5: Generate a JWT Secret

To help hash users passwords and make it database storable a JWT secret is needed.

To create it, run the following command and paste its result on .env's `JWT_SECRET`

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 6: Set a admin account

To create a admin account and have full access of the system, you must set .env's `ADMIN_EMAIL` and `ADMIN_PASSWORD` with the wanted email and password. 

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 7: Run Migrations and Seed Data

To run the migrations, use the following commands:

```bash
yarn migrate:generate
yarn migrate:run
```

This command will create the necessary database tables.

To seed the initial data, run the following command:

```bash
yarn seed
```

This will populate the database with some sample data.

## Step 8: Start the API

Finally, you can start the fava-api server by running the following command:

```bash
yarn dev
```

This command will start the development server and make the API accessible at the specified port (usually `http://localhost:8080`).

Congratulations! You have successfully set up and started the fava-api. You can now start making requests to the API and use it for your desired purposes.
