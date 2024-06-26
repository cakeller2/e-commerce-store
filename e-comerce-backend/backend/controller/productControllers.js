const products = require("../data/products")

const getProducts = async (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = findElementByProperty(products, 'id', req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

function findElementByProperty(array, property, value) {
  return array.find(element => element[property] === value);
}

module.exports = {
  getProducts,
  getProductById,
};
