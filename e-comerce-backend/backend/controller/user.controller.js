const express = require('express')
const bcrypt = require('bcrypt')
//const User = require('../models/User')
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')
const usersDb = require('../data/usersDb')

const signUpUser = async (req, res) => {
  const {email, fullName, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)

    //await User.create({...req.body, password: hash})
    
    usersDb.push({email: email, fullName: fullName, password: hash})
    res.status(201).send('Sucessfully account opened ')
    return
  } catch (err) {
    console.log('Eorror : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    // const user = await User.findOne({email})
    const user = findElementByProperty(usersDb, 'email', email);

    if (!!!user) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, user.password)

    if (same) {
      let token = newToken(user)
      res.status(200).send({status: 'ok', token})
      return
    }
    
    sendResponseError(400, 'InValid password !', res)

  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const getUser = async (req, res) => {
  console.log(usersDb)

  res.status(200).send({user: req.user})
}

// Added to retrieve ALL users in the collection
const getUsers = async (req, res) => {
  console.log("Get Users")
  // /console.log(req)
  res.status(200).send(usersDb)
}


function findElementByProperty(array, property, value) {
  return array.find(element => element[property] === value);
}

module.exports = {signUpUser, signInUser, getUser, getUsers}
