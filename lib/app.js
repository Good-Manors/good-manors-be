const express = require('express');
const app = express();
const cors = require('cors');
const ensureAuth = require('./middleware/ensure-auth');

app.use(cors());
app.use(require('cookie-parser')());
app.use(express.json());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', ensureAuth, require('./routes/users'));
app.use('/api/v1/homes', ensureAuth, require('./routes/homes'));
app.use('/api/v1/drawers', ensureAuth, require('./routes/drawers'));
app.use('/api/v1/cards', ensureAuth, require('./routes/cards'));
app.use('/api/v1/initialize', ensureAuth, require('./routes/initialize'));

//Error Handling
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
