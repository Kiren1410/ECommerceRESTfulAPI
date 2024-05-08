const Product = require("../models/product");

const getProducts = async (category, perPage = 4, page = 1) => {
  try {
    let filters = {};
    if (category) {
      filters.category = category;
    }
    /* 
          sorting > 1 is asc, -1 is desc
          default sorting is sort by _id > { _id: 1 }
          */
    /* 
          Pagination
          .limit() // limit the amount of items returned
          .skip() // skip given amount
        */
    const products = await Product.find(filters)
      .limit(perPage) // 4
      .skip((page - 1) * perPage) //
      .sort({ _id: -1 });
    return products;
  } catch (error) {
    throw new Error(error);
  }
};

// get 1 product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const addProduct = async (name, description, price, category) => {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });

  await newProduct.save();
  return newProduct;
};

const updateProduct = async (
  product_id,
  name,
  description,
  price,
  category
) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    product_id,
    {
      name,
      description,
      price,
      category,
    },
    { new: true }
  );
  return updatedProduct;
};

// delete
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
