// const dotenv = require('dotenv');
import * as dotenv from 'dotenv'
dotenv.config();

let vars = {
  env: process.env.REACT_APP_ENVIRONMENT
}

if (vars.env === 'Development') {
  vars.api = `${process.env.REACT_APP_DEV_HOST}:${process.env.REACT_APP_DEV_API_PORT}`
};

if (vars.env === 'Production') {
  vars.api = process.env.REACT_APP_PROD_HOST
};

export default vars