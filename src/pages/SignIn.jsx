import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";

const SignIn = () => {
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
