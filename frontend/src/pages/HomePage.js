// src/pages/HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { getUsers } from '../services/user';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    getUsers().then(response => setUsers(response.data));
  }, []);

  useEffect(() => {
    if (selectedUser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // Implement pokemon visualization here
    }
  }, [selectedUser]);

  const handleUserSelect = (e) => {
    const user = users.find(u => u.id === e.target.value);
    setSelectedUser(user);
  };

  const handlePokemonGo = () => {
    // Implement Pokemon Go logic
  };

  const handlePokemonFlee = () => {
    // Implement Pokemon Flee logic
  };

  const handlePokemonCease = () => {
    // Implement Pokemon Cease logic
  };

  return (
    <div className="home-page">
      <h1>wertyuio</h1>
      <select onChange={handleUserSelect}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.pokemonOwnerName}</option>
        ))}
      </select>
      <canvas ref={canvasRef} width="800" height="600"></canvas>
      <div>
        <button onClick={handlePokemonGo}>Pokemon Go</button>
        <button onClick={handlePokemonFlee}>Pokemon Flee</button>
        <button onClick={handlePokemonCease}>Pokemon Cease</button>
      </div>
    </div>
  );
};

export default HomePage;