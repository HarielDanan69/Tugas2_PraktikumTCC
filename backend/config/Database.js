import { Sequelize } from "sequelize";

const db = new Sequelize("crud_notes", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
