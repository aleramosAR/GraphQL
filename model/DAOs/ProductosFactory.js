import ProductosMemory from './memory/Productos.js';
import ProductosFileSystem from './file/Productos.js';
import ProductosMongo from './mongo/Productos.js';
import ProductosMySQL from './mysql/Productos.js';

export default class ProductosFactory {

	static set(db) {
		switch (db) {
			case 'mem':
				return ProductosMemory.getInstance();
			case 'file':
				return ProductosFileSystem.getInstance();
			case 'mongo':
				return ProductosMongo.getInstance();
			case 'mysql':
				return ProductosMySQL.getInstance();
		}
	}
	
}