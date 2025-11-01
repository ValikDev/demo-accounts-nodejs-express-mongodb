# Node.js + Express + TypeScript API

A modular, scalable Express API built with TypeScript and ESLint Stylistic, using MongoDB for data storage.

## Prerequisites

1. Install Docker Desktop for your operating system:
   - [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

   Alternatively you can install only Docker CLI - check the [article](https://dev.to/mochafreddo/running-docker-on-macos-without-docker-desktop-64o) for details.

2. Make sure Docker Desktop is running before proceeding with setup.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create and start MongoDB container:

```bash
docker-compose up -d
```

3. Verify MongoDB is running:

```bash
docker ps
```

You should see a container named `demo_mongodb` running.

## Development

Run in development mode (uses ts-node + nodemon):

```bash
npm run dev
```

## Production

Build & run compiled output:

```bash
npm run build
npm start
```

## Environment Variables

The following environment variables can be configured:

- `ENV`: Select environment (default: `Development`) - does nothing for the moment
- `PORT`: Specify port to run the service (defailt: `3000`)
- `MONGODB_URI`: MongoDB connection string (default: `mongodb://root:example@localhost:27017` which is met with [docker compose file](./docker-compose.yml))
- `DB_NAME`: Database name (default: `demo_db` which is met with [init script](./scripts/mongodb/init.js))

See [env file](./src/config/env.ts) for the details.

## MongoDB Structure

The database is initialized with the following:

- Collection: `accounts`
- Indexes:
  - `scope`: For agregating by account scope

## Post notes

- MongoDB data is persisted in a Docker volume named `mongodb_data`
- Database initialization scripts are in `scripts/mongodb/`
- To reset the database, remove the Docker volume:
  ```bash
  docker-compose down -v
  ```

# Usage

## Get statistics
```bash
curl -s http://localhost:3000/accounts/stat | jq
```

Expected response in the first run
```json
{
  "accounts": 0,
  "prospects": 0,
  "children": 0
}
```

## Create an account

```bash
curl -s -X POST http://localhost:3000/accounts \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","scope":"account"}' \
| jq
```

Expected response similar to

```json
{
  "name": "Alice",
  "scope": "account",
  "_id": "6907f25889d04869813a7150",
  "createdAt": "2025-11-02T22:00:00.123Z"
}
```

## Update an account

```bash
curl -s -X PUT http://localhost:3000/accounts/6907f25889d04869813a7150 \
  -H "Content-Type: application/json" \
  -d '{"name":"Chris","scope":"child"}' \
| jq
```

Expected response similar to

```json
{
  "_id": "6907f25889d04869813a7150",
  "name": "Chris",
  "scope": "child",
  "createdAt": "2025-11-02T22:00:00.123Z",
  "createdAt": "2025-11-02T22:00:05.432Z",
}
```
