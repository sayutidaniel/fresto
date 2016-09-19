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
      ret.id = ret._id;
      ret.location.coordinate = fromPointToLatLng(ret.location.coordinate);
      delete ret._id;
      delete ret.categoryIds;
      delete ret.__v;
      return ret;
    },
  },
});

Restaurant.index({'location.coordinate': '2dsphere'});

export default db.model('Restaurant', Restaurant);
