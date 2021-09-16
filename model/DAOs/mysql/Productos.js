import knex from 'knex';
import productoDTO from '../../DTOs/Productos.js';
import { CONFIG_MYSQL } from '../../../utils/config.js';

let instance = null;

export default class ProductosMySQL {

  static getInstance() {
		if (!instance) {
			instance = new ProductosMySQL();
		}
		return instance;
	}

  constructor() {
    this.knex = knex(CONFIG_MYSQL);

    (async () => {
      try {
        await this.crearTabla();
        console.log('Tabla en MYSQL de "Productos" creada');
      } catch (err) {
        console.log(err);
      }
    })();
  }

  async crearTabla() {
    await this.knex.raw('CREATE DATABASE IF NOT EXISTS ??', CONFIG_MYSQL.connection.database);

    return this.knex.schema.dropTableIfExists('productos')
      .then(() => {
        return this.knex.schema.createTable('productos', table => {
          table.increments('_id').primary();
          table.string('title', 50).notNullable();
          table.integer('price').notNullable();
          table.string('thumbnail').notNullable();
        });
    })
  }
  
  loadProductos = async () => {
		const snap = await this.knex('productos').select();
		return (snap.length > 0) ? snap : [];
  };
  
  loadProducto = async (id) => {
		return await this.knex('productos').where({ _id: id }).first();
  };
  
  saveProducto = async (producto) => {
    const DTO = productoDTO(producto);
		return await this.knex('productos').insert(DTO);
  };
  
  deleteProducto = async (id) => {
		return await this.knex.from('productos').where('_id', id).del();
  };
  
  updateProducto = async (id, newProduct) => {
		const existe = await this.knex('productos').where({ _id: id });
    if (existe.length) {
      const DTO = productoDTO(newProduct);
      await this.knex('productos').where({ _id: id }).update(DTO);
      return newProduct;
    }
    return false;
  };

} 