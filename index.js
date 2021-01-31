const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/users')

const userRoutes = require('./routes/users');


const dbUrl = 'mongodb://localhost:27017/ecomm-store';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
    console.log('Database connected');
})

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const secret = 'tempsecret';

const sessionConfig = {
    //store
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 3600 * 7 * 24,
        maxAge: Date.now() + 1000 * 3600 * 7 * 24,
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);


app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.render('home');
})


const port = 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})