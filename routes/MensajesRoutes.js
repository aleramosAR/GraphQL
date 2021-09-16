import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import MensajesController from '../controllers/MensajesControllers.js';


export default class MensajesRoutes {
	constructor() {
		this.controller = new MensajesController();
	}

	init() {
		const schema = buildSchema(`
			type Query {
				intro: String,
				mensajes: [Mensaje]
			}
			type Mutation {
				postMensaje(
					username: String
					texto: String
					fecha: String
					_id: String
				):Mensaje
			},
			type Mensaje {
				username: String
				texto: String
				fecha: String
				_id: String
			}
		`);

		const postMensaje = async({username,texto,fecha}) => {
			return await this.controller.postMensaje({username,texto,fecha});
		}

		const getMensaje = async() => {
			return await this.controller.getMensaje();
		}

		const root = {
			intro: () => 'Testeo de GraphQL - Mensajes',
			mensajes : getMensaje,
			postMensaje : postMensaje
		};

		const graphql = graphqlHTTP({
			schema: schema,
			rootValue: root,
			graphiql: true
		});

		return graphql;
	}
}