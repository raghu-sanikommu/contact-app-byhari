const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const publicRouter = require('./routes/publicRouter');
const homeRouter = require('./routes/homeRouter');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('12345-67890-09876-54321'));
app.set('view engine', 'ejs');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contactapp';
const PORT = process.env.PORT || 5000;


mongoose.connect(MONGODB_URI, {useNewUrlParser: true,  useUnifiedTopology: true})
.then( (db) => console.log('Connected to Database ... ') )
.catch( (err) => console.log(err) );

app.use('/', publicRouter);

function auth(req, res, next) {
    if(req.signedCookies.authenticated === "yes") {
        next();
    }
    else {
        res.render('error', { status: 'Login Failed', message: '>> You aren\'t authenticated yet! Login to continue.' });
    }
}
app.use(auth);

app.use('/home', homeRouter);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT} ... `));
