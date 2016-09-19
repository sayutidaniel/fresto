import express from 'express';
import { searchRestaurant } from './provider/yelp';
import Category from '../../models/Category';
import Restaurant from '../../models/Restaurant';
import Search from '../../models/Search';

const router = express.Router();

router.get('/', (req, res) => {
  const limit = 20;
  const query = {
    category_filter: `restaurants${req.query.category ? `,${req.query.category}` : ''}`,
    cll: req.query.coordinate,
    limit,
    location: req.query.location,
    offset: ((req.query.page || 1) - 1) * limit,
    sort: req.query.sort || 2,
    term: req.query.term,
  };

  Search.findOne({
    categoryIds: {
      $in: query.category_filter.split(',')
    },
    coordinate: query.cll,
    limit: query.limit,
    location: query.location,
    offset: query.offset,
    sort: query.sort,
    term: query.term,
    createdAt: {
      // cache for 30 days
      $gt: Date.now() - 2592000000
    },
  })
    .then((searchResult) => {
      if (searchResult === null) {
        return searchRestaurant(query);
      }
      return searchResult;
    })
    .then((searchResult) => {
      return Restaurant.find({
        _id: {
          $in: searchResult.result.restaurantIds,
        },
      })
        .then((restaurants) => {
          return Promise.all(restaurants.map((restaurant) => {
            return Category.find({
              alias: {
                $in: restaurant.categoryIds,
              },
            }).then((categories) => Object.assign(restaurant.toJSON(), {
              categories: categories.map((category) => category.toJSON()),
            }));
          }));
        })
        .then((restaurants) => {
          const searchJson = searchResult.toJSON();

          return {
            region: searchJson.result.region,
            total: searchJson.result.total,
            restaurants,
          };
        });
    })
    .then((data) => res.send(data))
    .catch((err) => res.status(err.statusCode).send(err.data));
});

export default router;
