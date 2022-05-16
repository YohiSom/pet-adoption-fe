import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert";

function PetPage() {
  const [pet, setPet] = useState("");
  const {
    user,
    showAlert,
    isLoading,
    savePet,
    deleteSavePet,
    fosterPet,
    returnPet, 
  } = useAppContext();

  const url = process.env.NODE_ENV === "production" ? "https://pet-kingdom-server.herokuapp.com/api/v1" : "http://localhost:5000/api/v1"  ;

  const { id } = useParams();

  const isPetSaved = user?.savedPets.includes(id);

  const getPet = async () => {
    await axios
      .get(`${url}/pets/${id}`)

      .then((res) => {
        const pet = res.data.success;

        setPet(pet);
      });
  };

  useEffect(() => {
    getPet();
  }, [fosterPet, returnPet]);

  /**/

  return (
    <div>
      <div className="pet-cont">
        {showAlert && <Alert />}
        {user && <h3>Hello {user.name}!</h3>}
        <h3>
          {" "}
          My name is {pet.name}. Welcome to my personal pet profile!
        </h3>
        {/* <img src={require("../assets/paw.png")} alt="paw" className="paw" /> */}
        <div>
          <img src={pet.img} className="img" />
        </div>
        <div>My name is {pet.name}</div>
        <div>I am a {pet.type}</div>
        <div>I am currently "{pet.status}"</div>

        <div>My Height is {pet.height} Cm</div>
        <div>I weigh {pet.weight} Kg</div>
        <div>My furry color is {pet.color}</div>
        {pet.bio ? <div>My life story is {pet.bio}</div> : null}
        <div>Am I sensitive to something? {pet.hypoallergenic}</div>
        {pet.diet ? <div>Any diets I should mention? {pet.diet}</div> : null}
        {pet.breed ? (
          <div>What kind of breed am I? Funny you should ask...{pet.breed}</div>
        ) : (
          "What kind of breed am I? Funny you should ask...I wish I knew"
        )}
        {user && (
          <div className="concider-pet">
            You might want to concider "Saving me for later", "Fostering me" or
            loving me for the rest of my life by clicking on "Adopt Me"!{" "}
          </div>
        )}
        {!user && (
          <div>
            Wish to love me, pet me and adopt me? Make sure to login or
            register!
          </div>
        )}
      </div>
      {user && (
        <div className="save-container">
          <div className="save-btn">
            {isPetSaved ? (
              <button className="btn-save" onClick={() => deleteSavePet(id)}>
                Unsave
              </button>
            ) : (
              <button className="btn-save" onClick={() => savePet(id)}>
                Save
              </button>
            )}

            {pet.status !== "Fostered" && (
              <button
                className="btn-save"
                onClick={() => fosterPet(id, "Fostered")}
                disabled={pet.status === "Adopted" }
              >
                Foster
              </button>
            )}

            {pet.status !== "Adopted" && (
              <button
                className="btn-save"
                onClick={() => fosterPet(id, "Adopted")}
                disabled={pet.status === "Fostered"}
              >
                Adopt
              </button>
            )}

            {(pet.status === "Adopted" ||
              pet.status === "Fostered") && 
                <button
                  className="btn-save"
                  onClick={() => returnPet(id, "Available")}
                  disabled={!user.ownedPets.includes(id) }
                >
                  Return Pet
                </button>
              }
            {/* {pet.status == "Adopted" && 
                <button className="btn-save" onClick={() => returnPet(id, "Available")}>Return Pet</button>
            } */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PetPage;
