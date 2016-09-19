import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const url = process.env.MONGO_URI;
const db = mongoose.connect(url);

export default db;
