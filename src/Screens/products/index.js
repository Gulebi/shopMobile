import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { useQuery, useLazyQuery } from "@apollo/client";
import { productsGQL } from "../../services/gqls";
import { getProductsAction } from "./actions";
import { ProductItem } from "../../components";

const Products = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    const [updateList, { loading }] = useLazyQuery(productsGQL.getProducts, getProductsAction(setProducts));

    useEffect(() => {
        updateList({
            variables: {
                query: {},
            },
        });

        const unsubscribe = navigation.addListener("focus", (e) => {
            updateList({
                variables: {
                    query: {},
                },
            });
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                numColumns={2}
                columnWrapperStyle={styles.listWrapper}
                horizontal={false}
                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listWrapper: {
        gap: 10,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});
export default Products;
