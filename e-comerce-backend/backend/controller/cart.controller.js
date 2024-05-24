const Cart = require('../models/Cart')
const cartDb = require('../data/cartDb')

const getCartProducts = async (req, res) => {
  try {
   // const carts = await Cart.find({userId: req.user._id}).populate('productId')
   const conditionFn = element => element.userId === req.user.email;
   const carts = findElementsByCondition(cartDb, conditionFn )
    res.status(200).send({status: 'ok', carts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
// This logic is a bit fuzzy because it appears that it is going to find any cart and update it
// It is not clear in how it will find the "correct" cart
 const addProductInCart = async (req, res) => {
  const {productId, count} = req.body
  try {
    //const cart = await Cart.findOneAndUpdate(
    //  {productId},
    //  {productId, count, userId: req.user._id},
    //  {upsert: true},
    //)

  const updateFn = item => ({ count: count});

  const updatedCollection = findAndUpdate(cartDb, 'productId', productId, updateFn);

    const conditionFn = element => element.userId === req.user.email;
    const carts = findElementsByCondition(cartDb, conditionFn )
    
    res.status(201).send({status: 'ok', carts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
const deleteProductInCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id)
    res.status(200).send({status: 'ok'})
  } catch (e) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

function findAndUpdate(collection, property, value, updateFn) {
  return collection.map(item => {
    if (item[property] === value) {
      return { ...item, ...updateFn(item) };
    }
      return item;
  });
}

function findElementsByCondition(array, conditionFn) {
  return array.filter(conditionFn);
}

module.exports = {addProductInCart, deleteProductInCart, getCartProducts}
