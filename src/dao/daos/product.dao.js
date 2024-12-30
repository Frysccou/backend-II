import Product from '../models/product.model.js';

class ProductDAO {
  async findAll() {
    return await Product.find();
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async create(product) {
    return await Product.create(product);
  }

  async update(id, product) {
    return await Product.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductDAO();