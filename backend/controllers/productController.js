import Product from "../models/productModel.js"


export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch{
        res.status(500).json({message:"Server error retrieving all products."})
    }
}

export const getProductsbyID = async (req, res) => {
    const productID = req.params.id
    if(!productID){
        res.status(500).json({message:"Server error retrieving product."})
    }

    try{
        const productByID = await Product.findById()
        res.status(200).json(productByID)
    }catch{
        res.status(500).json({message:"Server error retrieving product."})
    }
}

export const productsFilterBy = async (req, res) => {
    filteredWord = req.params.filteredBy
    try{
        // pass in here evenetually :) 
        const productFiltered = await Product.findById()
        res.status(200).json(productFiltered)
    }catch{
        res.status(500).json({message:"Server error filtered Products."})
    }
}