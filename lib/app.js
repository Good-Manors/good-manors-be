const express = require('express');
const app = express();
const ensureAuth = require('./middleware/ensure-auth');


app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/user', ensureAuth, require('./routes/url'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
