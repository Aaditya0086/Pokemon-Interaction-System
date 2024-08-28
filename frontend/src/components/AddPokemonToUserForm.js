import React, { useState, useEffect, useCallback } from "react";
import {
  getPokemonDetails,
  getPokemonListLazy,
  getSearchedPokemons,
} from "../services/pokemon";
import { addToUser, getUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import PokemonSelectLazySearch from "./PokemonSelectLazySearch";

const AddPokemonToUserForm = ({ id }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const [ownerName, setOwnerName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState(0);
  const [initialPositionY, setInitialPositionY] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState("");
  const [noOfPokemon, setNoOfPokemon] = useState(1);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pokemonSearch, setPokemonSearch] = useState("");

  const navigate = useNavigate();

  const limit = 40;

  const fetchPokemonList = useCallback(async (limit, offset) => {
    try {
      const response = await getPokemonListLazy(limit, offset);
      if (offset === 0) {
        setPokemonList(response.data.results);
      }else {
        setPokemonList((prevList) => [...prevList, ...response.data.results]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch Pokemon list:", err);
    }
  });

  const fetchPokemonSearch = useCallback(async (pokemonSearch) => {
    try {
      const response = await getSearchedPokemons(pokemonSearch);
      console.log(response.data);
      setPokemonList(response.data);
    }catch (err) {
      console.error("Failed to fetch searched pokemons:", err);
    }
  })

  const fetchPokemonAbility = useCallback(async (name) => {
    try {
      const response = await getPokemonDetails(name);
      return response;
    } catch (err) {
      console.error("Failed to fetch Pokemon ability:", err);
    }
  });

  const fetchUser = useCallback(async (id) => {
    try {
      getUser(id).then((response) => {
        console.log(response);
        setOwnerName(response.data.ownerName);
        setNoOfPokemon(Number(response.data.noOfPokemon + 1));
      });
    } catch (err) {}
  });

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonAbility(pokemonName)
        .then((response) => {
          const abilities = response.data.abilities.map(
            (ability) => ability.ability.name
          );
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
    if (!pokemonSearch) {
      setOffset(0);
      fetchPokemonList(limit, offset);
    }else {
      fetchPokemonSearch(pokemonSearch);
    }
  }, [pokemonSearch]);

  useEffect(() => {
    fetchUser(id);
  }, []);

  const handleAddPokemon = (e) => {
    e.preventDefault();
    const pokemons = {
      pokemonName,
      pokemonAbility,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
    };

    addToUser(id, noOfPokemon, pokemons)
      .then((response) => {
        console.log("Pokémon added to user:", response.data);
        navigate("/list");
      })
      .catch((error) => {
        console.error("Error adding Pokémon to user:", error);
      });
  };

  const handlePokemonNameChange = (selectedOption) => {
    setPokemonName(selectedOption.value);
  };

  const pokemonOptions = pokemonList.map((pokemon) => ({
    value: pokemon.name,
    label: pokemon.name,
  }));

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

        {/* <div style={{ width: "300px", color: 'black' }}>
          <Select
            name="pokemonName"
            onChange={handlePokemonNameChange}
            options={pokemonOptions}
            onMenuScrollToBottom={handlePokemonNameScroll}
            placeholder="Select Pokemon Name"
            isLoading={loading}
          ></Select>
        </div> */}

        <PokemonSelectLazySearch setPokemonName={setPokemonName} setOffset={setOffset} offset={offset} loading={loading} setLoading={setLoading} fetchPokemonList={fetchPokemonList} pokemonList={pokemonList} limit={limit} fetchPokemonSearch={fetchPokemonSearch} pokemonSearch={pokemonSearch} setPokemonSearch={setPokemonSearch} />


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
          type="number"
          name="initialPositionX"
          placeholder="Initial Position X"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(e.target.value)}
        />

        <input
          type="number"
          name="initialPositionY"
          placeholder="Initial Position Y"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(e.target.value)}
        />

        <input
          type="number"
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

export default AddPokemonToUserForm;
