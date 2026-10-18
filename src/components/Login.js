import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm((currentValue) => !currentValue);
    setErrorMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const fullName = fullNameRef.current?.value.trim() ?? "";
    const message = checkValidData(email, password);

    if (!message && !isSignInForm && !fullName) {
      setErrorMessage("Full name is required.");
      return;
    }

    setErrorMessage(message);
    if (message) return;

    try {
      const userCredential = isSignInForm
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!isSignInForm) {
        await updateProfile(user, { displayName: fullName });
      }

      dispatch(
        addUser({
          uuid: user.uid,
          email: user.email,
          displayName: isSignInForm ? user.displayName : fullName,
        }),
      );
      navigate("/browse");
    } catch (error) {
      setErrorMessage(`${error.code}: ${error.message}`);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f0b42cac-9ced-425f-8677-777eadbdbe2f/web/IN-en-20261005-TRIFECTA-perspective_14c6dcd8-c058-4841-a0e5-1d0d70b35836_medium.jpg"
        alt="Netflix Background"
        className="w-full object-cover absolute -z-10"
      />
      <Header />
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <form
          className="flex flex-col bg-black/70 w-full max-w-md p-8 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 mb-4 rounded-lg text-black"
              ref={fullNameRef}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 mb-4 rounded-lg text-black"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-4 rounded-lg text-black"
            ref={passwordRef}
          />
          {errorMessage && (
            <p className="text-red-500 flex flex-wrap">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="mt-4 cursor-pointer text-blue-300 p-2 hover:underline rounded-lg"
            onClick={toggleSignInForm}
          >
            Don't have an account? {isSignInForm ? "Sign up" : "Sign in"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
