import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

import configMongoose from './configMongoose';

dotenv.config();

const secret = process.env.SECRET_KEY;

const User = configMongoose.User;

export default [
  {
    route: ['login'],
    call: (callPath, args) => {
      const { username, password } = args[0];
      const saltedPassword = `${password}pubApp`;
      const saltedPassHash = crypto
        .createHash('sha256')
        .update(saltedPassword)
        .digest('hex');
      const userStatementQuery = {
        $and: [
          { 'username': username },
          { 'password': saltedPassHash }
        ]
      }
      return User.find(userStatementQuery, (err, user) => {
        if (err) throw err;
      }).then((result) => {
        if (result.length) {
          const role = result[0].role;
          const userDetailsToHash = username + role;
          const token = jwt.sign(userDetailsToHash, secret);
          return [
            {
              path: ['login', 'token'],
              value: token
            },
            {
              path: ['login', 'username'],
              value: username
            },
            {
              path: ['login', 'role'],
              value: role
            },
            {
              path: ['login', 'error'],
              value: false
            }
          ];
        } else {
          return [
            {
              path: ['login', 'token'],
              value: "INVALID"
            },
            {
              path: ['login', 'error'],
              value: "NO USER FOUND, incorrect login information"
            }
          ];
        }
      })
    }
  },
  {
    route: ['register'],
    call: (callPath, args) => {
      const newUserObj = args[0];
      newUserObj.password = `${newUserObj.password}pubApp`;
      newUserObj.password = crypto
        .createHash('sha256')
        .update(newUserObj.password)
        .digest('hex');
      const newUser = new User(newUserObj);
      return newUser.save()
        .then((newRes) => {
          const newUserDetail = newRes.toObject();
          if (newUserDetail._id) {
            const newUserId = newUserDetail._id.toString();
            return [
              {
                path: ['register', 'newUserId'],
                value: newUserId
              },
              {
                path: ['register', 'error'],
                value: false
              }
            ];
          } else {
            return [
              {
                path: ['register', 'newUserId'],
                value: 'INVALID'
              },
              {
                path: ['register', 'error'],
                value: 'Registration failed - no id has been created'
              }
            ]
          }
        }).catch((reason) => console.error(reason));
    }
  }
];
