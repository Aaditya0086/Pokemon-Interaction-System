// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPokemonUserPage from './pages/AddPokemonUserPage';
import HomePage from './pages/HomePage';
import ListOfPokemonUsersPage from './pages/ListOfPokemonUsersPage';
import EditPokemonUserPage from './pages/EditPokemonUserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPokemonUserPage />} />
          <Route path="/edit" element={<EditPokemonUserPage />} />
          <Route path="/list" element={<ListOfPokemonUsersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;