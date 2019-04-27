const webpack = require('webpack');
const path = require('path')

module.exports = function override(config, env) {
  return {
    ...config,
    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'semantic-ui-react': path.resolve('./node_modules/semantic-ui-react'),
      }
    }
  };
};