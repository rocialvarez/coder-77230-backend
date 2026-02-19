import { cartsService } from "../services/index.js";

export const createCart = async (req, res, next) => {
  try {
    const cart = await cartsService.createCart();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.clearCart(cid);

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

export const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const result = await cartsService.purchaseCart(cid, req.user.email);

    res.status(200).json({
      status: "success",
      payload: result
    });

  } catch (error) {
    next(error);
  }
};