const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
