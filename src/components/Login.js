import { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import { clientAuth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { BackGround } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => setIsSignInForm(!isSignInForm);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const validationMessage = validateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(validationMessage);
    if (validationMessage) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        clientAuth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = clientAuth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
              navigate("/browse");
            })
            .catch(() => navigate("/error"));
        })
        .catch((error) => {
          setErrorMessage(`${error.code} ${error.message}`);
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        clientAuth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(`${error.code} ${error.message}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BackGround} alt="BackGround" />
      </div>
      <form
        className="bg-opacity-80 absolute bg-gray-950 w-1/3 my-20 mx-auto right-0 left-0 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-3xl font-bold text-white mx-10 mt-12 mb-6">
          {isSignInForm ? "Sign In" : "Sign up"}
        </h2>
        {!isSignInForm && (
          <input
            ref={name}
            className="w-3/4 p-3 my-3 mx-10 rounded-sm bg-gray-900 text-white outline outline-offset-2 outline-1 outline-white"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="w-3/4 p-3 my-3 mx-10 rounded-sm bg-gray-900 text-white outline outline-offset-2 outline-1 outline-white"
          type="text"
          placeholder="Email or Phone number"
        />
        <input
          ref={password}
          className="w-3/4 p-3 my-3 mx-10 rounded-sm bg-gray-900 outline outline-offset-2 outline-1 outline-white text-white"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-600 mx-10 font-bold text-lg">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="w-3/4 p-3 my-5 mx-10 rounded-md text-white font-semibold bg-red-600 text-lg hover:bg-red-800"
        >
          {isSignInForm ? "Sign In" : "Sign up"}
        </button>
        <p className="text-white mx-10 mt-10 mb-5" onClick={toggleForm}>
          {isSignInForm ? (
            <>
              New to Netflix?{" "}
              <span className="cursor-pointer hover:underline">
                Sign up now
              </span>
            </>
          ) : (
            <>
              Already a User?{" "}
              <span className="cursor-pointer hover:underline">
                Sign in now
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
