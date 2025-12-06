import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sourceId: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    image: { type: String},
    originalPrice: { type: Number, required: true },
    discountedRate: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 10 }

}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);




export { Product };
export default Product;