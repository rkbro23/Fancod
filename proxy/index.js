const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy for FanCode streams
app.use(
  '/stream/fancode',
  createProxyMiddleware({
    target: 'https://dai.fancode.com',
    changeOrigin: true,
    pathRewrite: {
      '^/stream/fancode': '',
    },
    onProxyRes(proxyRes) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    },
  })
);

// Proxy for Sony streams
app.use(
  '/stream/sony',
  createProxyMiddleware({
    target: 'https://sonypartnersdaimenew.akamaized.net',
    changeOrigin: true,
    pathRewrite: {
      '^/stream/sony': '',
    },
    onProxyRes(proxyRes) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    },
  })
);

// Handle OPTIONS preflight requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(200);
});

module.exports = app;
