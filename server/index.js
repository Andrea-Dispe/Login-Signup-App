const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 5000;
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors());
app.use(express.json());
// use the auth route for all requests that pass through /auth
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log('connected to the DB');
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((error) => {
    console.log(error);
    console.error(error.message);
  }); 
