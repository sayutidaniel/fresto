import express from 'express';
import { findRestaurant } from './provider/yelp';
import Category from '../../models/Category';
import Restaurant from '../../models/Restaurant';

const router = new express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then((restaurant) => {
      const isUpdated = restaurant.createdAt.getTime() === restaurant.updatedAt.getTime();

      // re-fetch because some data from yelp search is not provided, e.g. reviews
      if (restaurant === null || isUpdated) {
        return findRestaurant(id);
      }
      return restaurant;
    })
    .then(restaurant =>
      Category.find({
        alias: {
          $in: restaurant.categoryIds,
        },
      })
        .then(categories => Object.assign(restaurant.toJSON(), {
          categories: categories.map(category => category.toJSON()),
        }))
    )
    .then(data => res.send(data))
    .catch(err => res.status(err.statusCode || 500).send(err.data));
});

export default router;
