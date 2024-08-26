import React from "react";
import { useEffect, useState, useCallback } from "react";
import { deleteAllUsers, deleteUser, getUsers } from "../services/user";
import { useNavigate } from "react-router-dom";

const PokemonListingTable = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0);
  const [pokemonUsers, setPokemonUsers] = useState([]);

  const fetchPokemonUsersList = useCallback(async () => {
    try {
      const response = await getUsers();
      return response;
    } catch (err) {
      console.error("Failed to fetch Pokemon Users List", err);
    }
  });

  const deleteAllPokemonUsers = useCallback(async () => {
    try {
      const response = await deleteAllUsers();
      return response;
    } catch (err) {
      console.error('Failed to Delete All Pokemon Users', err);
    }
  })

  const deletePokemonUser = useCallback(async (id) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (err) {
      console.error('Failed to Delete Pokemon User', err);
    }
  })

  useEffect(() => {
    fetchPokemonUsersList()
      .then((response) => {
        console.log(response);
        setPokemonUsers(response.data);
      });
        
  }, [flag]);

  const handleDeleteAllUsers = () => {
    console.log("Deleting All Pokémon Users:");
    deleteAllPokemonUsers()
      .then ((response) => {
        setFlag(flag+1);
      })
  }
  
  const handleDeleteUser = (id) => {
    console.log("Deleting user with id:", id);
    deletePokemonUser(id)
      .then ((response) => {
        setFlag(flag+1);
      })
  };

  const handleAddPokemon = (id) => {
    console.log("Adding Pokémon for user with id:", id);
    navigate('/add', {state: {id: id}});
  };

  const handleEditUser = (id) => {
    console.log("Editing user with id:", id);
    navigate('/edit', {state: {id: id}});
  };

  return (
    <div style={{margin: '40px'}}>
      <div>
        <button onClick={handleDeleteAllUsers} type="button">Delete All</button>
        <button style={{marginLeft: '10px'}} onClick={() => {navigate("/create");}} type="button">Add User</button>
        <button style={{margin: '10px'}} onClick={() => {navigate("/");}} type="button">Fun Area</button>
      </div>
      <br />
      <div>
        <table style={{textAlign: 'left'}}>
          <thead>
            <tr>
              <th style={{paddingRight: '5px'}}>Pokemon Owner Name</th>
              <th style={{paddingRight: '5px'}}>Pokemon Name</th>
              <th style={{paddingRight: '5px'}}>Pokemon Ability</th>
              <th style={{paddingRight: '5px'}}>No. of Pokemon</th>
              <th style={{paddingRight: '5px'}}>Add Pokemon</th>
              <th style={{paddingRight: '5px'}}>Edit</th>
              <th style={{paddingRight: '5px'}}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {pokemonUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.ownerName}</td>
                <td>{user.pokemons[0].pokemonName}</td>
                <td>{user.pokemons[0].pokemonAbility}</td>
                <td>{user.noOfPokemon}</td>
                <td>
                  <button onClick={() => handleAddPokemon(user.id)}>+</button>
                </td>
                <td>
                  <button onClick={() => handleEditUser(user.id, user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonListingTable;
