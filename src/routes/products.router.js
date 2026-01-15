import express from "express";
import { getAllProducts, addProduct, setProductById, deleteProductById } from "../controllers/products.controller.js"

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/", addProduct);

productsRouter.put("/:pid", setProductById);

productsRouter.delete("/:pid", deleteProductById);


export default productsRouter;

// const router = Router();
// const productManager = new ProductManager("./src/products.json");

// router.get("/", async (req, res) => {
//   const products = await productManager.getProducts();
//   res.json(products);
// });

// router.post("/", async (req, res) => {
//   const product = req.body;
//   const products = await productManager.addProduct(product);
//   res.status(201).json(products);
// });

// router.delete("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const products = await productManager.deleteProductById(pid);
//   res.json(products);
// });

// export default router;
