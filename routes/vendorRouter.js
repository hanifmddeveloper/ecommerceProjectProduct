const express = require('express')
const _ = express.Router()
const {createCategory,getAllCategory,createSubCategory,getAllSubCategory,getAllCategoryWiseSubCategory,getAllOwnerWiseCategory} = require('../controllers/vendorController')
const {createProduct,getAllProduct,deleteProduct} = require('../controllers/productController')
const multer = require('multer')



// upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let uniqueeName = `eco-${Date.now()}`
    cb(null,uniqueeName + '-'+ file.originalname)
  }
})
const upload = multer({ storage: storage })




// Category and SubCategory
_.post('/create/category',createCategory)
_.get('/all/category',getAllCategory)
_.post('/create/subcategory',createSubCategory)
_.get('/all/subcategory',getAllSubCategory)
_.get('/all/category/:id/subcategory',getAllCategoryWiseSubCategory)
_.get('/all/user/:id/category',getAllOwnerWiseCategory)

// Product

_.post('/create/product',upload.array('photo'),createProduct)
_.get('/getall/product',getAllProduct)
// _.get('/category/:categoryId/product',getProductCountByCategory)
// _.get('/subcategory/:subCategoryId/product',getProductCountBySubCategory)
_.delete('/delete/product/:id',deleteProduct)




module.exports = _