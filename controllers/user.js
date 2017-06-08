const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports.registerGet = (req, res) => {
  res.render('user/register')
}

module.exports.registerPost = (req, res) => {
  let reqUser = req.body

  if (reqUser.password && (reqUser.password !== reqUser.confirmedPassword)) {
    reqUser.error = 'Passwords do not match.'
    res.render('user/register', reqUser)
    return
  }

  let user = {
    username: reqUser.username,
    firstName: reqUser.firstName,
    lastName: reqUser.lastName,
    age: reqUser.age,
    gender: reqUser.gender
  }

  let salt = encryption.generateSalt()
  user.salt = salt

  if (reqUser.password) {
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)
    user.password = hashedPassword
  }

  User.create(user)
    .then(user => {
      req.logIn(user, (error, user) => {
        if (error) {
          res.render('user/register', { error: 'Authentication not working!' })
          return
        }

        res.redirect('/')
      })
    })
    .catch(error => {
      reqUser.error = error
      res.render('user/register', reqUser)
    })
}
