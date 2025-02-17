import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from "react-native";
import config from "../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { constans, helpers } from "../../services/utils";
import { storeCart } from "../../services/store";

const windowWidth = Dimensions.get("window").width;

export default function ItemProduct({ item, navigation }) {
    const [cartStatus, setCartStatus] = useState(false);

    const putInCart = async () => {
        if (!cartStatus || !item.inCart) {
            setCartStatus(true);
            await storeCart.set_cart_list(item);
        }
    };

    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ProductDetails", { item, title: helpers.limitStr(item.title, 24) })}
        >
            <View style={styles.itemContent}>
                <View>
                    <Image
                        resizeMode="cover"
                        style={styles.productImg}
                        source={{ uri: `${config.public}${item.picture}` }}
                    />
                    <Text style={styles.title} numberOfLines={2}>
                        {item.title}
                    </Text>
                </View>
                <View style={styles.itemFooter}>
                    <Text>
                        {item.price} {item.currency}
                    </Text>
                    <TouchableOpacity onPress={putInCart}>
                        <MaterialCommunityIcons
                            name={cartStatus || item.inCart ? "cart-check" : "cart-arrow-down"}
                            size={23}
                            color={constans.colors.mainColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 10,
        flex: 1,
    },
    itemContent: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    itemFooter: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    productImg: {
        height: 200,
        width: "100%",
    },
    title: {
        fontSize: windowWidth * 0.03,
        color: "#000",
    },
});
