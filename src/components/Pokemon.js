import React from "react";

function Pokemon(props) {
  const { pokemon } = props;

  const getColor = (type) => {
    if (type === "fire") {
      return { light: "#FF9999", medium: "#FF6666", dark: "#E63900" };
    } else if (type === "water") {
      return { light: "#ADD8E6", medium: "#6495ED", dark: "#00008B" };
    } else if (type === "grass") {
      return { light: "#C2F0A5", medium: "#66B032", dark: "#3C6A1C" };
    } else if (type === "poison") {
      return { light: "#B86BF2", medium: "#9852D4", dark: "#7A3DAA" };
    } else if (type === "psychic") {
      return { light: "#B47EFC", medium: "#4E73E6", dark: "#6B28D4" };
    } else if (type === "ice") {
      return { light: "#A0E9E0", medium: "#68C3D4", dark: "#3A8D9E" };
    } else if (type === "bug") {
      return { light: "#A8B820", medium: "#8C8C2A", dark: "#6C6842" };
    } else if (type === "fighting") {
      return { light: "#D56723", medium: "#A1390F", dark: "#7E2B0A" };
    } else if (type === "dragon") {
      return {
        light: "rgb(217, 202, 255)",
        medium: "rgb(170, 143, 223)",
        dark: "#21046B",
      };
    } else if (type === "ground") {
      return { light: "#E0C068", medium: "#8B6914", dark: "#6D4E1E" };
    } else if (type === "rock") {
      return { light: "#C5B291", medium: "#A79775", dark: "#91875C" };
    } else if (type === "ghost") {
      return { light: "#F5F5F5", medium: "#D3D3D3", dark: "#A9A9A9" };
    } else if (type === "electric") {
      return { light: "#FFECB3", medium: "#FFD54F", dark: "#FFC107" };
    }

    return { light: "#A0D8E6", medium: "#29C3E3", dark: "#007B94" };
  };

  const color = getColor(pokemon.type);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(to right bottom, ${color.light},  ${color.dark})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "85%", height: "85%" }} src={pokemon.imageUrl} alt="pokemon" />
    </div>
  );
}

export default Pokemon;
