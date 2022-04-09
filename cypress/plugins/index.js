const injectDevServer = require('@cypress/react/plugins/next')

module.exports = (on, config) => {
    if (config.testingType === 'component') {
        injectDevServer(on, config)
    }
    return config
}

// const webpackConfig = require('./webpack.config');
// const { startDevServer } = require('@cypress/webpack-dev-server');

// module.exports = (on, config) => {
  // on('dev-server:start', (options) =>
    // startDevServer({
      // options,
      // webpackConfig,
    // }),
  // );
  // return config;
// };