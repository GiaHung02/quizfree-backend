import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './src/routes/question.route.js';
import quizRoutes from './src/routes/quiz.route.js';
import userRoutes from './src/routes/user.route.js';

import sequelize from './src/configs/sequelize.config.js';
// Import tất cả models (KHÔNG sync trong model)
import './src/models/quiz.model.js';
import './src/models/question.model.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/question', questionRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/user', userRoutes);

// 🔥 Sync database 1 lần duy nhất tại đây
sequelize.sync().then(() => console.log("✅ Database synced")).catch(err => console.error(err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
