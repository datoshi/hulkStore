import { Accessory } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export const AccessoryEmptyState: Accessory[] = [
  {
    id: "",
    type: "",
    price: "",
    hero: "",
  },
];

export const accessorySlice = createSlice({
  name: "accessory",
  initialState: AccessoryEmptyState,
  reducers: {
    createAccessory: (state, action) => action.payload,
    modifyAccessory: (state, action) => ({ ...state, ...action.payload }),
    addAccessory(state, action) {
      state.unshift(action.payload);
    },
    resetAccessory: () => AccessoryEmptyState,
  },
});

export const {
  createAccessory,
  modifyAccessory,
  resetAccessory,
  addAccessory,
} = accessorySlice.actions;

export default accessorySlice.reducer;
