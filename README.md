# Fresto
Fresto is a web app for helping people to find restaurants.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

    $ git clone https://github.com/sayutidaniel/fresto.git
    $ cd fresto
    $ npm install

### Configuration
By default there's already a config file in `config/default.json`, it should look something like this:
```
{
  "GOOGLE_MAP_API_KEY": "YOUR_GOOGLE_MAP_API_KEY",
  "MONGODB_URI": "mongodb://<dbuser>:<dbpassword>@<host>:<port>/<dbname>",
  "YELP": {
    "CONSUMER_KEY": "YOUR_YELP_API_CONSUMER_KEY",
    "CONSUMER_SECRET": "YOUR_YELP_API_CONSUMER_SECRET",
    "TOKEN": "YOUR_YELP_API_TOKEN",
    "TOKEN_SECRET": "YOUR_YELP_TOKEN_SECRET"
  }
}
```
Click the following step by step links to get your API key:
[Google Map API](https://developers.google.com/maps/documentation/javascript/get-api-key)
and
[Yelp API](https://www.yelp.com.sg/developers)

### Usage
Development
```bash
$ npm run build # npm run build:watch to watch file changes
$ npm run watch
```

Production

    $ NODE_ENV=production npm run build
    $ npm start

## License
This project is licensed under the MIT License.
