const dotenv = require('dotenv');
// import * as dotenv from 'dotenv'
dotenv.config();

let config = {
  env: process.env.ENVIRONMENT
}

if (config.env === 'Development') {
  config.api = `${process.env.DEV_HOST}:${process.env.DEV_API_PORT}`
};

if (config.env === 'Production') {
  config.api = process.env.PROD_API
};

console.log('config: ', config);

module.exports = config