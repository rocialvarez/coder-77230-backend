import express from "express";
import passport from "passport";
import { authorize } from "../middlewares/authorization.middleware.js";
import { getAllProducts, addProduct, setProductById, deleteProductById } from "../controllers/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/", passport.authenticate("current", { session: false }), authorize(["admin"]), addProduct);

productsRouter.put("/:pid", passport.authenticate("current", { session: false }), authorize(["admin"]),setProductById);

productsRouter.delete("/:pid", passport.authenticate("current", { session: false }), authorize(["admin"]), deleteProductById);

export default productsRouter;
