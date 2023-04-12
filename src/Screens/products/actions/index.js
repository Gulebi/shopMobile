import { storeCart } from "../../../services/store";

const getProductsAction = (setProductList, query = {}) => {
    return {
        variables: {
            query,
        },
        //fetchPolicy: 'network-only',
        onCompleted: async ({ getProducts }) => {
            // console.log("PRODUCTS_HOME", getProducts);

            let cartList = await storeCart.get_cart_list();

            setProductList(
                getProducts.map((item) => {
                    if (
                        cartList?.find((el) => {
                            return el._id === item._id;
                        })
                    )
                        return { ...item, inCart: true };
                    return item;
                })
            );
        },
        onError: (err) => {
            console.log("PRODUCTS_HOME", err);
        },
    };
};

export { getProductsAction };
