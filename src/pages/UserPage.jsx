import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAppContext } from "../context/appContext";
import UserPets from "../components/UserPets";
import AdminUserPet from "../components/AdminUserPet";
import User from "../components/User";
import { Link } from "react-router-dom";

function UserPage() {
  const { id } = useParams();
  const [thisUser, setThisUser] = useState("");
  const [userPet, SetUserPet] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const { getAdminUserPet, myPets, token, logoutUser, user } = useAppContext();

  const authFetch = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://pet-kingdom-server.herokuapp.com/api/v1" : "http://localhost:5000/api/v1",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${token}`;
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

  const getUser = async () => {
    SetIsLoading(true);
    await authFetch.get(`/auth/user/${id}`).then((res) => {
      const user = res.data.success;
      SetIsLoading(false);
      setThisUser(user);
    }
    
    );
  };

  useEffect(() => {
    getUser();
    getAdminUserPet(id);
  }, []);

  return (
    <div className="user-page-container">
      <div className="user-pet-container">
        {isLoading && (
          <div className="spiner-container">
            <div className="spinner"></div>
          </div>
        )}
        <User {...thisUser}></User>
        {thisUser.isAdmin ? <div>Admin: Yes</div> : <div>Admin: No</div>}
        <h3>{`${thisUser.name} owns ${myPets.length} pets!`}</h3>
        {myPets.length === 0 ? (
          <p>No owned pets!</p>
        ) : (
          myPets.map((myPet) => {
            return (
              <div key={myPet._id} className="mypet-container">
                <Link
                  to={`/petpage/${myPet._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <AdminUserPet {...myPet}></AdminUserPet>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserPage;
