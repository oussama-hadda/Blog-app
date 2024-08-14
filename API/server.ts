import express from 'express';
import sequelize from './config/database';
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";
import commentRouter from "./routers/commentRouter";
import interactionRouter from "./routers/interactionRouter";
import followRouter from "./routers/followRouter";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/interactions', interactionRouter);
app.use('/api/follows', followRouter);

// app.get('/', async (req: Request, res: Response) => {
//     try {
//         // Test connection to database
//         await sequelize.authenticate();
//         console.log('Database connection has been established successfully.');
//
//         const users = await User.findAll();
//         res.json(users);
//         console.log('Users:');
//         console.log(users);
//
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         res.status(500).json({ error: 'Unable to connect to the database' });
//     }
// });


sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
