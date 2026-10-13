let Product = require('../models/productSchema')

let createProduct = async(req,res)=>{
  let { title,description,shortDescription,price,discountPrice,category,subCategory,isMain,owner}= req.body
  // upload images 
  let images = []
  req.files.map((item,index)=>{
    images.push({
      url: item.path,
      isMain: index == isMain ? true : false
    })
  })

  if(!title|| !description || !shortDescription ||!price || !discountPrice || !category || !subCategory){
     res.status(400).json({
        success: false,
        message: "please fill all the fieds"
     })
  } 
// make slug
let slug = (title.toLowerCase().split(" ").join("-"))
// make unique of slug
let existingSlug = await Product.findOne({slug : slug})
if(existingSlug){
  return res.status(400).json({
    success: false,
    message: "Slug already exits.."
  })
}
//  if not found slug then it generate sku
let sku = `eco-${Date.now()}`
let existingSku = await Product.findOne({sku: sku})
if(existingSku){
  return res.status(400).json({
    success: flase,
    message: "Sku already exits.."
  })
 }
//  Save in database
let product = new Product({
  title: title,    // create from body
  description: description,   
  shortDescription: shortDescription,
  price: price,
  discountPrice: discountPrice,
  category: category,
  subCategory: subCategory,
  slug: slug,
  sku: sku,
  images: images,
  owner: owner
})
await product.save()
return  res.status(201).json({
  success: true,
  message: "Product created successfully..",
  product : product
})
}
// get all product 
let getAllProduct = async (req,res)=>{
let product = await Product.find({}).populate("category").populate('subCategory').populate('owner')
res.status(200).json({
  success: true,
  message: "All Products",
  product: product
})
}
// can get onwerwise Category



// can delete one product by id
let deleteProduct = async (req,res)=>{
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid product id is required'
      })
    }

    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}





module.exports= {createProduct,getAllProduct,deleteProduct}