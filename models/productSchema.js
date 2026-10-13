const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
     title:{
        type: String,
        required: true,
        unique: true
     },
     description:{
        type: String,
        required: true,
     },
     shortDescription:{
        type: String,
        required: true,
     },
     sku:{
        type: String,
        required: true,
        unique: true
     },
     slug: {
         type: String,
         required: true,
         unique: true 
     },
     price:{
        type: Number,
        required: true
     },
     images: [
        {
            url:{
                type: String,

            },
            isMain:{
                type: Boolean,
                default: false
            }
        }
     ],
    discountPrice:{
        type: Number,
    },
    stock: {
        type: Number,
    },
    status:{
        type: String,
        enum: ['approved','rejected','pending'],
        default: 'pending'
    },
    // brand: {
    //     type: String
    // },
    category:{
           type: Schema.Types.ObjectId,
           ref: 'Category',
           required: true
    },
    subCategory:{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        
    }
    
},{timestamps: true})

module.exports= mongoose.model('Product',productSchema)