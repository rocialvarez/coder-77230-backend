import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { createHash } from "../utils/bcrypt.js";
import { passportCall } from "../utils/passportCall.js";
import { requestPasswordReset, resetPassword, current } from "../controllers/sessions.controller.js";

const router = express.Router();


router.post("/register", async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const cart = await Cart.create({});

    const user = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: cart._id
    });

    res.status(201).json({
      status: "success",
      payload: user
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const user = req.user;

    const userDTO = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
      cart: user.cart
    };

    const token = jwt.sign(userDTO, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({
      status: "success",
      token
    });
  }
);



router.get("/current", passportCall("current"), current);

router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
