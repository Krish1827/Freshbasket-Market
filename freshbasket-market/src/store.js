import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("freshbasket-cart") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    increment: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrement: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        return state.filter((cartItem) => cartItem.id !== action.payload);
      }
    },
    removeFromCart: (state, action) =>
      state.filter((item) => item.id !== action.payload),
    clearCart: () => [],
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

store.subscribe(() => {
  localStorage.setItem("freshbasket-cart", JSON.stringify(store.getState().cart));
});