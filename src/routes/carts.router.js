import express from "express";
import Cart from "../models/cart.model.js";
import { throwHttpError } from "../utils/httpError.js";

const cartsRouter = express.Router();

cartsRouter.post("/", async(req,res,next) => {
  try {
    const cart = await Cart.create({});

    res.status(201).json({ status: "success", payload: cart});
  } catch (error) {
    next(error);
  }
});

cartsRouter.post("/:cid/product/:pid", async(req,res,next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body || {};


    const updatedCart = await Cart.findByIdAndUpdate(cid, {$push: { products: { product: pid, quantity }}}, {new: true, runValidators:true});

    res.status(200).json({status:"success", payload: updatedCart});
  } catch (error) {
    next(error);
  }
});


cartsRouter.get("/:cid", async(req,res,next) => {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findById(cid).populate("products.product");
    if(!cart) throwHttpError("Carrito no encontrado", 404);

    res.status(200).json({status: "success", payload: cart.products});
  } catch (error) {
    next(error);
  }
});

cartsRouter.delete("/:cid", async (req,res,next) => {
  try {
    const { cid } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      { products: [] },
      { new: true }
    );

    if (!updatedCart) throwHttpError("Carrito no encontrado", 404);

    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    next(error);
  }
});


cartsRouter.put("/:cid/products/:pid", async (req,res,next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body || {};


    const cart = await Cart.findById(cid);
    if (!cart) throwHttpError("Carrito no encontrado", 404);

    const product = cart.products.find(
      p => p.product.toString() === pid
    );
    if (!product) throwHttpError("Producto no encontrado en el carrito", 404);

    product.quantity = quantity;
    await cart.save();

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
});




export default cartsRouter;
