const SubCategory = require("../models/subCategorySchema");

// const mypromise = (data) => {
//   return new Promise((resolve, reject) => {
//     let cat = [];
//     data.map(async (item) => {
//       try {
//         let subcategoryData = await SubCategory.find({parentCategory: item._id});
//         cat.push({
//           ...item,
//           suncategory: subcategoryData
//         });
//       if (cat.length == data.length) {
//           resolve(cat);
//         }
//       } catch (error) {
//         reject(error)
//       }
//     })
//   })
// }
const mypromise = (data)=>{
const catPromise = data.map(async(item)=>{
  const subcategoryData = await SubCategory.find({parentCategory: item._id})
  return{
    ...item,
    subcategory: subcategoryData
  }
})
 return Promise.all(catPromise)
}


module.exports = mypromise;