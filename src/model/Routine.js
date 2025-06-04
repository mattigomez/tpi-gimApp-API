import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


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



export { Routine, RoutineExercise };