const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
// const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const httpErrors = require('http-errors');
require('dotenv').config();

const { handleError } = require('./services/error');
const passportManager = require('./services/passport');
const auth = require('./routes/auth');
const messsage = require('./routes/message');
const indexRouter = require('./routes/index');
const politician = require('./routes/politician');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}

require('./db');
// Content Security Policy: The page’s settings blocked the loading of a resource at inline (“script-src”).
// app.use(helmet());

app.use(cookieParser());
app.use(cors());
app.use(bearerToken());
app.use(passportManager.initialize());

// API calls
app.use('/api', indexRouter);
app.use('/api/auth', auth);
app.use('/api/message', messsage);
app.use('/api/politician', politician);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(httpErrors(404));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
