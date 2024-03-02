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
  const [username, setUsername] = useState("");
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
      username,
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

    <>
      <form className="flex w-full" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl text-primary font-semibold">Register</h1>

          <div className="flex flex-row align-top gap-6 w-11/12 max-w-[700px] px-8 py-6 rounded-3xl border-0 border-gray-100">

            <div className="flex flex-col mt-4 w-1/2">
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-primary font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-primary rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter your email"
                />
              </div>
              {/* Password */}
              <div className="flex flex-col mt-3">
                <label htmlFor="password" className="text-primary font-medium">Password</label>
                <input
                  name="password"
                  value={password}
                  minLength={14}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-primary rounded-xl p-2 mt-1 bg-transparent"
                  placeholder="Enter a password"
                  type={"password"}
                />
              </div>
              {/* First name */}
              <div className="flex flex-col mt-3">
                <label htmlFor="firstName" className="text-primary font-medium">First Name</label>
                <input
                  name="first-name"
                  type="text"
                  placeholder="First Name"
                  className="w-full border-2 border-primary rounded-xl p-2 mt-1 bg-transparent"
                  value={firstName}
                  // minLength={14}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mt-4 w-1/2">
              {/* Last name */}
              <div className="flex flex-col">
                <label htmlFor="second-name" className="text-primary font-medium">Last Name</label>
                <input
                  name="second-name"
                  type="text"
                  placeholder="Last Name"
                  className="w-full border-2 border-primary rounded-xl p-2 mt-1 bg-transparent"
                  value={secondName}
                  // minLength={14}
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </div>
              {/* Username */}
              <div className="flex flex-col mt-3">
                <label htmlFor="username" className="text-primary font-medium">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-full border-2 border-primary rounded-xl p-2 mt-1 bg-transparent"
                  value={username}
                  // minLength={14}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {/* Image URL */}
              <div className="flex flex-col mt-3">
                <label htmlFor="image-url" className="text-primary font-medium">Image URL</label>
                <input
                  name="image-url"
                  type="url"
                  placeholder="URL for profile image"
                  className="w-full border-2 border-primary rounded-xl p-2 mt-1 bg-transparent"
                  value={imageUrl}
                  // minLength={14}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          {(isErrorToken || isErrorUser) && (
            <div>There was an error. Try again.</div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
