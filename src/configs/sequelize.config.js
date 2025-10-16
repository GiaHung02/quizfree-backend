import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
dotenv.config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    dialectModule: mysql2,
    benchmark: true,
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection established successfully");

        await sequelize.sync();
        console.log("✅ Database synced");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
})();

export default sequelize;