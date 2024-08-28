import React, { useState, useEffect, useRef, useCallback } from "react";
import { getUsers } from "../services/user";
import { useNavigate } from "react-router-dom";
import { getPokemonDetails } from "../services/pokemon";

const HomePageForm = () => {
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ifUserSelected, setIfUserSelected] = useState(false);
  const [ifPokemonSelected, setIfPokemonSelected] = useState(false);
  const [userIndex, setUserIndex] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonIndex, setPokemonIndex] = useState(null);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState("");
  const [speed, setSpeed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFlee, setIsFlee] = useState(true);
  const [pokemonGo, setPokemonGo] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const BOX_SIZE_X = 1100;
  const BOX_SIZE_Y = 400;
  let movementIntervalRef = useRef(null);
  const navigate = useNavigate();
  let gif_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${selectedPokemonId}.gif` ;
  let img_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemonId}.png`;

  useEffect(() => {
    fetchPokemonUsersList().then((response) => {
        // console.log(response.data.length);
      if (response.data.length === 0) {
        alert("No users detected, Please create a user first");
        navigate("/create");
      } else {
        setUsersList(response.data);
      }
    }).catch((error) => {
        console.error("Error fetching users", error);
    });
  }, []);

  useEffect(() => {
    if (ifPokemonSelected) {
        fetchPokemonId(pokemonName).then((response) => {
            console.log(response);
            setSelectedPokemonId(response);
        }).catch((error) => {
            console.error("Error fetching pokemon id", error);
        })
    }
  }, [ifPokemonSelected, pokemonName]);

  //   useEffect(() => {
  //     console.log(selectedUser);
  //     console.log(usersList);
  //     console.log(userIndex);
  //     console.log(pokemonIndex);
  //   }, [selectedUser, userIndex, pokemonIndex]);

  const fetchPokemonUsersList = async () => { //useCallback removed as a small fun. and not being used as dependency or being passed as prop to child.
    try {
      const response = await getUsers();
      return response;
    } catch (err) {
      console.error("Failed to fetch Pokemon Users List", err);
    }
  };

  const fetchPokemonId = async (pokemonName) => {
    try {
        const response = await getPokemonDetails(pokemonName);
        return response.data.id;
    }catch (err) {
        console.error("Failed to fetch Pokemon Id", err);
    }
  };

  const updatePosition = () => {
    setPositionX((prevX) => {
      let newX = prevX;
      console.log(speed);
      switch (direction) {
        case "east":
          newX += speed;
          break;
        case "west":
          newX -= speed;
          break;
        default:
          break;
      }
      if (newX < -85 || newX > BOX_SIZE_X) {
        setIsVisible(false);
        clearInterval(movementIntervalRef.current);
        setPokemonGo(false);
        alert("The Pokemon has left the visible range, Please select another pokemon");
      }
      return newX;
    });

    setPositionY((prevY) => {
      //   debugger;
      let newY = prevY;
      console.log(speed);
      switch (direction) {
        case "north":
          newY -= speed;
          break;
        case "south":
          newY += speed;
          break;
        default:
          break;
      }
      if (newY < -85 || newY > BOX_SIZE_Y) {
        setIsVisible(false);
        clearInterval(movementIntervalRef.current);
        setPokemonGo(false);
        alert("The Pokemon has left the visible range, Please select another pokemon");
      }
      return newY;
    });
  };

  const handlePokemonGoBtn = (id) => {
    console.log("Pokemon Go of user with id: ", id);
    alert("Pokemon will start moving");
    // setPokemonGo(true);
    if (ifPokemonSelected && !pokemonGo) {
      movementIntervalRef.current = setInterval(updatePosition, 10);
      setPokemonGo(true);
    }
  };

  const handlePokemonFleeBtn = (id) => {
    console.log("Pokemon Flee of user with id: ", id);
    alert("Pokemon will disappear and appear when clicked");
    setIsFlee(!isFlee);
  };

  const handlePokemonCeaseBtn = (id) => {
    console.log("Pokemon Cease of user with id: ", id);
    alert("Pokemon will stop moving");
    clearInterval(movementIntervalRef.current);
    setPokemonGo(false);
  };

  return (
    <div style={{ margin: "40px" }}>
      <select
        onChange={(e) => {
          setSelectedUser(e.target.value);
          setUserIndex(e.target.selectedIndex);
          clearInterval(movementIntervalRef.current);
          setPokemonGo(false);
          if (e.target.selectedIndex === 0) {
            setIfUserSelected(false);
          } else {
            setIfUserSelected(true);
          }
          setIfPokemonSelected(false);
          setIsVisible(false);
        }}
      >
        <option key="0" value="">
          List of pokemon owner
        </option>
        {usersList.map((user, index) => (
          <option key={index} value={user.id}>
            {user.ownerName}
          </option>
        ))}
      </select>
      <br />
      <br />
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ paddingRight: "5px" }}>Name of Pokemon</th>
            <th style={{ paddingRight: "5px" }}>Ability of Pokemon</th>
            <th style={{ paddingRight: "5px" }}>No. of Pokemon</th>
          </tr>
        </thead>
        <tbody>
          {ifUserSelected ? (
            <tr>
              <td>
                <select
                  onChange={(e) => {
                    setIsVisible(false);
                    clearInterval(movementIntervalRef.current);
                    setPokemonGo(false);
                    if (e.target.selectedIndex === 0) {
                        setIfPokemonSelected(false);
                    } else {
                      setPokemonName(e.target.value);
                      setIfPokemonSelected(true);
                      setPokemonIndex(e.target.selectedIndex);
                      setPositionX(Number(
                        BOX_SIZE_X / 2 +
                          Number(usersList[userIndex - 1].pokemons[
                            e.target.selectedIndex - 1
                          ].initialPositionX)
                      ));
                      setPositionY(Number(
                        BOX_SIZE_Y / 2 -
                          Number(usersList[userIndex - 1].pokemons[
                            e.target.selectedIndex - 1
                          ].initialPositionY)
                      ));
                      setDirection(
                        usersList[userIndex - 1].pokemons[
                          e.target.selectedIndex - 1
                        ].direction
                      );
                      setSpeed(Number(
                        usersList[userIndex - 1].pokemons[
                          e.target.selectedIndex - 1
                        ].speed / 100
                      ));
                      setIsVisible(true);
                    }
                  }}
                >
                  <option key="0" value="">
                    Select a pokemon
                  </option>
                  {usersList[userIndex - 1].pokemons.map(
                    (pokemon, index) => (
                      console.log(pokemon),
                      (
                        <option key={index} value={pokemon.pokemonName}>
                          {pokemon.pokemonName}
                        </option>
                      )
                    )
                  )}
                </select>
              </td>
              <td>
                {ifPokemonSelected
                  ? usersList[userIndex - 1].pokemons[pokemonIndex - 1]
                      .pokemonAbility
                  : "Select pokemon first!"}
              </td>
              <td>{usersList[userIndex - 1].noOfPokemon}</td>
            </tr>
          ) : (
            <tr>
              <td>No user selected!</td>
              <td>No user selected!</td>
              <td>No user selected!</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <div>
        <button
          style={{ margin: "10px" }}
          onClick={() => handlePokemonGoBtn(selectedUser)}
        >
          Pokemon Go
        </button>
        <button
          style={{ margin: "10px" }}
          onClick={() => handlePokemonFleeBtn(selectedUser)}
        >
          Pokemon Flee
        </button>
        <button
          style={{ margin: "10px" }}
          onClick={() => handlePokemonCeaseBtn(selectedUser)}
        >
          Pokemon Cease
        </button>
      </div>
      <br />
      <div
        style={{
          margin: "20px, 0",
          width: `${BOX_SIZE_X}px`,
          height: `${BOX_SIZE_Y}px`,
          border: "2px solid whitesmoke",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isFlee && isVisible && (
          <div
            style={{
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              position: "absolute",
              left: `${positionX}px`,
              top: `${positionY}px`,
            }}
          >
            <img src={gif_url} alt="Pokemon Annimation" onError={(e) => e.target.src = img_url} />
          </div>
        )}
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', margin: '40px'}}>
        <button onClick={() => {navigate('/list');}}>
            Go to list
        </button>
      </div>
    </div>
  );
};

export default HomePageForm;
