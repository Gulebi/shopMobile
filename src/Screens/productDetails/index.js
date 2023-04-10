import {useState} from 'react'
import {View, Text} from 'react-native'
import { 
  useQuery,
} from '@apollo/client';
import { productsGQL } from '../../Services/gqls';
import actionProducts from './actions'
const ProductDetails = ({navigation, route})=>{
  const [productData, setProducData] = useState(route.params?.item);

  const putProduct = (data)=>{
    setProducData(data.product)
  }

  useQuery(productsGQL.getProduct, actionProducts.getProduct(putProduct, route.params?.item?._id));

 // console.log(8888888888, productData)

  return(
    <View>
      <Text >Screen2 {`${productData?.title}`} </Text>
    </View>
  )
}
export default ProductDetails