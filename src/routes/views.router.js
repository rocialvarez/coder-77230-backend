import express from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", (req,res) => {
  res.redirect("/products");
});


viewsRouter.get("/products", async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const cart = await Cart.create({});

    const productsData = await Product.paginate(
      {},
      { limit, page, lean: true }
    );

    const products = productsData.docs;

    const links = [];
    for (let i = 1; i <= productsData.totalPages; i++) {
      links.push({ text: i, link: `/products?limit=${limit}&page=${i}` });
    }

    res.render("index", {
      products,
      links,
      cartId: cart._id.toString()
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/carts/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) throw new Error("Carrito no encontrado");

    res.render("cart", { products: cart.products });
  } catch (error) {
    next(error);
  }
});


export default viewsRouter;
