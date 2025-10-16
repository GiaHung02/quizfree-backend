import Questions from '../models/questions.model.js';
import Quiz from "../models/quizzes.model.js"

export const getAllQuestions = async (req, res) => {

    try{
        const questions = await Questions.findAll() ;
        console.log("question: ", questions);
        res.status(200).json({ status: 200, success: true, message: "Questions fetched successfully", data: questions });
    }catch(error){
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching questions:', error);
    }
}

export const createQuestion = async (req, res) => {
    try{
        const { quiz_id, type, content, order } = req.body;
        if(!quiz_id || !type || !content || !order) {
            res.status(400).json({ message: "Something is missing, please check again!!!" });
        }
        const existingQuizId = await Quiz.findByPk(quiz_id);

        // check if quiz is existing or not
        if (!existingQuizId) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const question = await Questions.create({ quiz_id, type, content, order });

        res.status(201).json({ message: " Question created successfully", data: question });
    }catch(error){
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error creating question:', error);
    }
}