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
