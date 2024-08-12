import express, { Request, Response } from 'express';
import sequelize from './config/database';
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', userRoutes);

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


// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection established.');
//
//         await User.drop();
//         console.log('User table dropped!');
//
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
