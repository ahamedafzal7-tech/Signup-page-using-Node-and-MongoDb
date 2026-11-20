require("dotenv").config();
const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./router/userRoutes');
const adminRoutes = require('./router/adminRoutes');

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

//  Cache Control
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount Routers
app.use('/', userRoutes);
app.use('/', adminRoutes);

// Fallback to 
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





// id ahamedafzal7@gmail.com
// pass Afzal123@