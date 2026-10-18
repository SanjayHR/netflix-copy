import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to the login page after signing out
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        navigate("/error"); // Redirect to the login page even if there's an error
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="flex items-center justify-between p-4 bg-black/70">
      <img
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVIENVPMEM3Kn4hVzJseX4N8xPjtBDIpwuFDucWksdxQZ8Ss6Xf8U_vt7ThYYfRmzq0x1CS3nOwTGyVrgADvwfB_tPiK_liS2RjvI40RJSzbKRk-o8b3nCxHfCCnBsyB2XBB9_vRoSmN.svg"
        alt="Netflix Logo"
        className="w-32 h-12 bg-gradient-to-bl"
      />
      {user && (
        <div className="flex items-right justify-center p-4 bg-black/70">
          <h1
            className="text-md font-bold text-white cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </h1>
        </div>
      )}
    </div>
  );
};

export default Header;
