import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  DISPLAY_ALERT_PASSWORD,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_PET_ERROR,
  CREATE_PET_SUCCESS,
  CREATE_PET_BEGIN,
  GET_PET_SUCCESS,
  GET_PETS_BEGIN,
  SET_EDIT_PET,
  DELETE_PET_BEGIN,
  EDIT_PET_BEGIN,
  EDIT_PET_SUCCESS,
  EDIT_PET_ERROR,
  CLEAR_FILTERS,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  SAVE_PET_SUCCESS,
  SAVE_PET_BEGIN,
  SAVE_PET_ERROR,
  DELETESAVE_PET_BEGIN,
  DELETESAVE_PET_SUCCESS,
  GET_SAVED_BEGIN,
  GET_SAVED_SUCCESS,
  OWN_PET_BEGIN,
  OWN_PET_SUCCESS,RETURN_PET_BEGIN, RETURN_PET_SUCCESS
} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all the values!",
    };
  }

  if (action.type === DISPLAY_ALERT_PASSWORD) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Passwords don't match!",
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Congrats for being a member! Redirecting...",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
      myPets: []
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editPetId: "",
      type: "Cat",
      name: "",
      status: "Available",
      img: "",
      height: "",
      weight: "",
      color: "",
      hypoallergenic: "Yes",
      diet: "",
      breed: "",
      bio: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_PET_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet added successfully",
    };
  }
  if (action.type === CREATE_PET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_PETS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      pets: action.payload.pets,
      totalPets: action.payload.totalPets,
    };
  }

  if (action.type === GET_USERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      profiles: action.payload.profiles,
      totalUsers: action.payload.totalUsers,
    };
  }

  if (action.type === SET_EDIT_PET) {
    const pet = state.pets.find((pet) => pet._id === action.payload.id);
    const {
      _id,
      type,
      name,
      status,
      img,
      height,
      color,
      hypoallergenic,
      diet,
      breed,
      bio,
      weight,
    } = pet;
    return {
      ...state,
      isEditing: true,
      editPetId: _id,
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
    };
  }

  if (action.type === DELETE_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet updated!",
    };
  }
  if (action.type === EDIT_PET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      searchType: "All",
      searchStatus: "All",
      searchName: "",
      searchHeight: "",
      searchWeight: "",
    };
  }

  if (action.type === SAVE_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SAVE_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Saved!",
    };
  }
  if (action.type === SAVE_PET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETESAVE_PET_BEGIN) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Unsaved!",
    };
  }
  if (action.type === DELETESAVE_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Pet Unsaved!",
    };
  }

  if (action.type === GET_SAVED_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_SAVED_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      myPets: action.payload.myPets,
      totalSaved: action.payload.totalSaved,
    };
  }
  if (action.type === OWN_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === OWN_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Successfully updated! You now own this pet!",
    };
  }

  if (action.type === RETURN_PET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === RETURN_PET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Thank you! Please make sure to come and return the pet!",
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
