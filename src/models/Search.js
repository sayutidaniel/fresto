import mongoose from 'mongoose';
import db from '../db';
import { GeoJSON } from './types';
import { fromPointToLatLng } from './util';

const Search = new mongoose.Schema({
  categoryIds: [String],
  limit: Number,
  location: String,
  offset: Number,
  result: {
    _id: false,
    region: {
      _id: false,
      center: GeoJSON,
      span: [Number],
    },
    restaurantIds: [String],
    total: Number,
  },
  sort: Number,
  term: String,
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      ret.result.region.center = fromPointToLatLng(ret.result.region.center);
      ret.result.region.span = fromPointToLatLng({ coordinates: ret.result.region.span });
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

Search.index({categoryIds: 1});
Search.index({createdAt: 1});
Search.index({sort: 1});

export default db.model('Search', Search);
