import React, {useRef} from "react";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert";


function AddPets() {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    typeOptions,
    type,
    name,
    statusOptions,
    status,
    img,
    height,
    weight,
    color,
    hypoallergenicOptions,
    hypoallergenic,
    diet,
    breed,
    bio, handleChange, clearValues, createPet, editPet
  } = useAppContext();
  const file = useRef()

  const handlePetInput = (e) => {
      const name = e.target.name
      const value = e.target.value 
      handleChange({name, value})
  }

  const onSubmit = (e) => {
      e.preventDefault()
      if(!name || !type || !status || !height || !weight || !color || !hypoallergenic) {
        displayAlert()
          return
      }
    if(isEditing) {
        editPet(file)
        return 
    }
      createPet(file)
  }
  const onClear = (e) => {
    e.preventDefault()
    clearValues()
}



  return (
    <div className="addpet">
      <img
        src={require("../assets/paper.png")}
        alt="catPaper"
        className="cat-paper"
      />
      <h3>{isEditing ? "EDIT A PET" : "ADD A PET"}</h3>
      {showAlert && <Alert/>}
     <div className="option-container"> <label>Pet Type</label>{" "}
      <select className="addpet-input" name="type" value={type} onChange={handlePetInput}>
        <option>Cat</option>
        <option>Dog</option>
      </select>
      <label>Pet Status</label>{" "}
      <select className="addpet-input" name="status" value={status} onChange={handlePetInput}>
        <option>Available</option>
        <option>Fostered</option>
        <option>Adopted</option>
      </select>
      <label>Pet Allergies</label>{" "}
      <select className="addpet-input" name="hypoallergenic" value={hypoallergenic} onChange={handlePetInput}>
        <option>No</option>
        <option>Yes</option>
      </select></div>
      <label>Pet Name</label>{" "}
      <input className="addpet-input" placeholder="name" name="name" value={name} onChange={handlePetInput}></input>
      <label>Pet Height</label>{" "}
      <input className="addpet-input" placeholder="height" name="height" value={height} onChange={handlePetInput}></input>
      <label>Pet Weight</label>{" "}
      <input className="addpet-input" placeholder="weight" name="weight" value={weight} onChange={handlePetInput}></input>
      <label>Pet Color</label>{" "}
      <input className="addpet-input" placeholder="color" name="color" value={color} onChange={handlePetInput}></input>
      <label>Pet Diet</label>{" "}
      <input className="addpet-input" placeholder="diet" name="diet" value={diet} onChange={handlePetInput}></input>
      <label>Pet Breed</label>{" "}
      <input className="addpet-input" placeholder="breed" name="breed" value={breed} onChange={handlePetInput}></input>
      <label>Pet Picture</label>{" "}
      <input className="addpet-input" placeholder="picture" name="img"  type="file" ref={file} accept="image/*"></input>
      <label>Pet Bio</label>{" "}
      <textarea className="bio" placeholder="Short Bio about pet" name="bio" value={bio} onChange={handlePetInput}></textarea>
      <button className="addpet-btn" onClick={onSubmit} disabled={isLoading}>Save Pet</button>
      <button className="addpet-btn" onClick={onClear} >Clear</button>
    </div>
  );
}

export default AddPets;
