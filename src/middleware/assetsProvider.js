import fs from 'fs';
import path from 'path';

function assetsProvider(req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    // load assets in memory
    const stats = res.locals.webpackStats.toJson();
    const assetsByChunkName = stats.assetsByChunkName;
    res.locals.assets = Object.keys(assetsByChunkName) // eslint-disable-line no-param-reassign
      .reduce((assets, name) => (
        assets.concat(stats.publicPath + assetsByChunkName[name])
      ), []);
    next();
  } else {
    // load assets in file
    fs.readFile(path.join(__dirname, 'webpack.assets.json'), (err, assets) => {
      res.locals.assets = JSON.parse(assets); // eslint-disable-line no-param-reassign
      next();
    });
  }
}

export default assetsProvider;
