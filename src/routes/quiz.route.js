import express from 'express';
import { getAllQuizzes, createQuiz, getQuizById, getQuizBySlug, updateQuiz } from '../controllers/quiz.controller.js';
const router = express.Router();

router.get('/', getAllQuizzes);
router.post('/', createQuiz);
router.get('/:slug', getQuizBySlug);
router.get('/:id', getQuizById);
router.put('/:id', updateQuiz);


export default router;