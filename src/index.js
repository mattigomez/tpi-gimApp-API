import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import { sequelize } from './db.js';
import routineRoutes from './routes/routines.routes.js';
import userRoutes from './routes/user.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import authRoutes from './routes/auth.routes.js';
import "./model/Routine.js";
import "./model/User.js";
import "./model/Exercise.js";
import "./model/associations.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(routineRoutes);
app.use(userRoutes);
app.use(exerciseRoutes);
app.use(authRoutes);

async function main() {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

main();