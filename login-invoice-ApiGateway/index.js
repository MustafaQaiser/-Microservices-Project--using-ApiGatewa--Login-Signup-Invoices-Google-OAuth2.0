const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authenticateUser = require('./authenticateUser')

const app = express();
const PORT = 3001;

// API Gateway routing rules
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/invoices',authenticateUser ,createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));

// Add a generic proxy rule for all other routes
app.use('/', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
