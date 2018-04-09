export const subitemsAPI = (subCategory) => (
    `api/subitems/${subCategory}`
);

export const searchProductsAPI = (category, query) => (
    `api/search/${category}/${query}`
);

export const productInfoAPI = (productID) => (
    `api/product/${productID}`
);

export const subcategoryProductAPI = (subcategory) => (
    `api/category/${subcategory}`
);

export const loginAPI = "oauth/token";

export const getUserAPI = "api/user";

export const logoutAPI = "api/logout";

export const registerAPI = "api/register";

export const addToCartAPI = "api/addtocart";

export const removeFromCartAPI = (productID) => (
    `api/removefromcart/${productID}`
);

export const getUserCartAPI = "api/getusercart";

export const addToWishlistAPI = "api/addtowishlist";

export const removeFromWishlistAPI = (productID) => (
    `api/removefromwishlist/${productID}`
);

export const getUserWishlistAPI = "api/getuserwishlist";

export const wishlistToCartAPI = "api/wishlistcart";

export const checkoutinformationAPI = "api/checkoutinformation";

export const placeOrderAPI = "api/placeorder";

export const userordersAPI = "api/userorders";

export const orderDetailAPI = (order_id) => (
    `api/order/${order_id}`
);
