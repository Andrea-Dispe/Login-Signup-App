// const dotenv = require('dotenv');
import * as dotenv from 'dotenv'
dotenv.config();

let vars = {}
if (process.env.REACT_APP_ENVIRONMENT === 'Development') {
  vars = {
    env: process.env.REACT_APP_ENVIRONMENT,
    host: `${process.env.REACT_APP_DEV_HOST}:${process.env.REACT_APP_DEV_API_PORT}`,
  };
}


if (process.env.REACT_APP_ENVIRONMENT === 'Production') {
  vars = {
    env: process.env.REACT_APP_ENVIRONMENT,
    host: process.env.REACT_APP_PROD_HOST,
  };
}

export default vars