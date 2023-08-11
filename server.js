const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const connectToDB = require('./db');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');


const app = express();

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const db = connectToDB();

db.once('open', () => {

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
if (process.env.NODE_ENV !== 'production') {
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        })
    );
} else {
    app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET || "Secret",
    store: MongoStore.create(db),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV == 'production',
    }
}));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/static', express.static(path.join(__dirname, '/backfront/build/static')));


app.use('/api', require('./routes/ads.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/backfront/build/index.html'));
});


app.use((req, res) => {
    res.status(400).send('Not found..');
});

});