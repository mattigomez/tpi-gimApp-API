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
        res.json(user.activeRoutineId);
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
