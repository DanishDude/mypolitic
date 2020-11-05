const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const httpErrors = require('http-errors');

// const { handleError } = require('./services/error');
// const passportManager = require('./services/passport');
// const indexRouter = require('./routes/index');
// const auth = require('./routes/auth');
// const politician = require('./routes/politician');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // false

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use(logger('dev'));
}

require('./db');
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(bearerToken());
// app.use(passportManager.initialize());

// API calls
// app.use('/api', indexRouter);
// app.use('/api/auth', auth);
// app.use('/api/politician', politician);

// Test API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get('/api/toto', (req, res) => {
  console.log('TOTO');
  res.send({toto: process.env.TOTO});
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    console.log('hello production');
    
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
