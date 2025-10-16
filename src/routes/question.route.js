import express from 'express';
import { getAllQuestions, createQuestion } from '../controllers/question.controller.js';
const router = express.Router();

router.get('/', getAllQuestions);
router.post("/", createQuestion);


export default router;