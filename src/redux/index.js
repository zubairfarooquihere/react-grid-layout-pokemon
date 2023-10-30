import { configureStore } from "@reduxjs/toolkit";

import pokemonSlice from "./Pokemon-slice";
import layoutSlice from "./Layout-slice";
 
const store = configureStore({
  reducer: { pokemon: pokemonSlice.reducer, layout: layoutSlice.reducer },
});
 
export default store;