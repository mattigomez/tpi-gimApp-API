import { User } from "../model/User.js";
import { Routine } from "../model/Routine.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword } from "../utils/validations.js";

export const getActiveRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: Routine, as: "activeRoutine" }],
    });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user.activeRoutine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setActiveRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { routineId } = req.body;
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    user.activeRoutineId = routineId;
    await user.save();
    res.json({
      message: "Rutina activa actualizada",
      activeRoutineId: routineId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  if (!validateRegisterUser(req.body))
    return res.status(400).send({ message: "Hubo un error en la solicitud" });

    const { email, password, role, nombre, peso, estatura, edad, telefono } =
      req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      nombre,
      peso,
      estatura,
      edad,
      telefono,
    });
    res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  if (!validateLoginUser(req.body))
    return res.status(400).send({ message: "Hubo un error en la solicitud" });
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    console.log("No existe usuario:", email);
    return res.status(401).send({ message: "Usuario no existente" });
  }
  const comparison = await bcrypt.compare(password, user.password);
  if (!comparison) {
    console.log("Contraseña incorrecta para:", email);
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
  }
  const secretKey = "GymHub-2025";

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, activeRoutineId: user.activeRoutineId },
    secretKey,
    { expiresIn: "1h" }
  );

  return res.json(token);
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
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateLoginUser = ({ email, password }) => {
  if (!validateEmail(email)) return false;
  else if (!validatePassword(password, 6, 20, true, true)) return false;

  return true;
};

const validateRegisterUser = ({ email, password }) => {
  if (!validateEmail(email)) return false;
  else if (!validatePassword(password, 6, 20, true, true)) return false;

  return true;
};
export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  if (!validatePassword(newPassword, 6, 20, true, true)) {
    return res.status(400).json({ message: "Nueva contraseña inválida" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Contraseña actual incorrecta" });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};