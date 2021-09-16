import mensajeDTO from '../../DTOs/Mensajes.js';

let instance = null;

export default class MensajesMemory {

  static getInstance() {
		if (!instance) {
			instance = new MensajesMemory();
		}
		return instance;
	}

	constructor() {
    this.mensajes = [];
  }

  loadMensajes = async () => {
    return this.mensajes;
  };

  saveMensaje = async (mensaje) => {
    const DTO = mensajeDTO(mensaje);
		this.mensajes.push(DTO);
  };
}