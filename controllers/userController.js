import asyncHandler from 'express-async-handler'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import validator from 'email-validator'
import passwordValidator from '../utils/passwordValidator.js'
import knex from '../db.js'
import { generateToken } from '../utils/generateToken.js'
import matchPassword from '../utils/matchPassword.js'

// @desc    Auth user/set token
//route     POST /api/users/auth
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await knex('users').where({ email: email.toLowerCase() }).first()

  if (user && (await matchPassword(user, password))) {
    const token = generateToken(res, user.id)
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    })
  } else {
    throw new Error('Invalid email or password')
  }
})

// @desc    Register new user
//route     POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const user = await knex('users').where({ email: email.toLowerCase() }).first()
  const userExists = Boolean(user)
  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  if (!validator.validate(email)) {
    res.status(400)
    throw new Error('Email is not valid')
  }

  passwordValidator(password)

  const salt = await bcrypt.genSalt(10)
  const newPassword = await bcrypt.hash(password, salt)
  const newUser = {
    id: uuid(),
    name: name.toLowerCase(),
    email,
    password: newPassword,
  }

  try {
    await knex('users')
      .insert(newUser)
      .returning('id')
      .then((result) => {
        const id = result[0].id
        const token = generateToken(res, id)
        res.status(201).json({
          id,
          name: newUser.name,
          email: newUser.email,
          token,
        })
      })
    console.log('Successfully created new user')
  } catch (err) {
    console.error('Error ocurred when trying to insert new workout into db: ', err)
    throw new Error('Error ocurred when trying to insert new workout into db.')
  }
})

// @desc    Logout user
//route     POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'User logged out' })
})
// // @desc    Get user profile
// //route     GET /api/users/profile
// //@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  //   const user = {
  //     _id: req.user._id,
  //     name: req.user.name,
  //     email: req.user.email,
  //   }
  //   res.status(200).json(user)
})

// @desc    Update user profile
//route     PUT /api/users/profile
//@access   Admin
// TODO: implement a middleware to validate if logged user is admin or not
const updateUserProfile = asyncHandler(async (req, res) => {
  //   const user = await User.findById(req.user._id)
  //   if (user) {
  //     user.name = req.body.name || user.name
  //     user.email = req.body.email || user.email
  //     if (req.body.password) {
  //       user.password = req.body.password
  //     }
  //     const updatedUser = await user.save()
  //     res.status(200).json({
  //       _id: updatedUser._id,
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //     })
  //   } else {
  //     res.status(404)
  //     throw new Error('User not found')
  //   }
  //   res.status(200).json({ message: 'Update User Profile' })
})

// @desc    Update user name
//route     PUT /api/users/profile-name
//@access   Private
const updateUserProfileName = asyncHandler(async (req, res) => {
  //   const user = await User.findById(req.user._id)
  //   if (user) {
  //     if (!req.body.name) {
  //       res.status(401)
  //       throw new Error('New name is not valid')
  //     }
  //     user.name = req.body.name || user.name
  //     const updatedUser = await user.save()
  //     res.status(200).json({
  //       _id: updatedUser._id,
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //     })
  //   } else {
  //     res.status(404)
  //     throw new Error('User not found')
  //   }
  //   res.status(200).json({ message: 'Update User Profile' })
})

// @desc    Update user profile password
//route     PUT /api/users/profile-password
//@access   Private
const updateUserProfilePassword = asyncHandler(async (req, res) => {
  //   const user = await User.findById(req.user._id)
  //   if (user) {
  //     if (!req.body.password) {
  //       res.status(401)
  //       throw new Error('New password is not valid')
  //     }
  //     user.password = req.body.password
  //     const updatedUser = await user.save()
  //     res.status(200).json({
  //       _id: updatedUser._id,
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //     })
  //   } else {
  //     res.status(404)
  //     throw new Error('User not found')
  //   }
  //   res.status(200).json({ message: 'Update User Profile' })
})

export default {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserProfileName,
  updateUserProfilePassword,
}
