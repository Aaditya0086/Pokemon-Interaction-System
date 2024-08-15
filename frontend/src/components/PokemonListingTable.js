import React from "react";
import { useEffect, useState, useCallback } from "react";
import { deleteAllUsers, deleteUser, getUsers, updateUser } from "../services/user";
import { Navigate, useNavigate } from "react-router-dom";

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

  const editPokemonUser = useCallback(async (id, user) => {
    try {
      const response = await updateUser(id, user);
      return response;
    } catch (err) {
      console.error('Failed to Update Pokemon User', err);
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
    
    
    // Implement the delete functionality
  };

  // Functions for handling actions (to be implemented)
  const handleAddPokemon = (id) => {
    console.log("Adding Pokémon for user-id:", id);
    // Implement the add functionality
  };

  const handleEditUser = (id) => {
    console.log("Editing user with id:", id);
    navigate('/edit', {state: {id: id}});
    // editPokemonUser(id, user)
      // .then((response) => {

      // })
    // Implement the edit functionality
  };

  return (
    <div>
      <div>
        <button onClick={handleDeleteAllUsers} type="button">Delete All</button>
        <button type="button">Button</button>
      </div>
      <br />
      <div>
        {/* <h2>List of Pokémon Users</h2> */}
        <table>
          <thead>
            <tr>
              <th>Pokemon Owner Name</th>
              <th>Pokemon Name</th>
              <th>Pokemon Ability</th>
              <th>No. of Pokemon</th>
              <th>Add Pokemon</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {pokemonUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.ownerName}</td>
                <td>{user.pokemonName}</td>
                <td>{user.pokemonAbility}</td>
                <td>{user.pokemonCount}</td>
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
