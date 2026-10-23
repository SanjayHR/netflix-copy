import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { LOGO } from "../constants/constants";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error"); // Redirect to the login page even if there's an error
        console.error("Error signing out:", error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(
          addUser({ uuid: uid, email: email, displayName: displayName }),
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="flex items-center justify-between p-4 bg-black/70">
      <img
        src={LOGO}
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
