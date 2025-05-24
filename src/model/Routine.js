import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Exercise } from "./Exercise.js";

const Routine = sequelize.define("routine", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('principiante', 'intermedio', 'avanzado'),
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: true });

const RoutineExercise = sequelize.define("routine_exercise", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: false });

Routine.belongsToMany(Exercise, { through: RoutineExercise, as: 'exercises' });
Exercise.belongsToMany(Routine, { through: RoutineExercise, as: 'routines' });
Routine.belongsTo(User, { foreignKey: 'createdBy', as: 'profesor' });
User.hasMany(Routine, { foreignKey: 'createdBy', as: 'rutinas' });

export { Routine, RoutineExercise };