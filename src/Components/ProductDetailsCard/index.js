import { View, Text, Image, StyleSheet, Dimensions, Button } from "react-native";
import config from "../../config";
import { constans } from "../../services/utils";
import { storeCart, storeFavorite } from "../../services/store";
import React, { useState } from "react";

const { colors } = constans;

const windowWidth = Dimensions.get("window").width;

export default function ProductDetailsCard({ item, navigation }) {
    return (
        <View style={styles.item}>
            <View style={styles.imageContainer}>
                <Image resizeMode="cover" style={styles.image} source={{ uri: `${config.public}${item.picture}` }} />
            </View>
            <View>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.category}>{item.category.title}</Text>
            </View>
            <View style={styles.row}>
                <Button title="В корзину" onPress={() => storeCart.set_cart_list(item)} />
                <Button title="Fav" onPress={() => storeFavorite.set_favorite(item)} />
            </View>
            <View style={styles.row}>
                <Text style={styles.price}>${item.price} Оптом</Text>
                <Text style={styles.price}>Одна ${item.price_one}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        gap: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: windowWidth * 0.05,
        color: colors.mainColor,
    },
    category: {
        fontSize: windowWidth * 0.04,
    },
    price: {
        fontSize: windowWidth * 0.05,
    },
    imageContainer: {
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 400,
    },
});
