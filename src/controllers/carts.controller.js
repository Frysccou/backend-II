import CartDAO from '../dao/daos/cart.dao.js';
import ProductDAO from '../dao/daos/product.dao.js';
import Ticket from '../dao/models/ticket.model.js';
import { v4 as uuidv4 } from 'uuid';

export const getCurrentCart = async (req, res) => {
  try {
    const cart = await CartDAO.findById(req.user.cart);
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }
    res.json(cart);
  } catch (err) {
    console.error('Error al obtener el carrito:', err);
    res.status(500).send('Error en el servidor');
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await CartDAO.findById(req.user.cart);
    const product = await ProductDAO.findById(productId);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const existingProduct = cart.products.find(item => item.product._id.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).send('Producto agregado al carrito');
  } catch (err) {
    console.error('Error al agregar producto al carrito:', err);
    res.status(500).send('Error en el servidor');
  }
};

export const updateProductQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await CartDAO.findById(req.user.cart);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    const product = cart.products.find(item => item.product._id.toString() === productId);

    if (!product) {
      return res.status(404).send('Producto no encontrado en el carrito');
    }

    product.quantity = quantity;
    await cart.save();

    res.status(200).send('Cantidad del producto actualizada');
  } catch (err) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', err);
    res.status(500).send('Error en el servidor');
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await CartDAO.findById(req.user.cart);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    cart.products = cart.products.filter(item => item.product._id.toString() !== productId);
    await cart.save();

    res.status(200).send('Producto eliminado del carrito');
  } catch (err) {
    console.error('Error al eliminar el producto del carrito:', err);
    res.status(500).send('Error en el servidor');
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const cart = await CartDAO.findById(req.user.cart);

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    let totalAmount = 0;
    const productsToPurchase = [];
    const productsNotPurchased = [];

    for (const item of cart.products) {
      const product = await ProductDAO.findById(item.product._id);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();
        totalAmount += product.price * item.quantity;
        productsToPurchase.push({
          product: product.name,
          quantity: item.quantity,
          price: product.price,
          total: product.price * item.quantity
        });
      } else {
        productsNotPurchased.push(item);
      }
    }

    const ticket = new Ticket({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: req.user.email,
      products: productsToPurchase
    });

    await ticket.save();

    // Eliminar los productos comprados del carrito
    cart.products = cart.products.filter(item => productsNotPurchased.includes(item));
    await cart.save();

    res.json({
      ticket: {
        code: ticket.code,
        purchase_datetime: ticket.purchase_datetime,
        amount: totalAmount,
        purchaser: ticket.purchaser,
        products: productsToPurchase
      },
      productsNotPurchased: productsNotPurchased.map(item => ({
        product: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }))
    });
  } catch (err) {
    console.error('Error al finalizar la compra:', err);
    res.status(500).send('Error en el servidor');
  }
};