import fs from "fs/promises";
import crypto from "crypto";

class CartManager {

  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  generateNewId() {
    return crypto.randomUUID();
  }

  async getCarts() {
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      return JSON.parse(fileData);
    } catch (error) {
      throw new Error("Error al obtener los carritos: " + error.message);
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();

      const newCart = {
        id: this.generateNewId(),
        products: []
      };

      carts.push(newCart);

      await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
      return newCart;

    } catch (error) {
      throw new Error("Error al crear el carrito: " + error.message);
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(c => c.id === cid);

      if (!cart) throw new Error("Carrito no encontrado");

      return cart;

    } catch (error) {
      throw new Error("Error al buscar un carrito: " + error.message);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(c => c.id === cid);

      if (cartIndex === -1) throw new Error("Carrito no encontrado");

      const cart = carts[cartIndex];

      const productIndex = cart.products.findIndex(p => p.product === pid);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } 
      else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");

      return cart;

    } catch (error) {
      throw new Error("Error al agregar producto al carrito: " + error.message);
    }
  }

}

export default CartManager;
