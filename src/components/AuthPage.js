import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpFrom from "./SignUpForm";

const AuthPage = ({ setUserInfo, setIsLogged }) => {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div>
      {toggleForm ? (
        <LoginForm
          setUserInfo={setUserInfo}
          setIsLogged={setIsLogged}
          toggleForm={setToggleForm}
        />
      ) : (
        <SignUpFrom
          setUserInfo={setUserInfo}
          setIsLogged={setIsLogged}
          toggleForm={setToggleForm}
        />
      )}{" "}
    </div>
  );
};

export default AuthPage;
