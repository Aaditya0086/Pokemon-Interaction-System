import Pokemons from "../models/pokemons.js";

export const getAllPokemons = async (req, res) => {
  const pokemons = await Pokemons.readData();
  res.json(pokemons);
};

export const getSearchedPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemons.readData();
    const searchedQuery = req.query.name;
    console.log(searchedQuery);
    const searchedPokemons = pokemons.results.filter((pokemon) => pokemon.name.toLowerCase().includes(searchedQuery));
    // console.log(searchedPokemons);
    if (searchedPokemons.length > 0) {
      res.json(searchedPokemons);
    } else {
      res.status(404).json({ message: "No Pokemons for this search" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting pokemons", error });
  }
};
