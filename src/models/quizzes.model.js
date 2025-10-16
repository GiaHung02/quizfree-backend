import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';

const Quiz = sequelize.define('Quizzes', {
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
});



(async () => {
    await Quiz.sync();
    console.log("✅ Quizzes table synced");
})();

export default Quiz;