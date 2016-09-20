import config from 'config';
import Url from 'url';
import { OAuth } from 'oauth';
import Restaurant from '../../../models/Restaurant';
import Search from '../../../models/Search';

const YELP_API_HOST = 'api.yelp.com';
const YELP_API_VERSION = 'v2';
const CONSUMER_KEY = config.get('YELP.CONSUMER_KEY');
const CONSUMER_SECRET = config.get('YELP.CONSUMER_SECRET');
const TOKEN = config.get('YELP.TOKEN');
const TOKEN_SECRET = config.get('YELP.TOKEN_SECRET');

const oauth = new OAuth(
  null,
  null,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
);

function get(path, query) {
  return new Promise((resolve, reject) => {
    const url = Url.format({
      protocol: 'https',
      host: YELP_API_HOST,
      pathname: `${YELP_API_VERSION}/${path}`,
      query,
    });

    oauth.get(url, TOKEN, TOKEN_SECRET, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(data));
    });
  });
}

/**
 * serialize yelp search API result to our Search model structure
 *
 * @see Search
 */
function serializeSearch(query, searchResult) {
  return {
    categoryIds: query.category_filter.split(','),
    limit: query.limit,
    location: query.location,
    offset: query.offset,
    result: {
      region: {
        center: {
          type: 'Point',
          coordinates: [
            searchResult.region.center.longitude,
            searchResult.region.center.latitude,
          ],
        },
        span: [
          searchResult.region.span.longitude_delta,
          searchResult.region.span.latitude_delta,
        ],
      },
      restaurantIds: searchResult.businesses.map(business => business.id),
      total: searchResult.total,
    },
    sort: query.sort,
    term: query.term,
  };
}

/**
 * serialize yelp business API result to our Restaurant model structure
 * @see Restaurant
 */
function serializeRestaurant(business) {
  return {
    _id: business.id,
    categoryIds: business.categories.map(category => category[1]),
    displayPhone: business.display_phone,
    imageUrl: business.image_url,
    location: {
      coordinate: {
        type: 'Point',
        coordinates: [
          business.location.coordinate.longitude,
          business.location.coordinate.latitude,
        ],
      },
      displayAddress: business.location.display_address.join(', '),
    },
    name: business.name,
    rating: business.rating,
    ratingImgUrl: business.rating_img_url,
    ratingImgUrlLarge: business.rating_img_url_large,
    ratingImgUrlSmall: business.rating_img_url_small,
    reviewCount: business.review_count,
    reviews: business.reviews && business.reviews.map(review => ({
      excerpt: review.excerpt,
      rating: review.rating,
      ratingImgUrl: review.rating_img_url,
      ratingImgUrlLarge: review.rating_img_url_large,
      ratingImgUrlSmall: review.rating_img_url_small,
      timeCreated: review.time_created,
      user: {
        imageUrl: review.user.image_url,
        name: review.user.name,
      },
    })),
    snippetImageUrl: business.snippet_image_url,
    snippetText: business.snippet_text,
  };
}

/**
 * fetch available restaurants from yelp API and store the search query and results,
 * we only store business id of the results for references and always try to insert
 * new restaurants for specific information
 *
 * TODO: implement better way to avoid duplicate key error on insertion
 */
export function searchRestaurant(query) {
  return get('search', query)
    .then(searchResult =>
      Promise.all([
        Search.create(serializeSearch(query, searchResult)),
        Restaurant.create(searchResult.businesses.map(business => serializeRestaurant(business)))
          .catch(err => console.error(err.stack)),
        // log duplicate key error
      ])
    )
    .then(results => results[0]);
}

/**
 * fetch restaurants data from yelp API and do an upsert to ensure we have the right data
 */
export function findRestaurant(_id) {
  return get(`business/${encodeURIComponent(_id)}`)
    .then(business => Restaurant.findOneAndUpdate(
      { _id },
      { $set: serializeRestaurant(business) },
      {
        new: true,
        upsert: true,
      }
    ));
}
