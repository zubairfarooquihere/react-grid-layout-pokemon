import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState: { idList: [], data: {} },
  reducers: {
    addPokemon(state, action) {
      const { id, name, imageUrl, type } = action.payload;
      if (!state.idList.includes(id)) {
        state.idList.push(id);
        state.data[id] = {
          id,
          name,
          imageUrl,
          type,
        };
      }
    },
  },
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice;
