import express from 'express';
import { getAllQuestions, createQuestion, getQuestionById, updateQuestion } from '../controllers/question.controller.js';
const router = express.Router();

router.get('/', getAllQuestions);
router.post("/", createQuestion);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestion);


export default router;