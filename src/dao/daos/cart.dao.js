import Cart from '../models/cart.model.js';

class CartDAO {
  async findById(id) {
    return Cart.findById(id).populate('products.product');
  }

  async create(cart) {
    return Cart.create(cart);
  }

  async update(id, cart) {
    return Cart.findByIdAndUpdate(id, cart, { new: true });
  }

  async delete(id) {
    return Cart.findByIdAndDelete(id);
  }
}

export default new CartDAO();