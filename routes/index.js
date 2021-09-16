import express from "express";
import ProductRoutes from './ProductRoutes.js';
import MensajesRoutes from './MensajesRoutes.js';
import FrontRoutes from './FrontRoutes.js';

const routes = express.Router();
routes.use(express.json());

const frontRoutes = new FrontRoutes();
const productRoutes = new ProductRoutes();
const mensajesRoutes = new MensajesRoutes();

routes.use('/', frontRoutes.init());
routes.use('/api/productos', productRoutes.init());
routes.use('/api/mensajes', mensajesRoutes.init());
// routes.get('*', function (req, res) { res.render('404'); });

export default routes;