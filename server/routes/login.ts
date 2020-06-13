import express from 'express';
const loginRouter = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

// add middleware (controllers)
//or signup
loginRouter.post(
  '/login',
  userController.verifyUser,
  cookieController.setCookie,
  cookieController.verifyUser,
  (req, res) => {
    if (res.locals.err) {
      res.status(500).json({ error: res.locals.err });
    } else if (res.locals.user) {
      res.status(200).json(res.locals.user);
      //send res.cookie?

      //res.redirect('/'); // last page they were in
    } else if (res.locals.matchedFound) {
      res.status(500).json({
        error: 'that user account does not exist, please sign up',
      });
    }
  }
);

loginRouter.post(
  '/signup',
  userController.createUser,
  cookieController.setCookie,
  (req, res) => {
    if (res.locals.err) {
      res.status(500).json({ error: res.locals.err });
    }
    res.sendStatus(201); // last page they were in
  }
);

module.exports = loginRouter;
