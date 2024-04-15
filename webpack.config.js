const path = require('path');

module.exports = {
  entry: './src/index.js', // Het invoerpunt van je applicatie
  output: {
    path: path.resolve(__dirname, 'dist'), // Waar je gebundelde bestanden terechtkomen
    filename: 'bundle.js' // De naam van het gebundelde bestand
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Reguliere expressie voor JavaScript-bestanden
        exclude: /node_modules/, // Negeer de node_modules map
        use: {
          loader: 'babel-loader', // Gebruik de babel-loader voor het verwerken van bestanden
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/, // Reguliere expressie voor CSS-bestanden
        use: ['style-loader', 'css-loader'] // Gebruik deze loaders voor het verwerken van CSS
      }
    ]
  },
  devServer: {
    contentBase: './dist', // De map waar de server naar kijkt om bestanden te serveren
    hot: true // Hot module reloading
  }
};
