const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['./src/app.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    inline: true,
    port: 4000,
    contentBase: './dist',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
