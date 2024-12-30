import ProductDAO from '../dao/daos/product.dao.js';

// Controlador para obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductDAO.findAll();
    res.json(products);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para obtener un producto por ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductDAO.findById(id);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(product);
  } catch (err) {
    console.error('Error al obtener producto:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para crear un nuevo producto
export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newProduct = await ProductDAO.create({ name, price, stock });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para actualizar un producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    const updatedProduct = await ProductDAO.update(id, { name, price, stock });
    if (!updatedProduct) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para eliminar un producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductDAO.delete(id);
    if (!deletedProduct) {
      return res.status(404).send('Producto no encontrado');
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).send('Error en el servidor');
  }
};