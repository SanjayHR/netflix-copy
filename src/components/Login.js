import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f0b42cac-9ced-425f-8677-777eadbdbe2f/web/IN-en-20261005-TRIFECTA-perspective_14c6dcd8-c058-4841-a0e5-1d0d70b35836_medium.jpg"
        alt="Netflix Background"
        className="w-full h-screen object-cover absolute -z-10"
      />
      <Header />
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <form className="flex flex-col  bg-black/70 p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 mb-4 rounded-lg text-black"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="p-2 mb-4 rounded-lg text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-4 rounded-lg text-black"
          />
          <button
            type="submit"
            className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="mt-4 cursor-pointer text-blue-300 p-2 hover:underline rounded-lg" onClick={toggleSignInForm}>
            Don't have an account? {isSignInForm ? "Sign up" : "Sign in"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
