import Product from "../models/product.model.js";
import { throwHttpError } from "../utils/httpError.js";

export const getAllProducts = async (req,res,next) => {
  try {
    const {
      limit = 10,
      page = 1,
      sort,
      query
    } = req.query;

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

    const result = await Product.paginate(filter, options);

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
      hasNextPage,
      prevLink: hasPrevPage
        ? `/api/products?limit=${limit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `/api/products?limit=${limit}&page=${nextPage}`
        : null
    });
  } catch (error) {
    next(error);
  }
};


export const addProduct = async (req,res,next) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({status: "success", payload: newProduct});
  } catch (error) {
    next(error);
  }
};

export const setProductById = async (req,res,next) => {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });

    if(!updatedProduct) throwHttpError("Producto no encontrado", 404);

    res.status(200).json({status: "success", payload: updatedProduct});
  } catch (error) {
    next(error)
  }
};

export const deleteProductById = async (req,res,next) => {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) throwHttpError("Producto no encontrado", 404)

    res.status(200).json({status: "success", payload: deletedProduct});
  } catch (error) {
    next(error)
  }
};