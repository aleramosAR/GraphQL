import MensajesMemory from './memory/Mensajes.js';
import MensajesFileSystem from './file/Mensajes.js';
import MensajesMongo from './mongo/Mensajes.js';
import MensajesMySQL from './mysql/Mensajes.js';

export default class MensajesFactory {

	static set(db) {
		console.log('PERSISTENCIA: ' + db);
		switch (db) {
			case 'mem':
				return MensajesMemory.getInstance();
			case 'file':
				return MensajesFileSystem.getInstance();
			case 'mongo':
				return MensajesMongo.getInstance();
			case 'mysql':
				return MensajesMySQL.getInstance();
		}
	}

}