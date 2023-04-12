import { View, Text, Image, StyleSheet, Dimensions, Button } from "react-native";
import config from "../../config";
import { storeCart } from "../../services/store";
import React, { useState } from "react";

const windowWidth = Dimensions.get("window").width;

export default function CartItem({ item, navigation, onDelete, updateList }) {
    const [amount, setAmount] = useState(1);

    const changeAmount = (num) => {
        setAmount(amount + num);
        updateList();
        storeCart.update_cart_list(item, amount);
    };

    const deleteItem = () => {
        onDelete(item._id);
        storeCart.remove_cart_list(item);
    };

    return (
        <View style={styles.item}>
            <View style={styles.imageContainer}>
                <Image resizeMode="cover" style={styles.image} source={{ uri: `${config.public}${item.picture}` }} />
            </View>
            <Text style={styles.title} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={styles.category}>{item.category.title}</Text>
            <View style={styles.controls}>
                <View style={styles.controlsAmount}>
                    <Button style={styles.controlsBtn} title="-" onPress={() => amount > 1 && changeAmount(-1)} />
                    <Text style={styles.controlsText}>{amount}</Text>
                    <Button style={styles.controlsBtn} title="+" onPress={() => amount < 100 && changeAmount(1)} />
                </View>
                <View style={styles.controlsDelete}>
                    <Button title="Delete" onPress={deleteItem} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    controlsAmount: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    controlsBtn: {
        width: 50,
    },
    controlsText: {},
    imageContainer: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 300,
    },
    title: {
        fontSize: windowWidth * 0.04,
        color: "#000",
    },
    category: {
        fontSize: windowWidth * 0.035,
        color: "#000",
    },
    info: {
        fontSize: windowWidth * 0.04,
        color: "#000",
    },
});
