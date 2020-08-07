const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Establish .env variables
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

// Connect MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected and working ❤❤');
  });

// Create Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
