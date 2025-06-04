import { User } from "../model/User.js";
import { Routine } from "../model/Routine.js";

// Obtener la rutina activa de un usuario
export const getActiveRoutine = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: [{ model: Routine, as: 'activeRoutine' }]
        });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user.activeRoutine); // <-- Devuelve el objeto rutina
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cambiar la rutina activa de un usuario
export const setActiveRoutine = async (req, res) => {
    try {
        const { id } = req.params;
        const { routineId } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        user.activeRoutineId = routineId;
        await user.save();
        res.json({ message: 'Rutina activa actualizada', activeRoutineId: routineId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, password, role, nombre, peso, estatura, edad, telefono } = req.body;
        const user = await User.create({ email, password, role, nombre, peso, estatura, edad, telefono });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        await user.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
