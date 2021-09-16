import MensajesAPI from '../api/Mensajes.js';

export default class MensajesController {

  constructor() {
    this.mensajesAPI = new MensajesAPI();
  }

  getMensaje = async() => {
    try {
      return await this.mensajesAPI.getMensajes();
    } catch (err) { return { error: "No hay mensajes cargados." }; }
  };

  postMensaje = async(mensaje) => {
    try {
      return await this.mensajesAPI.postMensaje(mensaje);
    } catch (err) { return { error: "Se produjo un error en la grabación del mensaje." }; }
  };
  
  getMensajes = async() => {
    try {
      const mensajes = await this.mensajesAPI.getMensajes();
      return mensajes;
    } catch (err) {
      return { error: "No hay mensajes cargados." };
    }
  };

}