// src/server.js
const express = require('express');
require('dotenv').config();
const userRoutes = require('./app/routes/loginRoutes');
const app = express();
const port = process.env.NODE_PORT;
const { createServer } = require("http");
const cors = require('cors');

const httpServer = createServer(app);
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' })); // support json encoded bodies
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // support encoded bodies

app.use(function (req, res, next) {
  
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,cache-control,content-type,accept,authorization,new-token,invalidToken,refresh-token,AuthToken,RefreshToken,x-access-token,source');

  // res.setHeader('Access-Control-Expose-Headers', 'authorization,x-access-token,new-token,invalidToken,refresh-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
