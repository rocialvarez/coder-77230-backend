import Cart from "../models/cart.model.js";

export default class CartDAO {

  getById = async (cid) => {
    return await Cart.findById(cid).populate("products.product");
  };

  create = async () => {
    return await Cart.create({});
  };

  update = async (cid, update) => {
    return await Cart.findByIdAndUpdate(cid, update, { new: true });
  };

  clear = async (cid) => {
    return await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
  };
}
