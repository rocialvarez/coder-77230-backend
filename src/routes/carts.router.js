import express from "express";
import passport from "passport";
import { authorize } from "../middlewares/authorization.middleware.js";
import { createCart,getCartById, clearCart, purchaseCart } from "../controllers/carts.controller.js";

const cartsRouter = express.Router();

cartsRouter.post("/", createCart);

cartsRouter.get("/:cid", getCartById);

cartsRouter.delete("/:cid", clearCart);

cartsRouter.post("/:cid/purchase", passport.authenticate("jwt", { session: false }), authorize(["user"]), purchaseCart);

export default cartsRouter;
