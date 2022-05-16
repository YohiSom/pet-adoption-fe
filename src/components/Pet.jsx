import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function Pet({
  _id,
  type,
  name,
  status,
  img,
  height,
  weight,
  color,
  hypoallergenic,
  diet,
  breed,
  bio,
}) {
  const { setEditPet, deletePet, user, pets } = useAppContext();

  return (
    <div>
      <div>
        <img src={img} className="img" />
      </div>
      <div>{`Type: ${type}`}</div>
      <div>{`Name: ${name}`}</div>
      <div>{`Status: ${status}`}</div>
      <div>{`Height: ${height} Cm`}</div>
      <div>{`Weight: ${weight} Kg`}</div>
      <div>{`Color: ${color}`}</div>
      <div className="bio-div">{`Allergies: ${hypoallergenic}`}</div>
      {/* <div>{`Diet: ${diet}`}</div>
      <div>{`Breed: ${breed}`}</div>
      <div className="bio-div">{`Bio: ${bio}`}</div> */}
      {user?.isAdmin && (
        <>
          <Link style={{ textDecoration: "none" }} to="/admin/addpet">
            <button className="delete-button" onClick={() => setEditPet(_id)}>
              {" "}
              EDIT
            </button>
          </Link>
          <button
            className="delete-button"
            onClick={() => {
              window.confirm("Are you sure you want to delete this Pet?") &&
                deletePet(_id);
            }}
          >
            DELETE
          </button>
        </>
      )}
     {user && <Link to={`/petpage/${_id}`} style={{ textDecoration: "none" }}>
        <button className="delete-button">VIEW MORE</button>
      </Link>}
    </div>
  );
}

export default Pet;
