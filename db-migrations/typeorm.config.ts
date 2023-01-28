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