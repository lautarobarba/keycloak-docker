import { DataSource } from "typeorm";
import * as path from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [path.join(__dirname, "/../**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "/migrations/*{.ts,.js}")],
  logging: (process.env.DB_LOGGING ?? false) as boolean,
  synchronize: false,
  migrationsRun: false,
});
