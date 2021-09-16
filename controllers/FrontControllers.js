import { PORT } from '../utils/config.js';

export default class FrontControllers {

  constructor() {
    this.visitas = 0;
  }

  redirectLogin = async(req, res) => {
    res.redirect('/login');
  };
  
  goIndex = async(req, res) => {
    res.render("index", { user: req.session.passport.user });
  };
  
  goLogin = async(req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("index");
    } else {
      res.render("login");
    }
  };
  
  goLogout = async(req, res) => {
    res.render("logout", { user: req.session.passport.user });
    req.logout();
  };
  
  goUnauthorized = async(req, res) => {
    res.render("unauthorized");
  };
  
  goLoginError = async(req, res) => {
    res.render("login-error");
  };
  
  goVisitas = async(req, res) => {
    res.end(`Visitas: ${++this.visitas}`);
  };
  
  goExit = async(req, res) => {
    res.end("Salida del proceso de node.js");
    process.exit();
  };
  
  goFork = async(req, res) => {
    res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
  };

}