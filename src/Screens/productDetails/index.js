import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { productsGQL } from "../../services/gqls";
import actionProducts from "./actions";
import { ProductDetailsCard } from "../../components";

const ProductDetails = ({ navigation, route }) => {
    const [productData, setProducData] = useState(route.params?.item);

    const putProduct = (data) => {
        setProducData(data.product);
    };

    useQuery(productsGQL.getProduct, actionProducts.getProduct(putProduct, route.params?.item?._id));

    return <View style={styles.container}>{productData && <ProductDetailsCard item={productData} />}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default ProductDetails;
