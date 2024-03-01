import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>
        Login
        <btn
          onClick={() => {
            navigate("/account/login/");
          }}>
          Here
        </btn>
      </p>
      <p>
        Not registered yet?
        <btn
          onClick={() => {
            navigate("/account/register/");
          }}>
          Sign Up
        </btn>
      </p>
    </div>
  );
};

export default Account;
