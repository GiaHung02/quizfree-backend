import express from 'express';
import { getAllQuizzes, createQuiz } from '../controllers/quiz.controller.js';
const router = express.Router();

router.get('/', getAllQuizzes);
router.post('/', createQuiz);


export default router;