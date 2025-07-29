// packages/api/jest.setup.js
const path = require('path');
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.test'),
});