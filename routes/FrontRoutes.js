import express from 'express';
import passport from 'passport';
import { isAuth } from './middlewares/Middlewares.js';
import FrontControllers from '../controllers/FrontControllers.js';

export default class FrontRoutes {
	constructor() {
		this.controller = new FrontControllers();
		this.router = express.Router();
	}

	init() {
		this.router.use(passport.initialize());
		this.router.use(passport.session());

		this.router.get('/auth/facebook', passport.authenticate('facebook'));
		this.router.get(
			'/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect: '/index',
				failureRedirect: '/login',
			})
		);

		this.router.get('/', this.controller.redirectLogin);
		this.router.get('/index', isAuth, this.controller.goIndex);
		this.router.get('/login', this.controller.goLogin);
		this.router.get('/logout', this.controller.goLogout);
		this.router.get('/unauthorized', this.controller.goUnauthorized);
		this.router.get('/login-error', this.controller.goLoginError);
		this.router.get('/visitas', this.controller.goVisitas);
		this.router.get('/exit', this.controller.goExit);
		this.router.get('/fork', this.controller.goFork);

		return this.router;
	}
}
