import mongoose from 'mongoose';
import db from '../db';
import { GeoJSON } from './types';
import { fromPointToLatLng } from './util';

const Restaurant = new mongoose.Schema({
  _id: String,
  categoryIds: [String],
  displayPhone: String,
  imageUrl: String,
  location: {
    _id: false,
    coordinate: GeoJSON,
    displayAddress: String,
  },
  name: String,
  rating: Number,
  ratingImgUrl: String,
  ratingImgUrlLarge: String,
  ratingImgUrlSmall: String,
  reviewCount: Number,
  reviews: [{
    _id: false,
    excerpt: String,
    rating: Number,
    ratingImgUrl: String,
    ratingImgUrlLarge: String,
    ratingImgUrlSmall: String,
    timeCreated: Number,
    user: {
      _id: false,
      imageUrl: String,
      name: String,
    },
  }],
  snippetImageUrl: String,
  snippetText: String,
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      const json = Object.assign({}, ret);
      json.id = json._id; // eslint-disable-line no-underscore-dangle
      json.location.coordinate = fromPointToLatLng(json.location.coordinate);
      delete json.__v; // eslint-disable-line no-underscore-dangle
      delete json._id; // eslint-disable-line no-underscore-dangle
      delete json.categoryIds;
      return json;
    },
  },
});

Restaurant.index({ 'location.coordinate': '2dsphere' });

export default db.model('Restaurant', Restaurant);
