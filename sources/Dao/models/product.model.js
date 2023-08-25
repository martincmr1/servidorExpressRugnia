const mongoose = require('mongoose')

const productCollection = 'product'

const productSchema = new mongoose.Schema({
        title:String,
        description:String,
        price:Number,
        code : String,
        stock: Number, 
        status :String, 
        category: String,
        thumbnails:[String],
})

const Products = mongoose.model(productCollection,productSchema)

module.exports= Products