import { Request, Response, NextFunction, Errback } from 'express';
const db = require('../models/model.ts');

const propertyController = {};

// ADD PROPERTY
const addProperty = (req: Request, res: Response, next: NextFunction) => {
  // body contains address, name*;
  // might have to transform how address is typed in? take into account extra spacing or commas
  const { name, address } = req.body;
  console.log(`name ${name}`);
  console.log(`address ${address}`);
  if (
    (req.body.name !== null && typeof req.body.name === 'string') ||
    (req.body.address !== null && typeof req.body.address === 'string')
  ) {
    const userQuery = {
      text: `
      INSERT INTO "property"
      (name, address)
      VALUES
      ($1, $2)
      `,
      values: [name, address],
    };
    db.query(userQuery)
      .then(() => {
        res.locals.success = true;
        return next();
      })
      .catch((err: any) => {
        return next(`Error inside createLandLord: ${err}`);
      });
  }
};

const addRating = (req: Request, res: Response, next: NextFunction) => {
  console.log('addRating body', req.body);
  const {
    timely_maintenance,
    appropriate_distance,
    respectful,
    communication,
    flexibility,
    transparency,
    organized,
    professionalism,
    property_id,
  } = req.body;

  const ratingQuery = {
    text: `
    INSERT INTO "rating"
    (timely_maintenance, appropriate_distance, respectful, communication, flexibility, transparency, organized, professionalism, property_id, user_id)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
    values: [
      timely_maintenance,
      appropriate_distance,
      respectful,
      communication,
      flexibility,
      transparency,
      organized,
      professionalism,
      property_id,
      req.cookies.userId,
    ],
  };

  db.query(ratingQuery)
    .then((rating: any) => {
      console.log(`I am the rating that was posted -->`, rating);
      res.locals.success = true;
      return next();
    })
    .catch((err: any) => {
      return next(`Error in addRating middleware: ${err}`);
    });
};

// GET COMMENTS
const getComments = (req: Request, res: Response, next: NextFunction) => {
  const { propertyId } = req.body;
  const commentQuery = {
    text:
      'SELECT comment, created_at FROM "comments" WHERE property_id=$1 ORDER BY id DESC',
    values: [propertyId],
  };
  db.query(commentQuery)
    .then((comments: any) => {
      console.log('comments received:', comments.rows);
      res.locals.comments = comments.rows;
      return next();
    })
    .catch((err: any) => {
      next((res.locals.err = err));
    });
};

// ADD COMMENT
const addComment = (req: Request, res: Response, next: NextFunction) => {
  // console.log('userId cookie inside addComment', req.cookies.userId);
  const { propertyId, comment } = req.body;
  console.log('addComment propertyId and comment', propertyId, comment);
  const commentQuery = {
    text:
      'INSERT INTO "comments" (property_id, comment, created_at, created_by) VALUES ($1,$2,NOW(),$3)',
    values: [propertyId, comment, req.cookies.userId],
  };
  db.query(commentQuery)
    .then((comment: any) => {
      console.log('this is the comment res:', comment.rows);
      // res.locals.comment = comment.rows;
      res.locals.success = true;
      return next();
    })
    .catch((err: any) => {
      next({
        log: `error in middleware propertyController.addComment: ${err}`,
      });
    });
};

// //GET ADDRESSES - gives list of a matching addresses
// propertyController.searchByAddress = (req, res, next) => {
//   const { address, name } = req.body;
//   let propertyQuery;
//   if (name !== '') {
//     propertyQuery = {
//       text: 'SELECT * FROM "property" WHERE name=$1 OR address=$2 ',
//       values: [name, address]
//     };
//   } else {
//     propertyQuery = {
//       text: 'SELECT * FROM "property" WHERE address=$1',
//       values: [address]
//     };
//   }
//   db.query(propertyQuery)
//     .then((property) => {
//       console.log('in db query for searchbyaddress data received:', property.rows);
//       if (property.rows.length === 0) {
//         return (res.locals.matchedFound = false);
//       } else {
//         res.locals.property = property.rows; // [{id:'',name: '', address: '', image: ''},etc.]
//       }
//       return next();
//     })
//     .catch((err) => {
//       next({
//         log: `error in middleware propertyController.searchByAddress: ${err}`
//       });
//     });
// };

// SEARCH BY CITY
const searchByCityNameAddress = (req: Request, res: Response, next: NextFunction) => {
  const { address } = req.body;
  console.log('search', address);
  const userQuery = {
    text: `
    SELECT * FROM "property"
    WHERE address LIKE ('%' ||$1|| '%') OR name LIKE ('%' ||$1|| '%')
    `,
    values: [address],
  };
  db.query(userQuery)
    .then((properties: any) => {
      res.locals.properties = properties.rows;
      return next();
    })
    .catch((err: any) => {
      return next(`Error in searchByCity middleware: ${err}`);
    });
};

// --- find the profile page (property row w/all comments and sections)----//

// propertyController.propertyProfile = (req, res, next) => {
//   const { id } = req.body;
//   const profileQuery = {
//     text: `WITH property_ratings as (
//       SELECT
//        property_id,
//        AVG(timely_maintenance) as tm,
//        AVG(appropriate_distance) as dist,
//        AVG(respectful) as res,
//        AVG(communication) as comm,
//        AVG(flexibility) as flex,
//        AVG(transparency) as tran,
//        AVG(organized) as org,
//        AVG(professionalism) as prof
//       FROM "rating"
//       GROUP BY property_id
//       ),
//       property_comments as (
//       SELECT
//         id as comment_id,
//        property_id,
//        comment,
//        created_at
//       FROM comments
//       ),
//       comment_ratings as (
//       SELECT
//       id as commentrating_id,
//       helpful,
//       flagged,
//       comments_id,
//       property_id
//       FROM commentrating
//       )
//       SELECT
//         p.*,
//         pr.*,
//         pc.*,
//         cr.*
//       FROM
//        "property" p
//        LEFT OUTER JOIN property_ratings pr
//         on p.id = pr.property_id
//        LEFT OUTER JOIN property_comments pc
//         on p.id = pc.property_id
//        LEFT OUTER JOIN comment_ratings cr
//         on p.id = cr.property_id
//       WHERE
//        p.id = $1 `,
//     values: [id]
//   };
//   db.query(profileQuery)
//     .then((profile) => {
//       console.log('this is returned sql res for profile', profile.rows);
//       let profileRow = profile.rows.filter((curr) => {
//         return (
//           (curr['tm'] = Number(curr['tm'].slice(0, 4))),
//           (curr['dist'] = Number(curr['dist'].slice(0, 4))),
//           (curr['res'] = Number(curr['res'].slice(0, 4))),
//           (curr['comm'] = Number(curr['comm'].slice(0, 4))),
//           (curr['flex'] = Number(curr['flex'].slice(0, 4))),
//           (curr['tran'] = Number(curr['tran'].slice(0, 4))),
//           (curr['org'] = Number(curr['org'].slice(0, 4))),
//           (curr['prof'] = Number(curr['prof'].slice(0, 4))),
//           (curr['overallRating'] =
//             (curr['tm'] +
//               curr['dist'] +
//               curr['res'] +
//               curr['comm'] +
//               curr['flex'] +
//               curr['tran'] +
//               curr['org'] +
//               curr['prof']) /
//             8)
//         );
//       });
//       console.log('this is profileRow', profileRow);
//       res.locals.propertyProfile = profileRow;
//       return next();
//     })
//     .catch((err) => {
//       next({
//         log: `error in middleware propertyController.propertyProfile: ${err}`
//       });
//     });
// };

const propertyProfile = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const profileQuery = {
    text: `SELECT cs.property_id, cs.comment,cs.created_at, cs.created_by,cs.id, cr.helpful, cr.flagged, cr.comments_id, r.timely_maintenance, r.appropriate_distance, r.respectful, r.communication, r.flexibility, r.transparency, r.organized, r.professionalism, round((timely_maintenance+appropriate_distance+respectful+communication+flexibility+transparency+organized+professionalism)/8.0, 2) as overallRating
    FROM comments as cs LEFT OUTER JOIN rating as r ON cs.property_id=r.property_id AND r.user_id=cs.created_by LEFT OUTER JOIN commentrating as cr ON cs.id= cr.comments_id WHERE cs.property_id=$1`,
    values: [id],
  };
  db.query(profileQuery)
    .then((profile: any) => {
      console.log('this is returned sql res for profile', profile.rows);
      res.locals.propertyProfile = profile.rows;
      return next();
    })
    .catch((err: any) => {
      next({
        log: `error in middleware propertyController.propertyProfile: ${err}`,
      });
    });
};

module.exports = {
  addProperty,
  addComment,
  getComments,
  addRating,
  searchByCityNameAddress,
  propertyProfile,
};
