import React, { useReducer, useContext } from "react";

import reducer from "./reducers";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
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
  OWN_PET_SUCCESS,
  RETURN_PET_BEGIN,
  RETURN_PET_SUCCESS,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alerType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  editPetId: "",
  typeOptions: ["Dog", "Cat"],
  type: "Cat",
  name: "",
  statusOptions: ["Adopted", "Fostered", "Available"],
  status: "Available",
  img: "",
  height: "",
  weight: "",
  color: "",
  hypoallergenicOptions: ["Yes", "No"],
  hypoallergenic: "Yes",
  diet: "",
  breed: "",
  bio: "",
  pets: [],
  totalPets: 0,
  searchType: "All",
  searchStatus: "All",
  searchName: "",
  searchHeight: "",
  searchWeight: "",
  profiles: [],
  totalUsers: 0,
  savedPets: [],
  myPets: [],
  totalSaved: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = process.env.NODE_ENV === "production" ? "https://pet-kingdom-server.herokuapp.com/api/v1" : "http://localhost:5000/api/v1"  ;

  const authFetch = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://pet-kingdom-server.herokuapp.com/api/v1" : "http://localhost:5000/api/v1"  
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const passwordAlert = () => {
    dispatch({ type: DISPLAY_ALERT_PASSWORD });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserToLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        `${url}/auth/register`,
        currentUser
      );
      // console.log(response);
      const { user, token } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `${url}/auth/login`,
        currentUser
      );
      // console.log(response);
      const { user, token } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
   
      addUserToLocalStorage( {user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createPet = async (file) => {
    dispatch({ type: CREATE_PET_BEGIN });
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("type", state.type);
    formData.append("status", state.status);
    formData.append("img", file.current.files[0]);
    formData.append("height", state.height);
    formData.append("weight", state.weight);
    formData.append("color", state.color);
    formData.append("hypoallergenic", state.hypoallergenic);
    formData.append("diet", state.diet);
    formData.append("breed", state.breed);
    formData.append("bio", state.bio);
    try {
      // const {
      //   type,
      //   name,
      //   status,
      //   img,
      //   height,
      //   weight,
      //   color,
      //   hypoallergenic,
      //   diet,
      //   breed,
      //   bio,
      // } = state;
      await authFetch.post(
        "/pets",
        formData
        // type,
        // name,
        // status,
        // img,
        // height,
        // weight,
        // color,
        // hypoallergenic,
        // diet,
        // breed,
        // bio,
      );
      dispatch({ type: CREATE_PET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getPets = async () => {
    const { searchType, searchStatus, searchName, searchHeight, searchWeight } =
      state;

    let urlPet = `/pets?type=${searchType}&&status=${searchStatus}&&name=${searchName}&&height=${searchHeight}&&weight=${searchWeight}`;

    dispatch({ type: GET_PETS_BEGIN });
    try {
      const { data } = await axios.get(`${url}${urlPet}`);
      const { pets, totalPets } = data;
      // const formData = new FormData();
      // formData.append("type", pets.type);
      // formData.append("name", pets.name);
      // formData.append("img", pets.img, pets.img);

      dispatch({
        type: GET_PET_SUCCESS,
        payload: {
          pets,
          totalPets,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const setEditPet = (id) => {
    dispatch({ type: SET_EDIT_PET, payload: { id } });
  };

  const getUsers = async () => {
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch.get(
        "/auth/users"
      );

      const { profiles, totalUsers } = data;

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          profiles,
          totalUsers,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const editPet = async (file) => {
    dispatch({ type: EDIT_PET_BEGIN });
    let fileData;
    file.current.files.length !== 0
      ? (fileData = file.current.files[0])
      : (fileData = state.img);
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("type", state.type);
    formData.append("status", state.status);
    formData.append("img", fileData);
    formData.append("height", state.height);
    formData.append("weight", state.weight);
    formData.append("color", state.color);
    formData.append("hypoallergenic", state.hypoallergenic);
    formData.append("diet", state.diet);
    formData.append("breed", state.breed);
    formData.append("bio", state.bio);
    try {
      // const {
      //   type,
      //   name,
      //   status,
      //   img,
      //   height,
      //   weight,
      //   color,
      //   hypoallergenic,
      //   diet,
      //   breed,
      //   bio,
      // } = state;
      await authFetch.patch(
        `/pets/${state.editPetId}`,
        formData
      );
      dispatch({ type: EDIT_PET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deletePet = async (petId) => {
    dispatch({ type: DELETE_PET_BEGIN });
    try {
      await authFetch.delete(`/pets/${petId}`);
      getPets();
    } catch (error) {
      console.log(error.response);
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const savePet = async (id) => {
    dispatch({ type: SAVE_PET_BEGIN });
    try {
      await authFetch.patch(`/pets/${id}/save`, {
        userId: state.user._id,
      });
      const { user } = state;
      user.savedPets = [...user.savedPets, id];

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: SAVE_PET_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) return;
      dispatch({
        type: SAVE_PET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteSavePet = async (id) => {
    dispatch({ type: DELETESAVE_PET_BEGIN });
    try {
      const { user } = state;
      await authFetch.delete(`/pets/${id}/save`, {
        data: { userId: user._id },
      });

      user.savedPets = user.savedPets.filter((petId) => petId !== id);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const userGetSaved = async () => {
    dispatch({ type: GET_SAVED_BEGIN });
    try {
      const { user } = state;

      const { data } = await axios.get(
        `${url}/pets/user/${user._id}?petQuer=savedPets`
      );
     
      const { myPets, totalSaved } = data;

      dispatch({
        type: GET_SAVED_SUCCESS,
        payload: {
          myPets,
          totalSaved,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };
  const userGetOwned = async () => {
    dispatch({ type: GET_SAVED_BEGIN });
    try {
      const { user } = state;

      const { data } = await axios.get(
        `${url}/pets/user/${user._id}?petQuer=ownedPets`
      );
      
      const { myPets, totalSaved } = data;

      dispatch({
        type: GET_SAVED_SUCCESS,
        payload: {
          myPets,
          totalSaved,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const getAdminUserPet = async (id) => {
    dispatch({ type: GET_SAVED_BEGIN });
    try {
      const { user } = state;

      const { data } = await authFetch.get(
        `/pets/user/${id}?petQuer=ownedPets`
      );
    
      const { myPets, totalSaved } = data;

      dispatch({
        type: GET_SAVED_SUCCESS,
        payload: {
          myPets,
          totalSaved,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const fosterPet = async (id, status) => {
    dispatch({ type: OWN_PET_BEGIN });
    try {
      await authFetch.patch(`/pets/${id}/adopt`, {
        userId: state.user._id,
        status: status,
      });
      const { user } = state;
      user.ownedPets = [...user.ownedPets, id];

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: OWN_PET_SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  const returnPet = async (id, status) => {
    dispatch({ type: RETURN_PET_BEGIN });
    try {
      await authFetch.patch(`/pets/${id}/return`, {
        userId: state.user._id,
        status: status,
      });
      const { user } = state;
      user.ownedPets = user.ownedPets.filter((petId) => petId !== id);

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: RETURN_PET_SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        passwordAlert,
        registerUser,
        loginUser,
        updateUser,
        removeUserToLocalStorage,
        logoutUser,
        handleChange,
        clearValues,
        createPet,
        getPets,
        setEditPet,
        deletePet,
        editPet,
        clearFilters,
        getUsers,
        savePet,
        deleteSavePet,
        userGetSaved,
        userGetOwned,
        fosterPet,
        returnPet,getAdminUserPet
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
