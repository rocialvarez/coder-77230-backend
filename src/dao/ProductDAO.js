import Product from "../models/product.model.js";

export class ProductDAO {

  async get(filter, options) {
    return await Product.paginate(filter, options);
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}
