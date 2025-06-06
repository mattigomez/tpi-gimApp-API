import { User } from "./User.js";
import { Routine } from "./Routine.js";
import { Exercise } from "./Exercise.js";

// Asociación para rutina activa del usuario
User.belongsTo(Routine, { as: 'activeRoutine', foreignKey: 'activeRoutineId', onDelete: 'SET NULL'});

// Asociación muchos a muchos entre rutina y ejercicio
import { RoutineExercise } from "./Routine.js";
Routine.belongsToMany(Exercise, { through: RoutineExercise, as: 'exercises' });
Exercise.belongsToMany(Routine, { through: RoutineExercise, as: 'routines' });

