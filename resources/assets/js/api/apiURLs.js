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