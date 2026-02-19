export class ProductsRepository {

  constructor(dao) {
    this.dao = dao;
  }

  getProducts(filter, options) {
    return this.dao.get(filter, options);
  }

  getProductById(id) {
    return this.dao.getById(id);
  }

  createProduct(data) {
    return this.dao.create(data);
  }

  updateProduct(id, data) {
    return this.dao.update(id, data);
  }

  deleteProduct(id) {
    return this.dao.delete(id);
  }
}
