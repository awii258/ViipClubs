import DataContext from "./DataContext";
import { NODE_APP_URI } from "../utils/config.ts";

import axios from "axios";
import { AsyncStorage } from "AsyncStorage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signout":
      return { token: null, email: "", password: "" };
    case "signin":
    case "signup":
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // console.log("Signup");
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // Do some API Request here try ///
// console.log(
//   JSON.stringify({
//     email: email,
//     password: password,
//   })
// );
    fetch(
      "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        alert(`${responseJson.access_token}`);
        // console.log(responseJson);
      

      })
      .catch((error) => {
        console.log("hi", error); 
        alert(`${error.message}`);                     
      });

    // console.log("Signin");
    dispatch({
      type: "signin",
      payload: {
        token: "responseJson",
        email,
        password,
      },
    });
  };
};

const signout = (dispatch) => {
   
  return () => {
    dispatch({ type: "signout" });
  };
};


export const { Provider, Context } = DataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, email: "", password: "" }
);
