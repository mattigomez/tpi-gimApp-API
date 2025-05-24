import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";

export const Exercise = sequelize.define("exercise", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: true });

// Relación: Un usuario (profesor) crea muchos ejercicios
Exercise.belongsTo(User, { foreignKey: 'createdBy', as: 'profesor' });
User.hasMany(Exercise, { foreignKey: 'createdBy', as: 'ejercicios' });
