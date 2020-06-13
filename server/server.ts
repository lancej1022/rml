// import libraries
// require('dotenv').config();
import 'dotenv/config';
import express from 'express';
// import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.port || 8000;

// parse JSON and return req.bodycookies
app.use(bodyParser.json());

/*automatically parse urlencoded body content from incoming
request and place it in req.body*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('isLoggedIn'));

// // serve static files
// app.use('/public', express.static(path.join(__dirname, '../client/public')));

// // serve index.html
// app.get('/', (req, res) =>
//   res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'))
// );

// Require in routes
const loginRouter = require('./routes/login');
const apiRouter = require('./routes/api');

// route handlers
app.use('/', loginRouter);
app.use('/', apiRouter);

// catch-all route handler for any unknown route requests
app.use((req, res) => {
  console.log('in catch-all route handler');
  res.sendStatus(404);
});

// global error handler
app.use((req, res, err) => {
  console.log(`global error handler caught unknown middleware error: ${err}`);
  res.sendStatus(500).json({ err: 'an error has occurred' });
});

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

module.exports = app;
