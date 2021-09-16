import knex from 'knex';
import mensajeDTO from '../../DTOs/Mensajes.js';
import { CONFIG_MYSQL } from '../../../utils/config.js';

let instance = null;

export default class MensajesMySQL {

  static getInstance() {
		if (!instance) {
			instance = new MensajesMySQL();
		}
		return instance;
	}

	constructor() {
    this.knex = knex(CONFIG_MYSQL);

    (async () => {
      try {
        await this.crearTabla();
        console.log('Tabla en MYSQL de "Mensajes" creada');
      } catch (err) {
        console.log(err);
      }
    })();
  }

  async crearTabla() {
    await this.knex.raw('CREATE DATABASE IF NOT EXISTS ??', CONFIG_MYSQL.connection.database);

    return this.knex.schema.dropTableIfExists('mensajes')
      .then(() => {
        return this.knex.schema.createTable('mensajes', table => {
          table.string('username', 50).notNullable();
          table.string('texto', 256).notNullable();
          table.string('fecha').notNullable();
        });
    })
  }

  loadMensajes = async () => {
    const snap = await this.knex('mensajes').select();
		return (snap.length > 0) ? snap : [];
  };

  saveMensaje = async (mensaje) => {
    const DTO = mensajeDTO(mensaje);
    await this.knex('mensajes').insert(DTO);
    return mensaje;
  };
}