# Teapot API

This is a CDK project that synthesizes and deploys a serverless API using AWS Lambda functions.

## Local Development

### Requirements:
- AWS CLI
- AWS CDK
- AWS SAM CLI
- Node + NPM

The repo is set up so that the docker instances launched by SAM are connected to a PostgreSQL database hosted on `localhost:5432/teapot_db` (you can see the db connection config [here](https://github.com/kobili/teapot-api/blob/main/src/db/data-source.ts))

### Launching a local API instance
- run `npm install` or `yarn install` to download dependencies
- run `cdk synth` to generate a Cloudformation Template
- run `npm run sam-run-api` or `yarn sam-run-api` to launch a local instance of the API

## Running Database Migrations
The scripts for applying migrations are located in the `db-migrations` folder.
```
cd db-migrations
```

### Creating a new migration
```
npm run typeorm:create-migration --name=<MIGRATION_NAME>
```
The above will create a new migration file in `db-migrations/migrations/`
- Add the SQL queries to update the database in the `up(queryRunner: QueryRunner)` method
- Add the SQL queries to reverse the database update in the `down(queryRunner: QueryRunner)` method

In the file `typeorm.config.ts`, import the class that was generated in the migration file and add it to the `migrations` field in the datasource object
```typescript
import { DataSource } from "typeorm";
import { CreateUserTable1674938561349 } from "./migrations/1674938561349-CreateUserTable";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'teapot_db',
    username: 'postgres',
    password: 'password',
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [
        CreateUserTable1674938561349
    ]
});
```

### Running database migrations
After configuring the `DataSource` object with the necessary database information (`host`, `port`, `database` and credentials) run
```
npm run typeorm:run-migrations
```

Connect to the database using a PostgreSQL compatible SQL db client (eg. pgAdmin) and check the database's `migrations` table. This table keeps track of all applied migrations. The migrations you've just applied should appear in this table.

### Reversing database migrations
Simply run
```
npm run typeorm:revert-migration
```
This command will reverse db migrations __one at a time__. 

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
