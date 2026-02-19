import { ProductDAO } from "../dao/ProductDAO.js";
import { ProductsRepository } from "../repository/ProductsRepository.js";
import { ProductService } from "./Product.service.js";
import CartDAO from "../dao/CartDAO.js";
import CartsRepository from "../repository/CartsRepository.js";
import CartsService from "./Carts.service.js";


const productDAO = new ProductDAO();
const productRepository = new ProductsRepository(productDAO);

const cartDao = new CartDAO();
const cartsRepository = new CartsRepository(cartDao);

export const productService = new ProductService(productRepository);
export const cartsService = new CartsService(cartsRepository);