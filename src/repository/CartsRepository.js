export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCartById = async (cid) => {
    return await this.dao.getById(cid);
  };

  createCart = async () => {
    return await this.dao.create();
  };

  updateCart = async (cid, update) => {
    return await this.dao.update(cid, update);
  };

  clearCart = async (cid) => {
    return await this.dao.clear(cid);
  };
}
