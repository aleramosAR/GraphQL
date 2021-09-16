import productoDTO from '../../DTOs/Productos.js';

let instance = null;

export default class ProductosMemory {

	static getInstance() {
		if (!instance) {
			instance = new ProductosMemory();
		}
		return instance;
	}

  constructor() {
		this.num = Math.random();
    this.currentID = 1;
    this.productos = [];
  }
  
  loadProductos = async () => {
    return this.productos;
  };
  
  loadProducto = async (id) => {
    if (this.productos.length < 1) {
			return false;
		}
    return this.productos.filter(prod => prod._id === parseInt(id))[0];
  };
  
  saveProducto = async (producto) => {
    producto._id = this.currentID++;
		const DTO = productoDTO(producto);
    this.productos.push(DTO);
  };
  
  deleteProducto = async (id) => {
    const prodID = parseInt(id);
		// Chequeo que item del array tiene el mismo ID para seleccionarlo
		let index;
		for (let i = 0; i < this.productos.length; i++) {
			if (this.productos[i]._id === prodID) {
				index = i;
				break;
			}
		}
		// Si el item existe lo elimino del array.
		if (index != undefined) {
			const product = this.productos[index];
			this.productos.splice(index, 1);
			return product;
		}
  };
  
  updateProducto = async (id, newProduct) => {
    const prodID = parseInt(id);
		// Chequeo que item del array tiene el mismo ID para seleccionarlo
		let index;
		for (let i = 0; i < this.productos.length; i++) {
			if (this.productos[i]._id === prodID) {
				index = i;
				break;
			}
		}
		// Si el item existe lo reemplazo.
		// Al product que recibo desde el body le agrego el ID correspondiente y lo grabo
		if (index != undefined) {
			newProduct.price = parseInt(newProduct.price);
			newProduct._id = prodID;
			const DTO = productoDTO(newProduct);
			this.productos[index] = DTO;
			return DTO;
		}
  };

} 