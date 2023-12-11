import { Accessory, Comic, Glass, ProductsDelete, Shirt, Toy } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { accessorySlice } from "./states/accessory.state";
import { comicSlice } from "./states/comic.state";
import { glassSlice } from "./states/glass.state";
import { shirtSlice } from "./states/shirt.state";
import { toySlice } from "./states/toy.state";
import { productsDeleteSlice } from "./states/productsDelete.state";
export interface AppStore {
  accessory: Accessory[];
  comic: Comic[];
  glass: Glass[];
  shirt: Shirt[];
  toy: Toy[];
  productsDelete: ProductsDelete[];
}

export default configureStore<AppStore>({
  reducer: {
    accessory: accessorySlice.reducer,
    comic: comicSlice.reducer,
    glass: glassSlice.reducer,
    shirt: shirtSlice.reducer,
    toy: toySlice.reducer,
  },
});
