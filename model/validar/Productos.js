import Joi from 'joi';

export default class Productos {

	static validar(producto) {
		const ProductoSchema = Joi.object({
			title: Joi.string().required(),
			price: Joi.number().integer().required(),
			thumbnail: Joi.string().required()
		});

		const { error } = ProductoSchema.validate(producto);
		if (error) {
			throw error;
		}
	}

}