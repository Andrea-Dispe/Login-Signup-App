const express = require('express');
const app = express();
const cors = require('cors');
const startDB = require('./config/db')
const cookieParser = require("cookie-parser");

const PORT = 3000;


// console.log('NODE_ENV ', NODE_ENV)
app.use(cors());
app.use(cookieParser());
app.use(express.json());
// use the auth route for all requests that pass through /auth

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));


app.listen(PORT, () => {
  startDB()
  console.log(`listening on http://localhost:${PORT}`); // eslint-disable-line no-console
});