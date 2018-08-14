const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(express.json());

app.use(cookieSession({
  maxAge: 30*24*60*60*1000,
  keys: [keys.cookieKey]  
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);