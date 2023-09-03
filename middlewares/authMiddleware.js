import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
// import User from '../models/userModel.js'
import knex from '../db.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req?.headers?.token

  // INFO: if we use cookies for token, use code below
  // token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // TODO: find a way to use EXCEPT in knex (to get everything except password)
      const userResults = await knex('users')
        .select('id', 'isAdmin', 'email', 'name', 'created_at')
        .where('id', decoded.userId)
      req.user = userResults[0]
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authortized, invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not Authortized, no token')
  }
})

export { protect }
