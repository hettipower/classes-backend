import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // set to true only in development
    logging: true,
    entities: ['dist/entities/*.entity.js'], // Adjust path if necessary
    migrations: ['dist/migrations/*.js'],
    subscribers: [],
});