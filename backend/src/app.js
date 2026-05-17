// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');
const foodPartnerRoutes = require('./routes/food-partner.routes');


const app = express();
app.use(cookieParser()); // cookie parser is used as middleware
app.use(express.json()); // a middleware to parse req.body
app.use(cors({
    origin: 'https://first-project-mern-stack-lca2.vercel.app', // allow requests from this origin
    credentials: true // allow cookies to be sent with requests
}));



app.use('/api/auth', authRoutes); // to use auth routes
app.use('/api/food', foodRoutes); // to use food routes
app.use('/api/food-partner', foodPartnerRoutes); // to use food partner routes



module.exports = app;