import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'

const schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    category: String
})

schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)

export default productModel