import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

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
}, { timestamps: true });
