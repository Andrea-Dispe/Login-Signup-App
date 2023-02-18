const express = require('express');
const app = express();
const cors = require('cors');
const startDB = require('./config/db')

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

app.listen(PORT, () => {
  startDB()
  console.log(`listening on http://localhost:${PORT}`); // eslint-disable-line no-console
});