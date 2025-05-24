import express from 'express';
import { PORT } from './config.js';
import { sequelize } from './db.js';
import routineRoutes from './routes/routines.routes.js';
import userRoutes from './routes/user.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import "./model/Routine.js";
import "./model/User.js";
import "./model/Exercise.js";

const app = express();

try {
  app.use(express.json());
  app.listen(PORT);
  app.use(routineRoutes);
  app.use(userRoutes);
  app.use(exerciseRoutes);

  await sequelize.sync();
  
  console.log(`Server is running on port ${PORT}`);
} catch (error) {
  console.error('Error starting the server:', error);
  
}