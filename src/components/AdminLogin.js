import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { adminAuth } from "../utils/firebase"; // Replace with your firebase admin import
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice"; // Redux action to store user info

const AdminLogin = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleadminAuthAction = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current ? name.current.value : "";

    if (!isSignInForm) {
      // SIGN UP Logic
      createUserWithEmailAndPassword(adminAuth, emailValue, passwordValue)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Update Profile with Admin name
          await updateProfile(user, {
            displayName: nameValue,
          });

          // Dispatch user data to Redux store
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );

          // Redirect to Admin page
          navigate("/admin");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
        });
    } else {
      // LOGIN Logic
      signInWithEmailAndPassword(adminAuth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          // Dispatch user data to Redux store
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );

          // Redirect to Admin page
          navigate("/admin");
        })
        .catch((error) => {
          setErrorMessage(error.code + ": " + error.message);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white">
      <div className="bg-[#1f1f1f] p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          {isSignInForm ? "Admin Login" : "Admin Register"}
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Admin Full Name"
              className="p-3 rounded bg-[#333] placeholder-gray-400 focus:outline-none"
              required
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Admin Email"
            className="p-3 rounded bg-[#333] placeholder-gray-400 focus:outline-none"
            required
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-[#333] placeholder-gray-400 focus:outline-none"
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            type="button"
            onClick={handleadminAuthAction}
            className="bg-red-600 hover:bg-red-500 font-bold py-3 rounded"
          >
            {isSignInForm ? "Login" : "Register"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-gray-400 mt-6 text-center space-y-2">
          <p>
            {isSignInForm ? (
              <>
                New to Admin Portal?{" "}
                <span
                  onClick={toggleForm}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Register now
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={toggleForm}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            )}
          </p>

          {/* 👇 Add this for users who landed here by mistake */}
          <p>
            Not an Admin?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Go to User Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
