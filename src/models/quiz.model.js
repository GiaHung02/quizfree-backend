import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';

const quiz = sequelize.define('quizzes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
});



// (async () => {
//     await quiz.sync({alter: true});
//     console.log("✅ Quizzes table synced");
// })();

export default quiz;