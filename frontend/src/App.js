import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePokemonUserPage from './pages/CreatePokemonUserPage';
import HomePage from './pages/HomePage';
import ListOfPokemonUsersPage from './pages/ListOfPokemonUsersPage';
import EditPokemonUserPage from './pages/EditPokemonUserPage';
import AddPokemonToUserPage from './pages/AddPokemonToUserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePokemonUserPage />} />
          <Route path="/edit" element={<EditPokemonUserPage />} />
          <Route path="/list" element={<ListOfPokemonUsersPage />} />
          <Route path="/add" element={<AddPokemonToUserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;