import { Comic } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export const ComicEmptyState: Comic[] = [
  {
    id: "",
    type: "",
    price: "",
    hero: "",
  },
];

export const comicSlice = createSlice({
  name: "comic",
  initialState: ComicEmptyState,
  reducers: {
    createComic: (state, action) => action.payload,
    modifyComic: (state, action) => [...state, ...action.payload],
    addComic(state, action) {
      state.unshift(action.payload);
    },
    resetComic: () => ComicEmptyState,
  },
});

export const { createComic, modifyComic, resetComic, addComic } =
  comicSlice.actions;

export default comicSlice.reducer;
