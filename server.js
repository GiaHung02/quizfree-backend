import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './src/routes/question.route.js';
import quizRoutes from './src/routes/quiz.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRoutes);
app.use('/api/quizzes', quizRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
