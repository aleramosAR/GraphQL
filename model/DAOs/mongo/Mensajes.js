import Mensaje from './models/Mensaje.js';
import mensajeDTO from '../../DTOs/Mensajes.js';

let instance = null;

export default class MensajesMongo {

  static getInstance() {
		if (!instance) {
			instance = new MensajesMongo();
		}
		return instance;
	}

  loadMensajes = async () => {
    return await Mensaje.find();
  };

  saveMensaje = async (mensaje) => {
    const DTO = mensajeDTO(mensaje);
    const newMensaje = new Mensaje(DTO);
    await newMensaje.save();
  };
}