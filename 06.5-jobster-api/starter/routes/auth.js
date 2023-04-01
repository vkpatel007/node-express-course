const express = require('express')
const router = express.Router()
const auth = require('../middleware/authentication')
const testUser = require('../middleware/testUser')
const { register, login, updateUser } = require('../controllers/auth')
const rateLimiter = require('express-rate-limit')


const apiLimiter = rateLimiter({
  windowMS: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too Many requests from this IP, please try again after 15 minutes',
  }
})


router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', auth, testUser, updateUser)
module.exports = router
