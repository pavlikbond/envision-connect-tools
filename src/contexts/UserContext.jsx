import { useState, useContext, createContext, useEffect } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [role, setRole] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state variable
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoleAndAuthState() {
      try {
        const userAttributes = await fetchUserAttributes();
        const { userId } = await getCurrentUser();
        if (userId) {
          setIsSignedIn(true);
        }
        if (userAttributes) {
          setRole(userAttributes.profile || "");
          setName(userAttributes.name || "");
          setEmail(userAttributes.email || "");
        }
      } catch (error) {
        clearUser();
      }
      setIsLoading(false); // Set isLoading to false once we're done
    }

    Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          await getRoleAndAuthState();
          navigate("/");
          break;
        case "signedOut":
          clearUser();
          navigate("/");
          break;
      }
    });

    getRoleAndAuthState();
  }, []);

  const clearUser = () => {
    setIsSignedIn(false);
    setRole("");
    setName("");
    setEmail("");
  };

  return <UserContext.Provider value={{ role, isSignedIn, name, email, isLoading }}>{children}</UserContext.Provider>; // Include isLoading in the context
}
