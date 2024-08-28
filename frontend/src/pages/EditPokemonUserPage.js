import React, { useEffect, useState } from "react";
import EditPokemonUserForm from "../components/EditPokemonUserForm";
import { useLocation, useNavigate } from "react-router-dom";

const EditPokemonUserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log(location.state?.id);
    if (location.state === null) {
      navigate("/list");
    }else {
      setIsReady(true);
    }
  }, []);

  return (
    <div>
      <h1>Edit User Pokemon</h1>
      {isReady && <EditPokemonUserForm id={location.state.id} />}
    </div>
  );
};

export default EditPokemonUserPage;
