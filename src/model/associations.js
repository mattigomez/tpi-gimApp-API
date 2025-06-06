import { User } from "./User.js";
import { Routine } from "./Routine.js";
import { Exercise } from "./Exercise.js";
import { RoutineExercise } from "./Routine.js";

User.belongsTo(Routine, { as: 'activeRoutine', foreignKey: 'activeRoutineId' });
Routine.belongsToMany(Exercise, { through: RoutineExercise, as: 'exercises' });
Exercise.belongsToMany(Routine, { through: RoutineExercise, as: 'routines' });
