import { Shirt } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export const ShirtEmptyState: Shirt[] = [
  {
    id: "",
    type: "",
    price: "",
    hero: "",
  },
];

export const shirtSlice = createSlice({
  name: "shirt",
  initialState: ShirtEmptyState,
  reducers: {
    createShirt: (state, action) => action.payload,
    modifyShirt: (state, action) => ({ ...state, ...action.payload }),
    addShirt(state, action) {
      state.unshift(action.payload);
    },
    resetShirt: () => ShirtEmptyState,
  },
});

export const { createShirt, modifyShirt, resetShirt, addShirt } =
  shirtSlice.actions;

export default shirtSlice.reducer;
