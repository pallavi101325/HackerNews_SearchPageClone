const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://hn.algolia.com/api/v1/', // Replace with the URL of the actual API server
      changeOrigin: true,
    })
  );
};
