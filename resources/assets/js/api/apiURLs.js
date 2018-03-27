export const subitemsAPI = (subCategory) => (
    `subitems/${subCategory}`
);

export const searchProductsAPI = (category, query) => (
    `search/${category}/${query}`
);

export const productInfoAPI = (productID) => (
    `product/${productID}`
);

export const subcategoryProductAPI = (subcategory) => (
    `category/${subcategory}`
);