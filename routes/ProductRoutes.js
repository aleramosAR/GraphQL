import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import ProductControllers from '../controllers/ProductControllers.js';


export default class ProductRoutes {
	constructor() {
		this.controller = new ProductControllers();
	}

	init() {
		const schema = buildSchema(`
			type Query {
				intro: String,
				products: [Producto],
				product(
					_id: String
				):Producto
			}
			type Mutation {
				postProduct(
					title: String,
					thumbnail: String,
					price: Int
				):Producto,
				updateProduct(
					_id: String,
					title: String,
					thumbnail: String,
					price: Int
				):Producto,
				deleteProduct(
					_id: String
				):Producto
			},
			type Producto {
				title: String
				thumbnail: String
				price: Int
				_id: String
			}
		`);

		const postProduct = async({title,thumbnail,price}) => {
			return await this.controller.postProduct({title,thumbnail,price});
		}

		const getProducts = async() => {
			return await this.controller.getProducts();
		}

		const getProduct = async({_id}) => {
			return await this.controller.getProduct(_id);
		}

		const deleteProduct = async({_id}) => {
			return await this.controller.deleteProduct(_id);
		}

		const updateProduct = async({_id, title,thumbnail,price}) => {
			return await this.controller.updateProduct(_id, {title,thumbnail,price});
		}

		const root = {
			intro: () => 'Testeo de GraphQL - Productos',
			products : getProducts,
			product : getProduct,
			postProduct : postProduct,
			updateProduct : updateProduct,
			deleteProduct : deleteProduct
		};

		const graphql = graphqlHTTP({
			schema: schema,
			rootValue: root,
			graphiql: true
		});

		return graphql;
	}
}
