import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image, FlatList, Button } from "react-native";
import config from "../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { storeFavorite } from "../../services/store";
import { FavoriteItem } from "../../components";

const windowWidth = Dimensions.get("window").width;

const Favorites = ({ navigation }) => {
    const [favoritesList, setFavoritesList] = useState(null);

    const onDelete = (id) => {
        setFavoritesList((pre) => pre.filter((el) => el._id !== id));
    };

    const updateList = async () => {
        setFavoritesList(await storeFavorite.get_favorite_list());
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
                data={favoritesList}
                numColumns={2}
                columnWrapperStyle={styles.listWrapper}
                horizontal={false}
                renderItem={({ item }) => <FavoriteItem item={item} navigation={navigation} onDelete={onDelete} />}
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

export default Favorites;
