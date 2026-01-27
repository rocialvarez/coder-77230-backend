import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { createHash } from "../utils/bcrypt.js";
import { passportCall } from "../utils/passportCall.js";

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
  passportCall("login"),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      user.toObject(),
      "CoderCoder123",
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      token
    });
  }
);


router.get(
  "/current",
  passportCall("current"),
  (req, res) => {
    res.json({
      status: "success",
      payload: req.user
    });
  }
);

export default router;
