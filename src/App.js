import { useState } from "react";
import BackgrndSidebar from "./components/BackgrndSidebar";
// import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routers,
  Routes,
} from "react-router-dom";
import { useAppContext } from "./context/appContext";
import Homepage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProtedctedRoute from "./components/ProtedctedRoute";
import Profile from "./pages/Profile";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AddPets from "./pages/AddPets";
import AllPets from "./pages/AllPets";
import PetPage from "./pages/PetPage";
import MyPets from "./pages/MyPets";
import AllUsers from "./pages/AllUsers";
import UserPage from "./pages/UserPage";

function App() {
  const [sidebarOn, SetSideBarOn] = useState(false);
  const { user } = useAppContext();

  const sidebarOnclick = () => {
    SetSideBarOn(true);
  };

  const backgroundOn = () => {
    SetSideBarOn(false);
  };

  return (
    <div>
      <Router>
        <Navbar sidebarOnClick={sidebarOnclick} />
        {sidebarOn ? <Sidebar /> : null}
        {sidebarOn ? <BackgrndSidebar onBckgrn={backgroundOn} /> : null}

        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route
              path="/profile"
              element={
                <ProtedctedRoute>
                  <Profile />
                </ProtedctedRoute>
              }
            />
            <Route
              path="/mypets"
              element={
                <ProtedctedRoute>
                  <MyPets />
                </ProtedctedRoute>
              }
            />
            <Route path="/allpets" element={<AllPets />} />
            <Route path="/admin">
              <Route
                path="addpet"
                element={
                  <ProtedctedRoute>
                    <ProtectedAdminRoute>
                      <AddPets />
                    </ProtectedAdminRoute>
                  </ProtedctedRoute>
                }
              />
              <Route
                path="allusers"
                element={
                  <ProtedctedRoute>
                    <ProtectedAdminRoute>
                      <AllUsers />
                    </ProtectedAdminRoute>
                  </ProtedctedRoute>
                }
              />
              <Route
                path="userpage/:id"
                element={
                  <ProtedctedRoute>
                    <ProtectedAdminRoute>
                      <UserPage />
                    </ProtectedAdminRoute>
                  </ProtedctedRoute>
                }
              />
            </Route>
          </Route>
          <Route path="/petpage/:id" element={<PetPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default App;
