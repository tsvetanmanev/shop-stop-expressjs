let Category = require('../models/Category')
let User = require('../models/User')

module.exports.addGet = (req, res) => {
  res.render('category/add')
}

module.exports.addPost = (req, res) => {
  let categoryObj = req.body
  categoryObj.creator = req.user._id

  Category.create(categoryObj).then((category) => {
    User.findById(category.creator).then((user) => {
      user.createdCategories.push(category._id)

      res.redirect('/')
    })
  })
}

module.exports.productByCategory = (req, res) => {
  let categoryName = req.params.category

  Category.findOne({name: categoryName})
    .populate('products')
    .then((category) => {
      if (!category) {
        res.sendStatus(404)
        return
      }

      res.render('category/products', {category: category})
    })
}
