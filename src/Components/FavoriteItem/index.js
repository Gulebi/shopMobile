import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity } from "react-native";
import config from "../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { constans, helpers } from "../../services/utils";
import { storeCart, storeFavorite } from "../../services/store";
import React, { useState } from "react";

const windowWidth = Dimensions.get("window").width;

export default function FavoriteItem({ item, navigation, onDelete }) {
    const [isFav, setIsFav] = useState(true);

    const unSetFav = () => {
        if (isFav) {
            setIsFav(!isFav);
            onDelete(item._id);
            storeFavorite.remove_favorite(item._id);
        }
    };

    return (
        <View style={styles.item}>
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
                    <TouchableOpacity onPress={unSetFav}>
                        <MaterialCommunityIcons
                            name={isFav ? "heart" : "heart-outline"}
                            size={23}
                            color={constans.colors.mainColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 10,
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
