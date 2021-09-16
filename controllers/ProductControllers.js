import ProductosAPI from '../api/Productos.js';

export default class ProductsController {

  constructor() {
    this.productosAPI = new ProductosAPI();
  }

  getProducts = async() => {
    try {
      const productos = await this.productosAPI.getProductos();
      if (productos.length === 0) { return [] }
      return productos;
    } catch (err) { return { error: "No hay productos cargados." }; }
  };
  
  getProduct = async(id) => {
    try {
      const prod = await this.productosAPI.getProducto(id);
      if (!prod) { return { error: "Producto no encontrado." } }
      return prod;
    } catch (err) { return { error: "Producto no encontrado." }; }
  };
  
  postProduct = async(producto) => {
    try {
      return await this.productosAPI.postProducto(producto);
    } catch (err) { return { error: "Se produjo un error en la grabación del producto." }; }
  };
  
  updateProduct = async(id, producto) => {
    try {
      return await this.productosAPI.updateProducto(id, producto);
    } catch (err) { return { error: "Producto no encontrado." }; }
  };
  
  deleteProduct = async(id) => {
    try {
      return await this.productosAPI.deleteProducto(id);
    } catch (err) { return { error: "Producto no encontrado." }; }
  };
  
  post = async(producto) => {
    try {
      const newProducto = await this.productosAPI.postProducto(producto);
      return newProducto;
    } catch (err) { return { error: "Error al grabar producto" } }
  };
  
  get = async() => {
    try {
      const productos = await this.productosAPI.getProductos();
      if (productos.length === 0) { return { error: "No hay productos cargados." }; }
      return productos;
    } catch (err) {
      return { error: "No hay productos cargados." };
    }
  };

}