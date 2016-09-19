import mongoose from 'mongoose';
import db from '../db';

const Category = new mongoose.Schema({
  alias: String,
  parents: [String],
  title: String,
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

Category.index({alias: 1});

export default db.model('Category', Category);
