import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.products.find(p => p._id === action.payload._id);

            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.products.push({ ...action.payload });
                state.quantity += 1; 
            }

            //Ensure total is correctly calculated
            state.total = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const productIndex = state.products.findIndex(p => p._id === action.payload);

            if (productIndex !== -1) {
                const product = state.products[productIndex];

                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    state.products.splice(productIndex, 1);
                    state.quantity -= 1;
                }
            }

            // ✅ Update total price correctly
            state.total = state.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;