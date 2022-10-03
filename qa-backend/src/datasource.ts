import { DataSource } from "typeorm";
import { User } from "./entities";

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "qa_db",
  entities: [User],
  logging: false,
  synchronize: true,
});
