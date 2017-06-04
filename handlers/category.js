let Category = require('../models/Category')

module.exports.addGet = (req, res) => {
  res.render('category/add')
}

module.exports.addPost = (req, res) => {
  let categoryObj = req.body

  Category.create(categoryObj).then(() => {
    res.redirect('/')
  })
}
