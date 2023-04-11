import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image, FlatList } from "react-native";
import config from "../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { storeCart } from "../../services/store";
import { CartItem } from "../../components";

const windowWidth = Dimensions.get("window").width;

const Cart = ({ navigation }) => {
    const [cartList, setCartList] = useState(null);

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
                renderItem={({ item }) => <CartItem item={item} navigation={navigation} />}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        gap: 15,
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default Cart;
