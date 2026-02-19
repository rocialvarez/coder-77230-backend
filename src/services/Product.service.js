export class ProductService {

  constructor(repository) {
    this.repository = repository;
  }

  async getProducts(filter, options) {
    return await this.repository.getProducts(filter, options);
  }

  async createProduct(data) {
    if (!data.title || !data.price) {
      throw new Error("Datos incompletos");
    }

    return await this.repository.createProduct(data);
  }

  async updateProduct(id, data) {
    const product = await this.repository.updateProduct(id, data);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async deleteProduct(id) {
    const product = await this.repository.deleteProduct(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }
}
