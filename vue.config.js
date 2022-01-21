const fs = require("fs");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/f2e-tourist-frontend/'
    : '/',
  devServer: {
    https: {
      key: fs.readFileSync(`${__dirname}/src/assets/https/localhost-key.pem`),
      cert: fs.readFileSync(`${__dirname}/src/assets/https/localhost.pem`)
    }
  }
}