import React, { useEffect } from 'react'
import PokemonListingTable from '../components/PokemonListingTable';

const ListOfPokemonUsersPage = () => {

    useEffect(() => {
        // console.log('hello');
    })

  return (
    <div>
      <h1>List of Pokemon Users</h1>
      <PokemonListingTable />
    </div>
  )
}

export default ListOfPokemonUsersPage;
