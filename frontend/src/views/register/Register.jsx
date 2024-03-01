import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateTokenMutation } from "../../services/tokenSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateNewUserMutation } from "../../services/accountSlice";
import { setCredentials } from "../../features/auth/authSlice";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    createToken,
    {
      isLoading: isLoadingToken,
      isError: isErrorToken,
      isSuccess: isSuccessToken,
      data: dataToken,
    },
  ] = useCreateTokenMutation({
    fixedCacheKey: "token",
  });
  const [
    createUser,
    {
      isLoading: isLoadingUser,
      isError: isErrorUser,
      isSuccess: isSuccessUser,
      data: dataUser,
    },
  ] = useCreateNewUserMutation();

  async function handleSubmit(event) {
    event.preventDefault();

    createUser({
      email,
      password,
      first_name: firstName,
      last_name: secondName,
      image_url: imageUrl,
    })
      .unwrap()
      .then((_data) => {
        createToken({ email: email, password: password })
          .unwrap()
          .then((tokenData) => {
            setCredentials(tokenData);
            // useNavigate here
          });
        console.log("token created");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <label htmlFor="email"></label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="grow"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <label htmlFor="password"></label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="grow"
            value={password}
            minLength={14}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* first name */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <label htmlFor="first-name"></label>
          <input
            name="first-name"
            type="text"
            placeholder="First Name"
            className="grow"
            value={firstName}
            // minLength={14}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {/* second name */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <label htmlFor="second-name"></label>
          <input
            name="second-name"
            type="text"
            placeholder="Second name"
            className="grow"
            value={secondName}
            // minLength={14}
            onChange={(e) => setSecondName(e.target.value)}
          />
        </label>
        {/* image url */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 opacity-70">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <label htmlFor="image-url"></label>
          <input
            name="image-url"
            placeholder="Url for profile image"
            type="url"
            className="grow"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            // The url must contain http
          />
        </label>
        {}
        {(isErrorToken || isErrorUser) && (
          <div>There was an error. Try again.</div>
        )}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
