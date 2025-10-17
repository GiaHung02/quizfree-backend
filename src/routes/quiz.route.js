import express from 'express';
import { getAllQuizzes, createQuiz, getQuizById, updateQuiz } from '../controllers/quiz.controller.js';
const router = express.Router();

router.get('/', getAllQuizzes);
router.post('/', createQuiz);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);


export default router;