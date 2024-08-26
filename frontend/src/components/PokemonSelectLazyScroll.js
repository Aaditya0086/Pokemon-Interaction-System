import React, { useCallback } from "react";
import Select from "react-select";

const PokemonSelectLazyScroll = ({ setPokemonName, pokemonList, loading, setLoading, setOffset, fetchPokemonList, offset, limit }) => {

    const handlePokemonNameScroll = useCallback(async () => {
        if (offset < 1302) {
          setLoading(true);
          setOffset((prevOffset) => {
            const newOffset = prevOffset + limit;
            fetchPokemonList(limit, newOffset);
            return newOffset;
          });
        } else {
          alert("All Pokemons listed");
        }
      });

  const pokemonOptions = pokemonList.map((pokemon, index) => {
    let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;

    if (index >= 1025) {
      url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${10000 + (index - 1024)}.png`;
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
          <img style={{ width: "35px", height: "35px" }} src={url} alt="" />
        </div>
      ),
    };
  });

  return (
    <div style={{ color: "black", width: "300px" }}>
      <Select
        name="pokemonName"
        placeholder="Select Pokémon Name"
        onChange={(selectedOption) => setPokemonName(selectedOption.value)}
        options={pokemonOptions}
        onMenuScrollToBottom={handlePokemonNameScroll}
        isLoading={loading}
      ></Select>
    </div>
  );
};

export default PokemonSelectLazyScroll;
