import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  //check if user signed in, if so redirect to home page
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const formFields = {
    signIn: {
      username: {
        labelHidden: false,
        placeholder: "Enter your email",
      },
      password: {
        labelHidden: false,
        label: "Password",
        placeholder: "Enter your Password",
      },
    },
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Authenticator hideSignUp={true} formFields={formFields} />
    </div>
  );
};

export default SignIn;
