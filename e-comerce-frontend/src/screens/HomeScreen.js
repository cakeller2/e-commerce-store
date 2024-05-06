import './HomeScreen.css'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Components
import Product from '../components/Product'

//Actions
import {getProducts as listProducts} from '../redux/actions/productActions'
import {setUserDeatils} from '../redux/actions/userAction'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const getProducts = useSelector(state => state.getProducts)
  const {products, loading, error} = getProducts

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUserDeatils())
  }, [dispatch])

  return (
  <div className="homescreen">
    <h2 className="homescreen__title">Latest Products</h2>
    <div className="homescreen__products">
    if (loading) {
      content = <h2>Loading...</h2>
    } else if (error) {
      content = <h2>{error}</h2>
    } else {
      content = products.map(product => (
    <Product
      key={product._id}
      name={product.name}
      description={product.description}
      price={product.price}
      imageUrl={product.imageUrl}
      productId={product._id}
    />
  ))
}

return content;
      </div>
    </div>
  )
}

export default HomeScreen
