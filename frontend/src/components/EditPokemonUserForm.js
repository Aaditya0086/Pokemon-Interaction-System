import React from "react";
import { useState, useEffect, useCallback } from "react";
import { getPokemonList, getPokemonDetails } from "../services/pokemon";
import { getUser, updateUser } from "../services/user";
import { useNavigate } from "react-router-dom";

const EditPokemonUserForm = ({ id }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const [ownerName, setOwnerName] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");
  const [initialPositionX, setInitialPositionX] = useState(0);
  const [initialPositionY, setInitialPositionY] = useState(0);
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");
  const [fetchedPokemonAbility, setFetchedPokemonAbility] = useState("");
  const [firstUserGet, setFirstUserGet] = useState(true);

  const navigate = useNavigate();

  const fetchPokemonList = useCallback(async () => {
    try {
      const response = await getPokemonList();
      setPokemonList(response.data.results);
    } catch (err) {
      console.error("Failed to fetch Pokemon list:", err);
    }
  });

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
      // debugger
      getUser(id).then((response) => {
        // debugger
        console.log(response);
        setOwnerName(response.data.ownerName);
        setPokemonName(response.data.pokemonName);
        setFetchedPokemonAbility(response.data.pokemonAbility); // setPokemonAbility(response.data.pokemonAbility);
        setInitialPositionX(response.data.initialPositionX);
        setInitialPositionY(response.data.initialPositionY);
        setSpeed(response.data.speed);
        setDirection(response.data.direction);
      });
    } catch (err) {}
  });

  useEffect(() => {
    // debugger
    if (pokemonName) {
      console.log(pokemonName);
      fetchPokemonAbility(pokemonName)
        .then((response) => {
          // debugger
          console.log(response);
          const abilities = response.data.abilities.map(
            (ability) => ability.ability.name
          );
          console.log(abilities);
          setAbilities(abilities);
          if (abilities.length === 1) {
            setPokemonAbility(abilities[0]);
          } else {
            if (firstUserGet) {
              setPokemonAbility(fetchedPokemonAbility);
              setFirstUserGet(false);
            } else {
              setPokemonAbility("Please Select a Pokemon Ability");
            }
          }
        })
        .catch((error) => console.error("Error Fetching Pokemon Data", error));
    }
  }, [pokemonName]);

  useEffect(() => {
    fetchPokemonList();
    fetchUser(id);
  }, []);

  const handleEditPokemon = (e) => {
    e.preventDefault();
    const newUser = {
      id: id,
      ownerName,
      pokemonName,
      pokemonAbility,
      initialPositionX,
      initialPositionY,
      speed,
      direction,
    };

    updateUser(id, newUser)
      .then((response) => {
        console.log("User with Pokémon added:", response.data);
        navigate("/list");
      })
      .catch((error) => {
        console.error("Error adding user with Pokémon:", error);
      });
  };

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

        <select
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
        </select>

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
        <button onClick={handleEditPokemon}>Update</button>
      </form>
    </div>
  );
};

export default EditPokemonUserForm;
