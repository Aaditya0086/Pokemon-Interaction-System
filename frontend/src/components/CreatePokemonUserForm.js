import React, { useState, useEffect, useCallback, useRef } from "react";
import { getPokemonList, getPokemonDetails, getPokemonListOnSearch, getPokemonListLazy } from "../services/pokemon";
import { createUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

const CreatePokemonUserForm = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const [ownerName, setOwnerName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState(0);
  const [initialPositionY, setInitialPositionY] = useState(0);
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const limit = 40;

  const fetchPokemonList = useCallback(async (limit, offset) => {
    try {
      const response = await getPokemonListLazy(limit, offset);
      setPokemonList((prevList) => [...prevList, ...response.data.results]);
      setLoading(false);
      // return response.data.results.map((pokemon) => ({
      //   value: pokemon.name,
      //   label: pokemon.name,
      // }))
    } catch (err) {
      console.error("Failed to fetch Pokemon list:", err);
    }
  });

  // const loadOptions = async (callback) => {
  //   const newPokemonOptions = await fetchPokemonList(limit, offset);
  //   console.log(newPokemonOptions);
  //   setOffset(prevOffset => prevOffset + limit);
  //   callback(newPokemonOptions);
  // };

  const fetchPokemonAbility = useCallback(async (name) => {
    try {
      const response = await getPokemonDetails(name);
      return response;
    } catch (err) {
      console.error("Failed to fetch Pokemon ability:", err);
    }
  });

  useEffect(() => {
    if (pokemonName) {
      // console.log(pokemonName);
      fetchPokemonAbility(pokemonName)
        .then((response) => {
          // console.log(response);
          const abilities = response.data.abilities.map(
            (ability) => ability.ability.name
          );
          // console.log(abilities);
          setAbilities(abilities);
          if (abilities.length === 1) {
            setPokemonAbility(abilities[0]);
          } else {
            setPokemonAbility("Please Select a Pokemon Ability");
          }
        })
        .catch((error) => console.error("Error Fetching Pokemon Data", error));
    }
  }, [pokemonName]);

  useEffect(() => {
    fetchPokemonList(limit, offset);
  }, []);

  const handleAddPokemon = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      ownerName,
      pokemonName,
      pokemonAbility,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
    };

    createUser(newUser)
      .then((response) => {
        console.log("User with Pokémon added:", response.data);
        navigate("/list");
      })
      .catch((error) => {
        console.error("Error adding user with Pokémon:", error);
      });
  };

  const handlePokemonNameChange = (selectedOption) => {
    setPokemonName(selectedOption.value);
  };

  // const handlePokemonAbilityChange = (selectedOption) => {
  //   console.log(selectedOption);
  //   console.log(selectedOption.value);
  //   setPokemonAbility(selectedOption.value);
  // };

  const pokemonOptions = pokemonList.map((pokemon) => ({
    value: pokemon.name,
    label: pokemon.name,
  }));

  const handlePokemonNameScroll = useCallback(async () => {
    // alert('bottom');
    if (offset < 1302) {
      setLoading(true);
    setOffset((prevOffset) => {
      const newOffset = prevOffset + limit;
      fetchPokemonList(limit, newOffset);
      return newOffset
    })
    }else {
      alert('All Pokemons listed');
    }
  })

  // const selectRef = useRef(null);

  // useEffect(() => {
  //   const selectElement = selectRef.current;
  //   if (selectElement) {
  //     const menuElement = selectElement.menuListRef;
  //     if (menuElement) {
  //       menuElement.addEventListener('scroll', handleScroll);
  //       return () => menuElement.removeEventListener('scroll', handleScroll);
  //     }
  //   }
  // }, []);

  // const handleScroll = (event) => {
  //   const { scrollTop, scrollHeight, clientHeight } = event.target;
  //   if (scrollHeight - scrollTop === clientHeight) {
  //     console.log('Reached bottom of select menu');
  //     handlePokemonNameScroll();
  //   }
  // };
  
  // const pokemonAbilityOptions = abilities.map((ability) => ({
  //   value: ability,
  //   label: ability,
  // }));

  return (
    <div>
      <form>
        <input
          type="text"
          name="pokemonOwnerName"
          placeholder="Pokemon Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />

        {/* <select
          name="pokemonName"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        >
          <option value="">Select Pokémon Name</option>
          {pokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select> */}

        <div style={{ width: "300px" }}>
          <Select
          // ref={selectRef}
            name="pokemonName"
            onChange={handlePokemonNameChange}
            options={pokemonOptions}
            onMenuScrollToBottom={handlePokemonNameScroll}
            placeholder="Select Pokemon Name"
            isLoading={loading}
          ></Select>
        </div>

        {/* <AsyncSelect
        cacheOptions
        defaultOptions
        onMenuScrollToBottom={() => loadOptions()}
        loadOptions={loadOptions}
        // options={pokemonOptions}
        onChange={handlePokemonNameChange}
        placeholder="Select Pokemon Name"
        /> */}

        <select
          name="pokemonAbility"
          value={pokemonAbility}
          onChange={(e) => setPokemonAbility(e.target.value)}
        >
          <option value="">Select Pokémon Ability</option>
          {abilities.map((ability, index) => (
            <option key={index} value={ability}>
              {ability}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="initialPositionX"
          placeholder="Initial Position X"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(e.target.value)}
        />

        <input
          type="text"
          name="initialPositionY"
          placeholder="Initial Position Y"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(e.target.value)}
        />

        <input
          type="text"
          name="speed"
          placeholder="Speed (m/s)"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />

        <select
          name="direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value="">Select Direction</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>
        <button onClick={handleAddPokemon}>Add Pokemon</button>
      </form>
    </div>
  );
};

export default CreatePokemonUserForm;
