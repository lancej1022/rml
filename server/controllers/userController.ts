import { Request, Response, NextFunction } from 'express';
const db = require('../models/model.ts');
const bcrypt = require('bcrypt');

const userController = {};

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const SALT_ROUNDS = 10;
  //deconstruct username and password from request body
  let { username, password } = req.body;

  //if user input field for username and password
  if (
    req.body.username !== null &&
    typeof req.body.username === 'string' &&
    req.body.password !== null &&
    typeof req.body.password === 'string'
  ) {
    //hash user inputted password
    bcrypt
      .hash(password, SALT_ROUNDS)
      .then((err: any, result: any) => {
        password = result;
      })
      .catch((err: any) => {
        return next(err);
      });
  }
  const userQuery = {
    text: 'SELECT * FROM "user" WHERE username = $1 AND password = $2',
    values: [username, password],
  };
  db.query(userQuery)
    .then((user: any) => {
      console.log(user);
      console.log('this is user data received back', user.rows[0]);
      if (user.rows.length === 0) {
        res.locals.matchedFound = false;
      } else {
        res.locals.user = user.rows[0];
      }

      return next();
    })
    .catch((err: any) => {
      next({
        log: `error in middleware userController.verifyUser: ${err}`,
      });
    });
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const SALT_ROUNDS = 10;
  //deconstruct username and password from request body
  let { username, password } = req.body;

  //if user input field for username and password
  if (
    req.body.username !== null &&
    typeof req.body.username === 'string' &&
    req.body.password !== null &&
    typeof req.body.password === 'string'
  ) {
    //hash user inputted password
    bcrypt
      .hash(password, SALT_ROUNDS)
      .then((err: any, result: any) => {
        password = result;
      })
      .catch((err: any) => {
        return next(err);
      });
    const userQuery = {
      text: `INSERT INTO "user" 
      (username, password)
      VALUES
      ($1, $2)`,
      values: [username, password],
    };
    db.query(userQuery)
      .then((user: any) => {
        /*this console is only for debugging*/
        console.log('this is user res', user);
        res.locals.user = user.rows[0];
        return next();
      })
      .catch((err: any) => {
        return next(`Error logging in: ${err}`);
      });
  } else {
    return `Error in inside createUser middleware`;
  }
};

module.exports = {
  verifyUser,
  createUser,
};
