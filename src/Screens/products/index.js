import React, {useState} from 'react';
import {View, FlatList, Image, Dimensions, StyleSheet, Text} from 'react-native';
import { 
  useQuery,
  useLazyQuery
} from '@apollo/client';
import { productsGQL } from '../../Services/gqls';
import {getProducts} from './actions'
import config from '../../Config'

const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

const Products = ({navigation})=>{
  const [products, setProducts] = useState([])

  useQuery(productsGQL.getProducts, getProducts(setProducts));

  const Item = ({item}) => (
    <View style={styles.item}>
      <Image 
        resizeMode='cover'
        style={styles.productImg}
        source={{uri: `${config.public}${item.picture}`}} 
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
  console.log("PRODUCTS", products)
  return(
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.listWraper}
        horizontal={false}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item._id}
      />
  )
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    flex:1,
  },
  productImg: {
    height: 200,
    width: '100%'
  },
  listWraper: {
    gap: 10, 
    backgroundColor: '#fff',
    paddingVertical: 5, 
    paddingHorizontal: 10
  },
  title: {
    fontSize: windowWidth * .03,
    color: '#000'
  },
});
export default Products