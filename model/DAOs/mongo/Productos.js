import Producto from './models/Producto.js'
import productoDTO from '../../DTOs/Productos.js';

let instance = null;

export default class ProductosMongo {

  static getInstance() {
		if (!instance) {
			instance = new ProductosMongo();
		}
		return instance;
	}

  loadProductos = async () => {
    return await Producto.find();
  };
  
  loadProducto = async (id) => {
    return await Producto.findOne({ _id: id })
  };
  
  saveProducto = async (producto) => {
    const DTO = productoDTO(producto);
    const newProducto = new Producto(DTO);
    await newProducto.save();
  };
  
  deleteProducto = async (id) => {
    await Producto.findOneAndRemove({ _id: id });
    return id;
  };
  
  updateProducto = async (id, newProduct) => {
    const DTO = productoDTO(newProduct);
    const updatedProducto = await Producto.replaceOne({ _id: id }, DTO );
    return updatedProducto;
  };

}