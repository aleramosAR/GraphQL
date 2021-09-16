import fs from 'fs';
import productoDTO from '../../DTOs/Productos.js';

let instance = null;

export default class ProductosFileSystem {

  static getInstance() {
		if (!instance) {
			instance = new ProductosFileSystem();
		}
		return instance;
	}

	constructor() {
    this.productosLOG = './model/DAOs/file/logs/productos.txt';
    this.currentID = 1;

		(async () => {
			try {
				await fs.promises.readFile(this.productosLOG);
			} catch {
				await fs.promises.writeFile(this.productosLOG, JSON.stringify({}));
			}
		})();
	}

	loadProductos = async () => {
		try {
			const data = JSON.parse(await fs.promises.readFile(this.productosLOG));
      if (Object.keys(data).length === 0) return [];
			return data.productos;
		} catch (error) {
			console.log(error);
		}
	};

	loadProducto = async (id) => {
    try {
			const data = JSON.parse(await fs.promises.readFile(this.productosLOG));
      if (Object.keys(data).length === 0) return false;
      if (data.productos.length < 1) return false;
		  return data.productos.filter((prod) => prod._id === parseInt(id))[0];
		} catch (error) {
			console.log(error);
		}
	};

	saveProducto = async (producto) => {
		try {
			const data = JSON.parse(await fs.promises.readFile(this.productosLOG));
      if (Object.keys(data).length === 0) {
        data.productos = [];
        data.currentID = this.currentID;
      } else {
        this.currentID = data.currentID;
      };
      producto._id = this.currentID++;
      const DTO = productoDTO(producto);
      data.productos.push(DTO);
			this.saveFile(data.productos, this.currentID);
		} catch (error) {
			console.log(error);
		}
	};

	deleteProducto = async (id) => {
    const prodID = parseInt(id);
    try {
			const data = JSON.parse(await fs.promises.readFile(this.productosLOG));
      if (data.productos.length === 0) return false;
      const productos = data.productos;
      // Chequeo que item del array tiene el mismo ID para seleccionarlo
      let index;
      for (let i = 0; i < productos.length; i++) {
        if (productos[i]._id === prodID) {
          index = i;
          break;
        }
      }
      // Si el item existe lo elimino del array.
      if (index != undefined) {
        const product = productos[index];
        productos.splice(index, 1);
        this.saveFile(productos, this.currentID);
        return product;
      }
		} catch (error) {
			console.log(error);
		}
		// 
		
	};

	updateProducto = async (id, newProduct) => {
    const prodID = parseInt(id);
    try {
			const data = JSON.parse(await fs.promises.readFile(this.productosLOG));
      if (Object.keys(data).length === 0) return false;
      if (data.productos.length < 1) return false;

      // Chequeo que item del array tiene el mismo ID para seleccionarlo
      let index;
      for (let i = 0; i < data.productos.length; i++) {
        if (data.productos[i]._id === prodID) {
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
        data.productos[index] = DTO;
        this.saveFile(data.productos, this.currentID);
        return DTO;
      }
		} catch (error) {
			console.log(error);
		}
	};

  // Grabo los datos al TXT
  async saveFile(productos, id) {
    const obj = {
      productos: productos,
      currentID: id
    };
    try {
      await fs.promises.writeFile(this.productosLOG, JSON.stringify(obj, null, "\t"));
    } catch(err) {
      console.log(err);
    }
  }
}
