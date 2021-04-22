import React, { useState, useContext, useEffect, createContext } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // load initial state from local storage
    const token = localStorage.getItem("token") || null;
    setAuthToken(token);
    console.log(`Loaded token: ${token}`);
  }, []);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  function createApolloClient() {
    const link = new HttpLink({
      uri: "http://localhost:4000/graphql",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }

  const signOut = () => {
    console.log("sign out");
    setAuthToken(null);
    // HEBI CAUTION this must be removed. Otherwise, when getItem back, it is not null, but "null"
    // localStorage.setItem("token", null);
    localStorage.removeItem("token");
  };

  const signIn = async ({ username, password }) => {
    const client = createApolloClient();
    const LoginMutation = gql`
      mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `;
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    });

    console.log(result);

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
      localStorage.setItem("token", result.data.login.token);
    }
  };

  const signUp = async ({ username, email, password }) => {
    const client = createApolloClient();
    const LoginMutation = gql`
      mutation SignupMutation(
        $username: String!
        $email: String!
        $password: String!
      ) {
        signup(username: $username, email: $email, password: $password) {
          token
        }
      }
    `;
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password, email },
    });

    console.log(result);

    if (result?.data?.signup?.token) {
      setAuthToken(result.data.signup.token);
      localStorage.setItem("token", result.data.signup.token);
    }
  };

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  return {
    createApolloClient,
    signIn,
    signOut,
    signUp,
    isSignedIn,
  };
}
