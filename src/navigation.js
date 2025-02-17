import React from "react";
// напиши навигацию react-native-navigation версии 7
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { constans } from "./services/utils";
import ProductDetails from "./screens/productDetails";
import Cart from "./screens/cart";
import Favorites from "./screens/favorites";
import { Text } from "react-native";
import Products from "./screens/products";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { colors } = constans;
const defOptions = {
    headerTitleAlign: "center",
    headerTitleStyle: { fontWeight: "bold" },
    headerStyle: { backgroundColor: colors.mainColor },
    headerTintColor: "#fff",
    tabBarInactiveTintColor: "gray",
};

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Products"
                component={Products}
                options={{
                    ...defOptions,
                    title: "ShopMarket",
                }}
            />
            <Stack.Screen
                name="ProductDetails"
                options={({ route }) => ({
                    ...defOptions,
                    title: route.params?.title,
                })}
                component={ProductDetails}
            />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="ShopMarket"
                    screenOptions={({ route }) => ({
                        tabBarStyle: { paddingBottom: 4 },
                        tabBarActiveTintColor: colors.mainColor,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === "HomeStack") {
                                iconName = focused ? "home-circle" : "home-circle-outline";
                            } else if (route.name === "CartStack") {
                                iconName = focused ? "cart" : "cart-outline";
                            } else if (route.name === "FavoritesStack") {
                                iconName = focused ? "heart" : "heart-outline";
                            }
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen
                        name="HomeStack"
                        component={HomeStack}
                        options={{
                            headerShown: false,
                            title: "Главная",
                        }}
                    />
                    <Tab.Screen
                        name="FavoritesStack"
                        component={Favorites}
                        options={{
                            ...defOptions,
                            title: "Избранное",
                        }}
                    />
                    <Tab.Screen
                        name="CartStack"
                        component={Cart}
                        headerRight={() => <Text>12</Text>}
                        options={{
                            ...defOptions,
                            title: "Корзина",
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

// Экспортируем навигацию для использования в других компонентах
export default Navigation;
