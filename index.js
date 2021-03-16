if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }

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
const AdminSettings = require('./models/adminSettings');
const ExpressError = require('./utils/ExpressError')


const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin')
const productRoutes = require('./routes/products')
const reviewRoutes = require('./routes/reviews')
const cartRoutes = require('./routes/cart');
const wrapAsync = require('./utils/wrapAsync');



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
app.use(express.static(path.join(__dirname, 'public')));


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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const getAdminSettings= async(req, res) => {
  const adminSettings = await AdminSettings.findOne({ 'name' : 'adminSettings' });
  return adminSettings;
}


app.use(async(req, res, next) => {
  try{
    const adminSettings = await getAdminSettings();
    res.locals.siteNameLocal = adminSettings.siteName;
    res.locals.contactLocal = adminSettings.contact;
    next();
  } catch(err) {
    next(err);
  }
})

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})




app.get('/', (req, res) => {
    res.render('home');
    //console.log(req.user)
})


app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/products/:id/reviews', reviewRoutes)
app.use('/cart', cartRoutes)

//app.post('/', wrapAsync(async (req, res, next)=> {
//    res.send(req.body);
//}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong'
    res.status(statusCode).render('error', { err })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})


//initialize adminSettings
/*
const AdminSetting = require('./models/adminSettings');

const initializeAdminSettings = async(req, res) => {
  await AdminSetting.findOneAndDelete({ 'name' : 'adminSettings' })
  const settingsConfig = {
    name: 'adminSettings',
    siteName: 'Placeholder',
    categories: [],
    contact: {
      adminName: 'testAdminName',
      email: 'testEmail',
      phoneNumber: 'testPhoneNumber',
    }
  }
  adminSettings = new AdminSetting(settingsConfig);
  await adminSettings.save();
  
}

initializeAdminSettings();


*/