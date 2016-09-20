import mongoose from 'mongoose';
import db from '../db';
import { GeoJSON } from './types';
import { fromPointToLatLng } from './util';

/**
 * Model definition for search
 */
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
      const json = Object.assign({}, ret);
      json.id = json._id; // eslint-disable-line no-underscore-dangle
      json.result.region.center = fromPointToLatLng(json.result.region.center);
      json.result.region.span = fromPointToLatLng({ coordinates: json.result.region.span });
      delete json._id; // eslint-disable-line no-underscore-dangle
      delete json.__v; // eslint-disable-line no-underscore-dangle
      return json;
    },
  },
});

// TODO: optimize index, consider using text index
Search.index({ categoryIds: 1 });
Search.index({ createdAt: 1 });
Search.index({ sort: 1 });

export default db.model('Search', Search);
