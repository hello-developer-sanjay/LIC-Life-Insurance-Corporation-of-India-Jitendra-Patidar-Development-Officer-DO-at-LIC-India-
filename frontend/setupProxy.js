const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://eduxcel-api-14april.onrender.com/',
      changeOrigin: true,
    })
  );
};
