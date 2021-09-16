import MensajesFactoryDAO from '../model/DAOs/MensajesFactory.js';
import MensajeValidar from '../model/validar/Mensajes.js';
import { PERSISTENCIA } from '../utils/config.js';

export default class MensajesAPI {

  constructor() {
    this.mensajesFactory = MensajesFactoryDAO.set(PERSISTENCIA);
  }

  getMensajes = async() => {
    return await this.mensajesFactory.loadMensajes();
  }
  
  postMensaje = async(mensaje) => {
    const dt = new Date();
    mensaje.fecha = `${
      (dt.getMonth()+1).toString().padStart(2, '0')}/${
      dt.getDate().toString().padStart(2, '0')}/${
      dt.getFullYear().toString().padStart(4, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}:${
      dt.getSeconds().toString().padStart(2, '0')}`;
      MensajesAPI.validarMensaje(mensaje);
    await this.mensajesFactory.saveMensaje(mensaje)
    return mensaje
  }

  static validarMensaje(mensaje) {
    try {
      MensajeValidar.validar(mensaje)
    } catch (error) {
      throw new Error('Faltan datos en el mensaje ingresado: ' + error.details[0].message)
    }
  }

}