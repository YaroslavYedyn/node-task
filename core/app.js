const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const { PORT, URL_MONGO, ALLOWED_ORIGIN } = require('./config/config');
const { apiRouter, notFound } = require('./routes');
const cronRun = require('./cron-jobs');

const app = express();

const configureCors = (origin, callback) => {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
};

app.use(cors({ origin: configureCors }));
console.log(dotenv);

_connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'core', 'static')));

app.use('/', apiRouter);
app.use('*', notFound);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status)
        .json({
            customCode: err.customCode || 0,
            message: err.message || '',
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun();
});

function _connectDb() {
    mongoose.connect(URL_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
