const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors/index')

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const id = new Date().getDate()
  //just for demo, in production you want long complex and unguessable string value!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })




}

module.exports = { login, dashboard }

