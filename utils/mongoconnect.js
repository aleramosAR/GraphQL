import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import {MONGO_URI} from './config.js';

const storeData = {
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: 'clavesecreta',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600 * 1000 },
};

async function initDatabase() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

export { storeData, initDatabase }