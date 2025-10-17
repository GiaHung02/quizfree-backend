import Quiz from "../models/quizzes.model.js";

export const getAllQuizzes = async (req, res) => {
    try{
        const quizzes = await Quiz.findAll();
        res.status(200).json({ status: 200, success: true, message: "quizzes fetched successfully", data: quizzes });
    }catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching quizzes:', error);
    }
}

export const createQuiz = async (req, res) => {
    try {
        const {title, description} = req.body;

        if(!title || !description) {
            res.status(400).json({message: "title or description is empty"});
        }

        const quiz = await Quiz.create({title, description});
        res.status(201).json({ status: 201, success: true, message: "Quiz created successfully", data: quiz });

    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error creating quiz:', error);
    }
}

export const getQuizById = async (req, res) => {
    try{
        const {id} = req.params;
        const quiz = await Quiz.findByPk(id);

        if(!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ status: 200, success: true, message: "Quiz fetched successfully", data: quiz });
    }catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching quiz:', error);
    }
}

export const updateQuiz = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;

        if(!title || !description) {
            res.status(400).json({message: "title or description is empty"});
        }

        const existingQuiz = await Quiz.findByPk(id);
        if(!existingQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        const updatedQuiz = await existingQuiz.update({title, description});
        res.status(200).json({ status: 200, success: true, message: "Quiz updated successfully", data: updatedQuiz });

    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error updating quiz:', error);
    }
}