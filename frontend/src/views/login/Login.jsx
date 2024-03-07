import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateTokenMutation } from "../../services/tokenSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Welcome from "../../components/Welcome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createToken, { isLoading, isError, isSuccess, data }] =
    useCreateTokenMutation({
      fixedCacheKey: "token",
    });
  function handleSubmit(event) {
    event.preventDefault();
    console.log(email);
    console.log(password);
    // hooks go here
    createToken({ email, password })
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/projects");
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : isSuccess ? (
        <div>Redirecting...</div>
      ) : (
        <form className='flex w-full' onSubmit={handleSubmit}>
          <div className='w-full flex items-center justify-center lg:w-1/2'>
            <div className='w-11/12 max-w-[700px] px-8 py-6 rounded-3xl border-0 border-gray-100'>
              <h1 className='text-3xl text-primary font-semibold'>
                Welcome Back!
              </h1>
              <p className='font-medium text-lg text-secondary'>
                Please enter you details.
              </p>
              <div className='mt-6'>
                <div className='flex flex-col'>
                  <label className='text-primary font-medium'>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                    placeholder='Enter your email'
                  />
                </div>
                <div className='flex flex-col mt-4'>
                  <label className='text-primary font-medium'>Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent'
                    placeholder='Enter your email'
                    type={"password"}
                  />
                </div>
                <div className='mt-6 flex justify-center items-center'>
                  <button className='font-medium text-base text-primary'>
                    Forgot password
                    {/* not implemented for now */}
                  </button>
                </div>
                <div className='mt-6 flex flex-col gap-y-4'>
                  <button
                    type='submit'
                    className='btn btn-primary active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4'>
                    Sign in
                  </button>
                </div>
                <div className='mt-6 flex justify-center items-center'>
                  <p className='font-medium text-base'>
                    Don&apos;t have an account?
                  </p>
                  <button
                    onClick={() => navigate("/account/register/")}
                    className='ml-2 font-medium text-base text-primary'>
                    Sign up
                  </button>
                </div>
                {isError && (
                  <div className='flex justify-center text-error'>
                    There was an error. Try again.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='hidden relative w-1/2 lg:flex items-center justify-center'>
            <Welcome />
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
