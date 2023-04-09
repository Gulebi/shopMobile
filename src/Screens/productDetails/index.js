import React from 'react'
import {View, Text} from 'react-native'

const ProductDetails = ({navigation, route})=>{

  return(
    <View>
      <Text onPress={()=>navigation.navigate('Home')}>Screen2 {`${route.params?.item?.title}`} </Text>
    </View>
  )
}
export default ProductDetails