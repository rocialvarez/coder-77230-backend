import { productService } from "../services/index.js";
import { throwHttpError } from "../utils/httpError.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit,
      page,
      lean: true
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await productService.getProducts(filter, options);

    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage
    } = result;

    res.status(200).json({
      status: "success",
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page: Number(page),
      hasPrevPage,
      hasNextPage
    });

  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);

    res.status(201).json({
      status: "success",
      payload: newProduct
    });

  } catch (error) {
    next(error);
  }
};

export const setProductById = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.pid,
      req.body
    );

    res.status(200).json({
      status: "success",
      payload: updatedProduct
    });

  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const deletedProduct = await productService.deleteProduct(
      req.params.pid
    );

    res.status(200).json({
      status: "success",
      payload: deletedProduct
    });

  } catch (error) {
    next(error);
  }
};
