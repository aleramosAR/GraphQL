import dotenv from 'dotenv';
import path from 'path';
import { Strategy as FacebookStrategy} from 'passport-facebook';
import minimist from 'minimist';
import passport from "passport";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const minimistArgs = minimist(process.argv.slice(2));

dotenv.config({
  path: path.resolve(__dirname, '../' + process.env.NODE_ENV + '.env')
})

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '559885825005670';
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || '6a2926fd1ded556381f2275ddfbee1f2';

// Configuración de Passport
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, userProfile, done) {
  return done(null, userProfile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (usuario, done) {
  return done(null, usuario);
});

export const GRAPHIQL = process.env.GRAPHIQL || 'true';
export const PERSISTENCIA = process.env.PERSISTENCIA || 'mem';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://user:pass@cluster0.99scg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
export const PORT = minimistArgs.p || 8080;
export const passportConfig = passport;
export const CONFIG_MYSQL = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
  }
}