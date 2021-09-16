import Joi from 'joi';

export default class Mensajes {

	static validar(mensaje) {
		const MensajeSchema = Joi.object({
			username: Joi.string().required(),
			texto: Joi.string().required(),
			fecha: Joi.string().required()
		});
		
		const { error } = MensajeSchema.validate(mensaje);
		if (error) {
			throw error;
		}
	}

}