import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image, FlatList, Button } from "react-native";
import config from "../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { storeCart } from "../../services/store";
import { CartItem } from "../../components";

const windowWidth = Dimensions.get("window").width;

const Cart = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);

    const onDelete = (id) => {
        setCartList(cartList.filter((el) => el._id !== id));
    };

    const updateList = async () => {
        setCartList(await storeCart.get_cart_list());
    };

    useEffect(() => {
        updateList();
        const unsubscribe = navigation.addListener("tabPress", (e) => {
            updateList();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={cartList}
                contentContainerStyle={styles.list}
                horizontal={false}
                renderItem={({ item }) => (
                    <CartItem item={item} navigation={navigation} onDelete={onDelete} updateList={updateList} />
                )}
                keyExtractor={(item) => item._id}
            />
            <View style={styles.totalContainer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalAmount}>Товаров: </Text>
                    <Text style={styles.totalAmount}>{cartList.length}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalPrice}>Итог: </Text>
                    <Text style={styles.totalPrice}>
                        ${cartList.reduce((acc, el) => acc + el.price_one * (el.count || 1), 0)}
                    </Text>
                </View>
                <View>
                    <Button title="Купить" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        gap: 25,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    totalContainer: {
        gap: 3,
        paddingHorizontal: 25,
        paddingVertical: 5,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalAmount: {
        fontSize: windowWidth * 0.04,
        color: "#000",
    },
    totalPrice: {
        fontSize: windowWidth * 0.05,
        color: "#000",
    },
});

export default Cart;
