import express from "express";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);


//handlebars config
app.engine( "handlebars", engine() );
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints

app.get("/", (req, res)=> {
  res.render("home");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// habilita poder recibir data en formato json
app.use(express.json());
app.use(express.static("./src/public"));
const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

//routes 

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.emit("products", await productManager.getProducts());

  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);
    io.emit("products", await productManager.getProducts());
  });

  socket.on("deleteProduct", async (pid) => {
    await productManager.deleteProductById(pid);
    io.emit("products", await productManager.getProducts());
  });
});

server.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});


// app.get("/api/products", async(req, res) => {
//     try { 
//         const products = await productManager.getProducts();

//     res.status(200).json({ message: "Lista de productos actualizada", products });
//     } catch(error){
//     res.status(500).json({ message: error.message });
//     }
// });

// app.delete( "/api/products/:pid", async (req, res) => {
//     try { 
//         const pid = req.params.pid;

//     const products = await productManager.deleteProductById(pid);
//     res.status(200).json ({ message: "Producto eliminado.", products }); } catch(error) {
// res.status(500).json({ message: error.message });
//     }
    
// } );

// app.post("/api/products", async (req, res) => {
// try {
//     const newProduct = req.body;

//     const products = await productManager.addProduct(newProduct);
//     res.status(201).json({ message: "Producto añadido", products });
// } catch (error) {
//     res.status(500).json({ message: error.message });
// }
// });

// app.put("/api/products/:pid", async(req, res) => {
//     try {
//         const pid = req.params.pid;
//         const updates = req.body;

//         const products = await productManager.setProductById(pid, updates);
//         res.status(200).json({ message: "Producto actualizado", products });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.get("/api/products/:pid", async (req, res) => {
//   try {
//     const pid = req.params.pid;
//     const product = await productManager.getProductById(pid);

//     res.status(200).json({ message: "Producto encontrado", product });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // api/carts

// app.post("/api/carts", async (req, res) => {
//   try {
//     const cart = await cartManager.createCart();
//     res.status(201).json({ message: "Carrito creado", cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// app.get("/api/carts/:cid", async (req, res) => {
//   try {
//     const cid = req.params.cid;
//     const cart = await cartManager.getCartById(cid);
//     res.status(200).json({ message: "Carrito encontrado", cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/carts/:cid/product/:pid", async (req, res) => {
//   try {
//     const { cid, pid } = req.params;
//     const cart = await cartManager.addProductToCart(cid, pid);
//     res.status(200).json({ message: "Producto agregado al carrito", cart });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// app.listen(8080, () => {
//     console.log("Servidor iniciado en el puerto 8080");
// });