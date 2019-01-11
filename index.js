const express = require('express'),
    webpush = require('web-push'),
    bodyParser = require('body-parser'),
    path = require("path"),
    url = require('url'),
    mongoose = require('mongoose'),
    keys = require('./config/keys'),
    fs = require('fs'),
    passport = require('passport'),
    passportSetup = require('./config/passport-setup'),
    authPolicy = require("./api/policies/AuthenticationPolicy"),
    formController = require("./api/controller/FormController"),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    app = express();

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");


app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// register cookieSession n cookieParser as middlewares
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    // keys: [keys.session.cookieKey],
    secret: "test",
    secure: false
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURL, () => {
    mongoose.Promise = global.Promise;
    console.log('connected to mongodb');
});

// wait for data to load from json file
const listData = fs.readFileSync('list.json');
const words = JSON.parse(listData);


app.get("/", formController.getList);

// auth with google
app.get('/auth/google', authPolicy.authenticate);

app.get('/auth/google/redirect',
    authPolicy.authenticate,
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/postmessage');
    });


app.get("/postmessage", authPolicy.authenticate, formController.get);

//logout Page
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.post("/postMessage", authPolicy.authenticate,
    formController.post);

// to do !_!_!_!
// app.post("/settings", authPolicy.authenticate, authPolicy.isAdmin,
//     settingsController.get);

app.use(express.static("assets"));

// Search Messeges for a specific date
app.get('/search/:id/', searchMessage);
function searchMessage(req, res) {
    res.send()
}

// push notification

webpush.setVapidDetails(
    "mailto:test@test.com",
    keys.vapidKeys.publicVapidKey,
    keys.vapidKeys.privateVapidKey
);

// get client
app.get('/client/client.js',(req, res, next)=>{
    res.sendFile( __dirname+'/client/client.js')
}) 

// get worker
app.get('/worker.js',(req, res, next)=>{
    res.sendFile( __dirname+'/client/worker.js')
})       

// Subscribe Route
app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload (opsl)
    const payload = JSON.stringify({ title: "ecspand" });

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

app.listen(process.env.port || 8080, () => {
    console.log('Now listening for requests')
})