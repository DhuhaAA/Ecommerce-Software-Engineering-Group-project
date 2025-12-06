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
    const { id } = req.params;
    try {
      const productByID = await Product.findById(id);
  
      if (!productByID) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      return res.status(200).json(productByID);
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      return res
        .status(500)
        .json({ message: "Server error retrieving product." });
    }
  };
  

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