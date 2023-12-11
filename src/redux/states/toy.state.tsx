import { Toy } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export const ToyEmptyState: Toy[] = [
  {
    id: "",
    type: "",
    price: "",
    hero: "",
  },
];

export const toySlice = createSlice({
  name: "toy",
  initialState: ToyEmptyState,
  reducers: {
    createToy: (state, action) => action.payload,
    modifyToy: (state, action) => ({ ...state, ...action.payload }),
    addToy(state, action) {
      state.unshift(action.payload);
    },
    resetToy: () => ToyEmptyState,
  },
});

export const { createToy, modifyToy, resetToy, addToy } = toySlice.actions;

export default toySlice.reducer;
