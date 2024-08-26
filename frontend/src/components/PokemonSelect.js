import React from "react";
import Select from "react-select";

const PokemonSelect = ({ pokemonName, setPokemonName, pokemonList }) => {

  const pokemonOptions = pokemonList.map((pokemon, index) => {
      
      let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`

      if (index>=1025) {
            url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${10000 + (index - 1024)}.png`
    }

    return {
      value: pokemon.name,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ marginBottom: "0px" }}>{pokemon.name}</span>
          <img
            style={{ width: "35px", height: "35px" }}
            src={url}
            alt=""
          />
        </div>
      ),
    };
  });

  return (
    <div style={{ color: "black", width: "300px" }}>
      <Select
        name="pokemonName"
        value={pokemonOptions.find((option) => option.value === pokemonName)}
        placeholder="Select Pokémon Name"
        onChange={(selectedOption) => setPokemonName(selectedOption.value)}
        options={pokemonOptions}
      ></Select>
    </div>
  );
};

export default PokemonSelect;
