const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Handle preflight requests (OPTIONS)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Proxy League Client API with proper CORS header override
app.use('/liveclientdata', createProxyMiddleware({
  target: 'https://127.0.0.1:2999',
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  onProxyRes: (proxyRes, req, res) => {
    // Override or add CORS headers from proxied response
    proxyRes.headers['access-control-allow-origin'] = 'http://127.0.0.1:5500';
    
    // Also set on the outgoing response
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running at http://localhost:3000');
});
