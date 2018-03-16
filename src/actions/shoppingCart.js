import uuid from 'uuid';
// ADD_TO_CART
export const addToCart = (
    {
        productName,
        productImage = undefined,
        sellerName,
        ratings = undefined,
        quantity = 1,
        price
    } = {}
) => ({
    type: 'ADD_TO_CART',
    shoppingCart: {
        id: uuid(),
        productName,
        productImage,
        sellerName,
        ratings,
        quantity,
        price
    }
});

// REMOVE_FROM_CART
export const removeFromCart = ({ id } = {}) => ({
    type: 'REMOVE_FROM_CART',
    id
});

// EDIT_CART
export const editCart = (id, updates) => ({
    type: 'EDIT_CART',
    id,
    updates
});