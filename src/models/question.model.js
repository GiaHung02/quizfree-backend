import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';
import quiz from './quiz.model.js';

const question = sequelize.define('questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "quizzes",
            key: "id"
        }
    },
    type: {
        type: DataTypes.ENUM('multiple_choice', 'fill_in_the_blank', 'short_answer'),
        allowNull: false
    },
    content: {
        type: DataTypes.JSON,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
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


question.belongsTo(quiz, {foreignKey: "quiz_id"});
quiz.hasMany(question, { foreignKey: 'quiz_id' });


// (async () => {
//     await question.sync({alter: true});
//     console.log("✅ Questions table synced");
// })();

export default question;