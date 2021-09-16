import ProductosFactoryDAO from '../model/DAOs/ProductosFactory.js';
import ProductoValidar from '../model/validar/Productos.js';
import { PERSISTENCIA } from '../utils/config.js';

export default class ProductosAPI {

  constructor() {
    this.productosFactory = ProductosFactoryDAO.set(PERSISTENCIA);
  }

  getProductos = async() => {
    return await this.productosFactory.loadProductos();
  }
  
  getProducto = async(id) => {
    return await this.productosFactory.loadProducto(id);
  }
  
  postProducto = async(producto) => {
    ProductosAPI.validarProducto(producto);
    await this.productosFactory.saveProducto(producto);
    return producto;
  }
  
  deleteProducto = async(id) => {
    const producto = await this.productosFactory.deleteProducto(id);
    return producto;
  }
  
  updateProducto = async(id, newData) => {
    const prod = await this.getProducto(id);
    if (!prod) { return res.status(404).json({ error: "Producto no encontrado." }); }
  
    let newProduct = {};
    newProduct.title = newData.title || prod.title;
    newProduct.price = newData.price || prod.price;
    newProduct.thumbnail = newData.thumbnail || prod.thumbnail;
  
    const updatedProduct = await this.productosFactory.updateProducto(id, newProduct);
    return updatedProduct;
  }

  static validarProducto(producto) {
    try {
      ProductoValidar.validar(producto)
    } catch (error) {
      throw new Error('Faltan datos en el producto ingresado: ' + error.details[0].message)
    }
  }

}