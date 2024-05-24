const express = require('express')
const {
  signUpUser,
  signInUser,
  getUser,
  getUsers
} = require('../controller/user.controller')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router.get("/", getUsers);
router.post('/signup', signUpUser)
router.post('/signin', signInUser)

router.route('/me').get([verifyUser], getUser)

module.exports = router
