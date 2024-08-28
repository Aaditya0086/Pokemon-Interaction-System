import React, { useCallback } from "react";
import Select from "react-select";
// import _ from "lodash"

const PokemonSelectLazySearch = ({ setPokemonName, pokemonList, loading, setLoading, setOffset, fetchPokemonList, offset, limit, pokemonSearch, setPokemonSearch }) => {

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

    //   const debouncedPokemonSearch = useCallback(_.debounce((inputValue) => {
    //     setPokemonSearch(inputValue);
    //   }, 300)
    //   );
      
      const debouncedPokemonSearch = (inputValue) => {
        if (debouncedPokemonSearch.timeoutId) {
            clearTimeout(debouncedPokemonSearch.timeoutId);
        }

        debouncedPokemonSearch.timeoutId = setTimeout(() => {
            setPokemonSearch(inputValue);
        }, 300);
      };

      const handleInputChange = (inputValue) => {
        debouncedPokemonSearch(inputValue);
      }

      const extractActualId = (url) => {
        const parts = url.split('/');
        console.log(parts.length);
        return parts[parts.length - 2];
    }

    const handleOnBlur = () => {
        setOffset(0);
    }

    const pokemonOptions = pokemonList.map((pokemon, index) => {
        let url;
        if (!pokemonSearch) {
            url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
    
            if (index >= 1025) {
                url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${10000 + (index - 1024)}.png`;
            }
        }else {
            const id = extractActualId(pokemon.url);
            url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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
        // inputValue={pokemonSearch}
        // onInputChange={fetchPokemonSearch}
        onInputChange={handleInputChange}
        placeholder="Select Pokémon Name"
        onChange={(selectedOption) => setPokemonName(selectedOption.value)}
        options={pokemonOptions}
        onMenuScrollToBottom={handlePokemonNameScroll}
        isLoading={loading}
        onBlur={handleOnBlur}
      ></Select>
    </div>
  )
}

export default PokemonSelectLazySearch
