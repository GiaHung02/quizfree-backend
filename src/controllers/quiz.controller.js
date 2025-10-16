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