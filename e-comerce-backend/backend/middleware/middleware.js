const User = require('../models/User')
const usersDb = require('../data/usersDb')
const {verifyToken} = require('../utils/utility.function')

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send(!!msg ? msg : 'Invalid input !!')
}

const verifyUser = async (req, res, next) => {
  const {authorization} = req.headers
  if (!authorization) {
    sendResponseError(400, 'You are not authorized womp womp', res)
    return
  } else if (!authorization.startsWith('Bearer ')) {
    sendResponseError(400, 'You are not authorized ', res)
    return
  }

  try {
    const payload = await verifyToken(authorization.split(' ')[1])
    console.log(payload)
    if (payload) {
      //const user = await usersDb.usersCollection.findById(payload.id, {password: 0})

      // I was unclear what the payload ID was actually set to. This will default return the same user each time
      // This would need to be updated to look up the user based on the token ID
      const user = findElementByProperty(usersDb, 'email', 'camryn.keller@quinnipiac.edu');

      req['user'] = user

      next()
    } else {
      sendResponseError(400, `you are not authorizeed`, res)
    }
  } catch (err) {
    console.log('Error ', err)
    sendResponseError(400, `Error ${err}`, res)
  }
}

function findElementByProperty(array, property, value) {
  return array.find(element => element[property] === value);
}

module.exports = {
  sendResponseError,
  verifyUser,
}
