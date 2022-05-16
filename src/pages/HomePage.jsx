import React from "react";
import { useAppContext } from "../context/appContext";
import pets from "../assets/pets.svg";

function Homepage() {
  const { user } = useAppContext();

  return (
    <div className="homepage">
      <div className="container-home">
        {
          !user ? (
            <>
              <h1>Welcome to the pet adoption agency!</h1>
              <p>Please sign up if you wish to adopt your pet today!</p>
              <p>
                Or if you wish to search for your perfect match first, make sure
                to use our search option.
              </p>
              <img src={pets} alt="pets" className="pets-img" />{" "}
            </>
          ) : (
            <>
              <h1>Welcome {`${user.name} ${user.lastname}`}!</h1>
              {user.isAdmin && <h1>This is your admin profile.</h1>}
              <img src={pets} alt="pets" className="pets-img" />
            </>
          )

          // <div className="homepage">
          //     <h1>Welcome {`${user.name} ${user.lastname}`}!</h1>
          // <img src={pets} alt="pets" className="pets-img"/></div>
        }{" "}
      </div>
    </div>
  );
}

export default Homepage;
