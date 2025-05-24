import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('cliente', 'profesor', 'admin'),
        allowNull: false,
    },
    nombre: DataTypes.STRING,
    peso: DataTypes.FLOAT,
    estatura: DataTypes.FLOAT,
    edad: DataTypes.INTEGER,
    telefono: DataTypes.STRING,
    activeRoutineId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'routines',
            key: 'id'
        }
    }
}, { timestamps: true });
