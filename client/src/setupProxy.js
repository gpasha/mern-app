const proxy = require("http-proxy-middleware")
const config = require('config')

module.exports = function(app) {
  app.use(proxy("/api/**", {
    target: config.get('baseUrl'),
    secure: false
  }));
};