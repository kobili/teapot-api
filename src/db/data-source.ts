import { DataSource } from "typeorm";
import { AppUser } from './entity/AppUser';

export const getDataSource = () => {
    return new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'teapot_db',
        username: 'postgres',
        password: 'password',
        synchronize: false,
        logging: true,
        entities: [ AppUser ],
        subscribers: [],
        migrations: []
    });
}