import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductsState {
  products: Product[];
  cart: Product[];
  total: number;
}

const initialState: ProductsState = {
  products: [
    { id: 1, name: "Laptop", price: 1000, image: "laptop.jpg", quantity: 1 },
    { id: 2, name: "Phone", price: 500, image: "phone.jpg", quantity: 1 },
    { id: 3, name: "Headphones", price: 150, image: "headphones.jpg", quantity: 1 },
  ],
  cart: [],
  total: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      state.total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      state.total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product && quantity > 0) {
        product.quantity = quantity;
      }
      state.total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      const discount = action.payload;
      state.total = state.total - (state.total * discount / 100);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, applyDiscount } = productsSlice.actions;
export default productsSlice.reducer;
