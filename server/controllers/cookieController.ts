import { Request, Response, NextFunction } from 'express';

const cookieController = {
  setCookie: (req: Request, res: Response, next: NextFunction) => {
    // create random number for cookie value and assign to isLoggedIn key
    const secret = Math.floor(Math.random() * 99);
    res.cookie('isLoggedIn', `${secret}`, { maxAge: 1800000 });
    res.cookie(`userId`, `${res.locals.user.id}`, { maxAge: 1800000 });
    return next();
  },

  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    console.log('verifyUser req.body', req.body);
    if (req.cookies.isLoggedIn) {
      return next();
    }
    return res.send(`You must be signed in to view this page`);
  },
};

module.exports = cookieController;
