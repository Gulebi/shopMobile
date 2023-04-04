const getProducts = (setProductList, query = {})=>{
    return {
      variables:{
        query
      },
      //fetchPolicy: 'network-only',
      onCompleted: ({getProducts})=>{
        console.log('PRODUCTS_HOME', getProducts)
        setProductList(getProducts)
      },
      onError: (err)=>{
        console.log('PRODUCTS_HOME', err)
      }
    }
  }

export {getProducts}
