const base_url = "http://127.0.0.1:8000/api/";

export const subitemsAPI = (subCategory) => (
    `${base_url}subitems/${subCategory}`
);

export const searchProductsAPI = (category, query) => (
    `${base_url}search/${category}/${query}`
);

export const productInfoAPI = (productID) => (
    `${base_url}product/${productID}`
);

export const subcategoryProductAPI = (subcategory) => (
    `${base_url}category/${subcategory}`
);