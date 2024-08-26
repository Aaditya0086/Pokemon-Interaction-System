import React, { useState, useEffect } from "react";
import AddPokemonToUserForm from "../components/AddPokemonToUserForm";
import { useLocation, useNavigate } from "react-router-dom";

const AddPokemonToUserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log(location.state?.id);
    if (location.state === null) {
      navigate("/list");
    } else {
      setIsReady(true);
    }
  }, []);

  return (
    <div>
      <h1>Add Pokemon</h1>
      {isReady && <AddPokemonToUserForm id={location.state.id} />}
    </div>
  );
};

export default AddPokemonToUserPage;
