import { Glass } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export const GlassEmptyState: Glass[] = [
  {
    id: "",
    type: "",
    price: "",
    hero: "",
  },
];

export const glassSlice = createSlice({
  name: "glass",
  initialState: GlassEmptyState,
  reducers: {
    createGlass: (state, action) => action.payload,
    modifyGlass: (state, action) => ({ ...state, ...action.payload }),
    addGlass(state, action) {
      state.unshift(action.payload);
    },
    resetGlass: () => GlassEmptyState,
  },
});

export const { createGlass, modifyGlass, resetGlass, addGlass } =
  glassSlice.actions;

export default glassSlice.reducer;
