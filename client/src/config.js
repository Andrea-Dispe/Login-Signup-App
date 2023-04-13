// const dotenv = require('dotenv');
import * as dotenv from 'dotenv'
dotenv.config();

let config = {
  env: process.env.REACT_APP_ENVIRONMENT
}

if (config.env === 'Development') {
  config.api = `${process.env.REACT_APP_DEV_API_HOST}:${process.env.REACT_APP_DEV_API_PORT}`;
  config.clientHost = `${process.env.REACT_APP_DEV_CLIENT_HOST}:${process.env.REACT_APP_DEV_CLIENT_PORT}`
};

if (config.env === 'Production') {
  config.api = process.env.REACT_APP_PROD_API_HOST;
  config.clientHost = process.env.REACT_APP_PROD_CLIENT_HOST
};

export default config