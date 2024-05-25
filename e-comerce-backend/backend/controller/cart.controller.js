const cartDb = require('../data/cartDb')
let correctCarts = []

const getCartProducts = async (req, res) => {
  try {
   // const carts = await Cart.find({userId: req.user._id}).populate('productId')
   const conditionFn = element => element.userId === req.user.email;
    const carts = findAndDelete(cartDb);
    const updatedCarts = findElementsByCondition(carts, conditionFn);
    res.status(200).send({status: 'ok', updatedCarts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
// This logic is a bit fuzzy because it appears that it is going to find any cart and update it
// It is not clear in how it will find the "correct" cart
 const addProductInCart = async (req, res) => {
  const {cartId, userId, productId, count} = req.body
  try {
    cartDb.push({cartId: cartId, userId: userId, productId: productId, count: count});
    const conditionFn = element => element.userId === req.user.email;
    const carts = findAndDelete(cartDb);
    const updatedCarts = findElementsByCondition(carts, conditionFn);
    res.status(201).send({status: 'ok', updatedCarts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
const deleteProductInCart = async (req, res) => {
  try {
    //await Cart.findByIdAndRemove(req.params.id)
    const conditionFn = element => element.cartId != req.params.id;
    correctCarts.push(req.params.id);
    const carts = findAndDelete(cartDb);
    const updatedCarts = findElementsByCondition(carts, conditionFn);
    res.status(200).send({status: 'ok', updatedCarts, correctCarts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

function findAndDelete(array) {
  let final = array
  for (const i of final) {
    final = final.filter(element => element.cartId != correctCarts[i]);
  }
  return final
}

function findElementsByCondition(array, conditionFn) {
  return array.filter(conditionFn);
}

function getCorrectCarts(){
  return correctCarts;
}

module.exports = {addProductInCart, deleteProductInCart, getCartProducts, getCorrectCarts}
