import { DataTypes } from 'sequelize';
import sequelize from '../configs/sequelize.config.js';
import Quiz from './quizzes.model.js';

const Question = sequelize.define('Questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Quizzes",
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


Question.belongsTo(Quiz, {foreignKey: "quiz_id"});
Quiz.hasMany(Question, { foreignKey: 'quiz_id' });


(async () => {
    await Question.sync();
    console.log("✅ Questions table synced");
})();

export default Question;