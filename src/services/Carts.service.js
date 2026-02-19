export default class CartsService {
  constructor(repository) {
    this.repository = repository;
  }

  createCart = async () => {
    return await this.repository.createCart();
  };

  getCartById = async (cid) => {
    return await this.repository.getCartById(cid);
  };

  clearCart = async (cid) => {
    return await this.repository.clearCart(cid);
  };
}
