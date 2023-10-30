import React from "react";

import Button from "../ui/Button";

import { useDispatch } from "react-redux";

import { layoutActions } from "../redux/Layout-slice";
import { pokemonActions } from "../redux/Pokemon-slice";

function GeneratePokemon(props) {
  const dispatch = useDispatch();
  const getRandomPokemonInfo = async (randomNum) => {
    try {
      // Generate a random Pokémon ID between 1 and 898
      const randomPokemonId = randomNum; //Math.floor(Math.random() * 500) + 1;

      // Make an API request to get information about the random Pokémon
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`
      );
      const data = await response.json();
      // Extract the information you need from the response
      const pokemonInfo = {
        id: data.id,
        name: data.name,
        imageUrl: data.sprites.other.dream_world.front_default,
        type: data.types[0].type.name, // Assumes the Pokémon has at least one type
      };

      return pokemonInfo;
    } catch (error) {
      console.error("Error fetching Pokémon information:", error);
      return null;
    }
  };

  const findPokemon = () => {
    const maxNum = 150;
    let randomNum;
    let countMaxNum = 0;

    // Continue generating random numbers until one is not present in props.pokemonList
    do {
      if(countMaxNum >= maxNum) {
        return
      }
      randomNum = Math.floor(Math.random() * maxNum) + 1;
      countMaxNum++;
    } while (props.pokemonList.includes(randomNum));

    getRandomPokemonInfo(randomNum).then((pokemonInfo) => {
      if (pokemonInfo) {
        dispatch(pokemonActions.addPokemon(pokemonInfo));
        dispatch(
          layoutActions.addLayout({
            id: pokemonInfo.id,
            breakpoint: props.Breakpoint,
          })
        );
      } else {
        console.log("Failed to fetch Pokémon information.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "3rem 0 3rem 0",
      }}
    >
      <Button onClick={findPokemon}>Find Pokemon</Button>
    </div>
  );
}

export default GeneratePokemon;
