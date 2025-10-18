import Questions from '../models/questions.model.js';
import Quiz from "../models/quizzes.model.js"

export const getAllQuestions = async (req, res) => {

    try{
        const questions = await Questions.findAll({include: [{model: Quiz, attributes: ['id', 'title', 'description']}]}) ;
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

export const getQuestionById = async (req, res) => {
    try{
        const {id} = req.params;
        const question = await Questions.findByPk(id);
        if(!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ status: 200, success: true, message: "Question fetched successfully", data: question });
    }catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching question:', error);
    }
}

export const updateQuestion = async (req, res) => {
    try{
        const {id} = req.params;
        const {quiz_id, type, content, order} = req.body;
        
        console.log("id: ", id);

        const existingQuestion = await Questions.findByPk(id);
        if(!existingQuestion) {
            return res.status(404).json({ message: "Question not found!!!" });
        }

        if(quiz_id) {
            const existingQuiz = await Quiz.findByPk(quiz_id);
            if(!existingQuiz) {
                return res.status(404).json({ message: "Quiz not found!!!" });
            }
        }
        
        const updatedQuestion = await existingQuestion.update({quiz_id, type, content, order});
        res.status(200).json({ message: "Question updated successfully", data: updatedQuestion});
    }catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error deleting question:', error);
    }
}