import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from "react-native";
import config from "../../Config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { storeCart } from "../../Services/store";

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
            {cartList?.map((item) => {
                return (
                    <View style={styles.item} key={item._id}>
                        <View>
                            <Image
                                resizeMode="contain"
                                style={styles.productImg}
                                source={{ uri: `${config.public}${item.picture}` }}
                            />
                            <Text style={styles.title} numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text style={styles.category} numberOfLines={2}>
                                {item.category.title}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    item: {
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 10,
    },
    itemContent: {
        flex: 1,
        // flexDirection: "column",
        // justifyContent: "space-between",
    },
    itemFooter: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    productImg: {
        height: 300,
        width: "100%",
    },
    title: {
        fontSize: windowWidth * 0.04,
        color: "#fff",
    },
    category: {
        fontSize: windowWidth * 0.035,
        color: "#fff",
    },
});

export default Cart;
