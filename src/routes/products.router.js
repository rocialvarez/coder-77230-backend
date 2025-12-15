import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager("./src/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = req.body;
  const products = await productManager.addProduct(product);
  res.status(201).json(products);
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.deleteProductById(pid);
  res.json(products);
});

export default router;
