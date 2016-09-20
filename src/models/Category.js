import mongoose from 'mongoose';
import db from '../db';

const Category = new mongoose.Schema({
  alias: String,
  parents: [String],
  title: String,
}, {
  toJSON: {
    transform(doc, ret) {
      const json = Object.assign({}, ret);
      delete json.__v; // eslint-disable-line no-underscore-dangle
      delete json._id; // eslint-disable-line no-underscore-dangle
      return json;
    },
  },
});

Category.index({ alias: 1 });

export default db.model('Category', Category);
