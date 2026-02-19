import UserCurrentDTO from "../dto/UserCurrentDTO.js";

export const current = (req, res) => {

  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const userDTO = new UserCurrentDTO(req.user);

  res.status(200).json({ payload: userDTO });
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.resetPasswordToken = token;
    await user.save();

    res.json({
      status: "success",
      message: "Token generado",
      resetToken: token
    });

  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      email: decoded.email,
      resetPasswordToken: token
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Token invalido"
      });
    }

    const isSamePassword = bcrypt.compareSync(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        status: "error",
        message: "Utiliza otra contraseña que no sea la misma contraseña anterior"
      });
    }

    user.password = createHash(newPassword);
    user.resetPasswordToken = undefined;

    await user.save();

    res.json({
      status: "success",
      message: "Contraseña actualizada correctamente"
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Token expirado o invalido"
    });
  }
};