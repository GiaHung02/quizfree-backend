import { where } from "sequelize";
import sequelize from "../configs/sequelize.config.js";
import question from "../models/question.model.js";
import quiz from "../models/quiz.model.js";

export const getAllQuizzes = async (req, res) => {
    try{
        const quizzes = await quiz.findAll({
            include: [{model: question, attributes: []}],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('questions.id')), 'questionCount']
                ]
            },
            group: ['Quizzes.id']
        });
        if(!quizzes) {
            return res.status(404).json({ message: 'Quizzes not found' });
        }

        res.status(200).json({ status: 200, success: true, message: "quizzes fetched successfully", data: quizzes });
    }catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching quizzes:', error);
    }
}

export const createQuiz = async (req, res) => {
    try {
        const { title, description, slug } = req.body;

        if (!title || !description || !slug) {
            return res.status(400).json({
                success: false,
                message: "title, description hoặc slug không được bỏ trống"
            });
        }

        // Kiểm tra slug trùng
        const exist = await quiz.findOne({ where: { slug } });
        if (exist) {
            return res.status(400).json({success: false, message: "Slug already exists"});
        }

        // Tạo quiz
        const createdQuiz = await quiz.create({ title, description, slug });

        return res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: createdQuiz
        });

    } catch (error) {
        console.error("Error creating quiz:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getQuizById = async (req, res) => {
    try {
        const {id} = req.params;
        const existedQuiz = await quiz.findByPk(id, {include: [{model: question}]});

        if(!existedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ status: 200, success: true, message: "Quiz fetched successfully", data: existedQuiz });
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching quiz:', error);
    }
}


export const getQuizBySlug = async (req, res) => {
    try{
        const {slug} = req.params;
        console.log("slug: ", slug);
        
        const existedQuiz = await quiz.findOne({where: { slug }, include: [{model: question}]});
        
        console.log("existedQuiz: ", existedQuiz);

        if(!existedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ status: 200, success: true, message: "Quiz fetched successfully", data: existedQuiz });
    }catch(error) {
        res.status(500).json({ message: 'Internal server error' });
        console.error('Error fetching quiz:', error);
    }
}

export const updateQuiz = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, slug} = req.body;

        if(!title || !description || !slug) {
            res.status(400).json({message: "title or description is empty"});
        }

        const existingQuiz = await quiz.findByPk(id);
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

export const deleteQuiz = async (req, res) => {
    try{
        const {id} = req.params;
        const quiz = await quiz.findByPk(id);
        if(!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await quiz.destroy();
        res.status(200).json({ status: 200, success: true, message: 'Quiz deleted successfully' });
    }catch(error) {
        res.status(500).json({ status: 500, success: false, message: 'Internal server error' });
        console.error('Error deleting quiz:', error);
    }
}