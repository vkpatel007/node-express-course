const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser, checkPermissions } = require('../utils')

const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
}


const getSingleUser = async (req, res) => {

  const user = await User.findById({ _id: req.params.id }).select('-password')

  if (!user) {
    throw new CustomError.NotFoundError(`No User with id: ${req.params.id}`)
  }
  checkPermissions(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}


const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

//updateUser with findOneandUpdate
// const updateUser = async (req, res) => {
//   const { name, email } = req.body
//   if (!name || !email) {
//     throw new CustomError.BadRequestError('Please input a name and email')
//   }
//   const user = await User.findOneAndUpdate({ _id: req.user.userId }, { email, name }, { new: true, runValidators: true })
//   const tokenUser = createTokenUser(user)
//   attachCookiesToResponse({ res, user: tokenUser })
//   res.status(StatusCodes.OK).json({ user: tokenUser })

// }

const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    throw new CustomError.BadRequestError('Please input a name and email')
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.email = email;
  user.name = name;

  await user.save()
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })

}



const updateUserPassword = async (req, res) => {
  console.log(req.body)
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Password does not match')
  }
  user.password = newPassword

  await user.save()
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Changed' })
}










module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword }