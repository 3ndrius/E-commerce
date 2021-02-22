const Product = require('../src/models/post.model')
const dotenv = require('dotenv')

dotenv.config();
require('../config/database')

const products = require('../data/products')
const { connect } = require('mongoose')

const seedProducts = async () => {
    
    try {
        await Product.deleteMany()
        console.log("Product deleted")
        await Product.insertMany(products)
        console.log("Product inserted successfully")
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProducts()