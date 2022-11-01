
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataContext from "./DataContext";
import AuthReducer from "./AuthReducer";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";


import Vip from "../api/Vip"
import { ERROR, ONLOGOUT } from './Types'
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setCredentials, getCredentials } from './AuthCredentials'




const onSignin =

  (dispatch) =>

    async ({ email, password }) => {
      // console.log(">?>?>",email,password)
      const body = JSON.stringify({ email, password })
      const config = { headers: { "Content-Type": "application/json" } };
      try {
        const response = await Vip.post("/api/external/auth/login", body, config);
        await AsyncStorage.setItem("lase-user-email", email);
        // await AsyncStorage.setItem("token",response.data.access_token);
        setCredentials({ access_token: response.data.access_token, refresh_token: response.data.refresh_token })
        // console.log("emaillllllllllllll",email)
        // console.log("my token>>>>>>>>>0", response.data.access_token);
        const access = await response.data.access_token
        dispatch({ type: "LOGIN", payload: response.data });

        //  dispatch({ type: "RESTORE_TOKEN", payload: access });
        // navigation.navigate("Profile");
      } catch (err) {
        console.log('bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>signin', err)
        alert("Invalid Credentials");
        dispatch({
          type: "ERROR",
          payload: "Invalid Credentials",
        });
      }
    };
const onUpdate =
  (dispatch) =>
    async ({ first, last, email, date }) => {
      // console.log(">?>?>", first,last,email,date);
      const body = JSON.stringify({
        first_name: first,
        last_name: last,
        email,
        date_of_birth: date,
      });
      // const body = new FormData()
      const config = { headers: { "Content-Type": "application/json" } };
      try {
        const response = await Vip.put(
          "/api/external/auth/me",
          body,
          config
        );


        // console.log("emaillllllllllllll", email);
        // console.log("my token>>>>>>>>>0", response.data.access_token);
        const access = await response.data.access_token;
        dispatch({ type: "UPDATE", payload: response.data.data });


        // navigation.navigate("Profile");
      } catch (err) {
        console.log("bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>on update", err);
        alert("Invalid Credentials");
        dispatch({
          type: "ERROR",
          payload: "Invalid Credentials",
        });
      }
    };
const onUpdateImage =
  (dispatch) =>
    async (formBody) => {
      //  console.log(">?>?>", first, last, email, date);
      //  const body = JSON.stringify({
      //    first_name: first,
      //    last_name: last,
      //    email,
      //    date_of_birth: date,
      //  });
      // const body = new FormData()
      //  console.log("Formbody inside action >>>>>>>", formBody)
      // let token = await AsyncStorage.getItem("token");
      const { access_token: token } = await getCredentials()
      //  console.log(".....................,mm,m", token);
      const config = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer" + token,
        },
      };

      try {
        const response = await fetch(
          "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/image",
          {
            method: "POST",
            body: formBody,
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + token,
            },
          }
        );

        //  console.log("emaillllllllllllll", email);
        //  console.log("my token>>>>>>>>>0", response.data.access_token);
        //  const access = await response.data.access_token;
        // console.log("After successfully updating image >>>>>>>>>>>>>>>>>>>", response)
        //  dispatch({ type: "onUpdateImage", payload: response.data });

        // navigation.navigate("Profile");
      } catch (err) {
        console.log("bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>on update image", err.message);
        alert("Invalid Credentials", err.message);
        dispatch({
          type: "ERROR",
          payload: "Invalid Credentials",
        });
      }
    };
// const restoreToken = (dispatch) => (access_token) => {
//   dispatch({ type: "RESTORE_TOKEN", payload:access_token}); v
// };


// const configureAPI = ({ token }) => {

//   API.defaults.headers.common["Authorization"] =  token;
// };
// const onCheckLogin = (dispatch) => async () => {
//   const navigation = useNavigation();
//   const token = await SecureStore.getItemAsync("token");

//      // We have data!!


//   if (token) {

//     dispatch({ type:LOGIN, payload: token });
//    navigation.navigate("Profile");
//     configureAPI({ token });
//   } else {
//    navigation.navigate("Home");
//   }
// };
// const onLogout = (dispatch) => () => {
//   navigation.navigate("Home");
//   dispatch({ type:LOGOUT });
// };

const onGetProfile = (dispatch) => async () => {
  console.log('hiiiiiiiiiii')
  //  try {
  //    console.log('jjjjjjjjjjjj')
  //    // setting up multiget
  //    // userToken = await AsyncStorage.multiGet(['userToken', 'userRef']);
  //    userToken = await AsyncStorage.getItem("token");
  //    console.log("mytoken???????????",userToken)
  //    return userToken;


  //  } catch (e) {
  //    console.log(kkkkkkkkkkk)
  //    console.log(e)
  //    // Restoring token failed
  //  }
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m",token)

  try {
    //  console.log("skdfjksdjfsdjfkds")
    const response = await fetch(
      "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/me",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();
    const current = data;
    dispatch({ type: "PROFILE", payload: current });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};
const onNew = (dispatch) => async () => {
  // console.log("hiiiiiiiiiii");
  //  try {
  //    console.log('jjjjjjjjjjjj')
  //    // setting up multiget
  //    // userToken = await AsyncStorage.multiGet(['userToken', 'userRef']);
  //    userToken = await AsyncStorage.getItem("token");
  //    console.log("mytoken???????????",userToken)
  //    return userToken;

  //  } catch (e) {
  //    console.log(kkkkkkkkkkk)
  //    console.log(e)
  //    // Restoring token failed
  //  }
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()
  console.log("Verifying token: ", token)

  // console.log(".....................,mm,m", token);
  // alert(`token before hand: ${token}`)

  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/me",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();
    const current = data;
    dispatch({ type: "PRO", payload: current });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
    // alert(`actions failed: ${err || err.message}`)
  }
};
const onProfile = (dispatch) => async (search, type = "", town = "") => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);



  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates?town=${town}&type=${type}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log('alkjdfklasdjf??????????')
    const currents = data.data;

    dispatch({ type: "ONPROFILE", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const clearOnProfile = (dispatch) => () => {
  dispatch({ type: "clearOnProfile", payload: null })
}

const onToggleSaveAffiliate = (dispatch) => async (id) => {
  // console.log("hiiiiiiiiiii");

  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);
  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates/${id}/toggle`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();
    // console.log('alkjdfklasdjf??????????')
    const currents = data.data;
    dispatch({ type: "onToggleSaveAffiliate", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const onAffiliate = (dispatch) => async (search = "") => {
  // console.log("hiiiiiiiiiii");
  //  try {
  //    console.log('jjjjjjjjjjjj')
  //    // setting up multiget
  //    // userToken = await AsyncStorage.multiGet(['userToken', 'userRef']);
  //    userToken = await AsyncStorage.getItem("token");
  //    console.log("mytoken???????????",userToken)
  //    return userToken;

  //  } catch (e) {
  //    console.log(kkkkkkkkkkk)
  //    console.log(e)
  //    // Restoring token failed
  //  }
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/towns?search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log('alkjdfklasdjf??????????')
    const currents = data.data;

    dispatch({ type: "onAffiliate", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const onEventByTowns = (dispatch) => async (town = "") => {
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/events?town=${town}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log('alkjdfklasdjf??????????')
    const currents = data.data;

    dispatch({ type: "onEventByTowns", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const clearEventsByTowns = (dispatch) => async () => {
  dispatch({ type: "clearEventsByTowns", payload: null })
}

const onClub = (dispatch) => async (city) => {
  // console.log("hiiiiiiiiiii",city);
  //  try {
  //    console.log('jjjjjjjjjjjj')
  //    // setting up multiget
  //    // userToken = await AsyncStorage.multiGet(['userToken', 'userRef']);
  //    userToken = await AsyncStorage.getItem("token");
  //    console.log("mytoken???????????",userToken)
  //    return userToken;

  //  } catch (e) {
  //    console.log(kkkkkkkkkkk)
  //    console.log(e)
  //    // Restoring token failed
  //  }
  await AsyncStorage.setItem("id", city.toString());
  let call = await AsyncStorage.getItem("id");
  // console.log("hilllkillllkill",call)

  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates/${call}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();



    // console.log("alkjdfklasdjf??????????",);
    const currents = data.data;
    // const Curren = Object.assign({}, data.data);
    dispatch({ type: "ONCLUB", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const clearClub = (dispatch) => async () => {
  dispatch({ type: "CLEARCLUB", payload: null })
}

const onClubs = (dispatch) => async (citys) => {
  await AsyncStorage.setItem("id", citys.toString());
  let call = await AsyncStorage.getItem("id");
  // console.log("hilllkillllkill", call);

  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);

  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates?town=${citys}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log("alkjdfklasdjf??????????");
    const currentss = data.data;
    // const Curren = Object.assign({}, data.data);
    dispatch({ type: "ONCLUBS", payload: currentss });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};


const onEvents = (dispatch) => async (city) => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      "https://be-vip-service-slxus.ondigitalocean.app/api/external/events",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log('alkjdfklasdjf??????????')
    const currents = data.data;

    dispatch({ type: "onEvents", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};



const onCompetitions = (dispatch) => async (city) => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  // const {access_token: token} = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    const { access_token: token } = await getCredentials()

    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      "https://be-vip-service-slxus.ondigitalocean.app/api/external/competitions",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log('alkjdfklasdjf??????????')
    const currents = data.data;

    dispatch({ type: "onCompetitions", payload: currents });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const Logout = (dispatch) => async () => {
  // console.log("inside logout action >>>>>>>>>>>>>>>>>>>>>>>>>>")
  //  await AsyncStorage.removeItem("token");
  try {
    const body = JSON.stringify({});
    const {access_token: token} = await getCredentials()

    const config = { headers: { "Content-Type": "application/json", "Content-Type": "application/json", Authorization: "Bearer" + token,} };

    console.log("Before request")
    const response = await Vip.post("/api/external/auth/logout", body, config);
    console.log("After request")

    console.log("Before remvoing")
    await AsyncStorage.removeItem("keys");
    console.log("After removing")
    //  console.log("my token>>>>>>>>>0", response.data.access_token);
    //  const access = await response.data.access_token;
    dispatch({ type: "LOGOUT" });

    //  dispatch({ type: "RESTORE_TOKEN", payload: access });
    // navigation.navigate("Profile");
  } catch (err) {
    console.log("bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> logout", err.message);
    // alert("Invalid Credentials");
    dispatch({
      type: "ERROR",
      payload: "Invalid Credentials",
    });
  }

};
const onForgot =
  (dispatch) =>
    async ({ email, }) => {
      //  console.log(">?>?>", email, );
      const body = JSON.stringify({ email, });
      const config = { headers: { "Content-Type": "application/json" } };
      try {
        await Vip.post(
          "/api/external/auth/forgot-password",
          body,
          config
        );

        const data = await response.json();
        // navigation.navigate("Profile");
      } catch (err) {
        console.log("bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onforgot", err);
        alert("Invalid Credentials");
        dispatch({
          type: "ERROR",
          payload: "Invalid Credentials",
        });
      }
    };
const onReset =
  (dispatch) =>
    async ({ email }) => {
      //  console.log(">?>?>", email);
      const body = JSON.stringify({ email });
      const config = { headers: { "Content-Type": "application/json" } };
      try {
        const response = await Vip.post(
          "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/forgot-password",
          body,
          config
        );

        //  await AsyncStorage.setItem("token", response.data.access_token);
        await setCredentials({ access_token: response.access_token, refresh_token: response.refresh_token })

        //  console.log("my token>>>>>>>>>0", response.data.access_token);
        const access = await response.data.access_token;
        dispatch({ type: "LOGIN", payload: response.data });

        dispatch({ type: "RESTORE_TOKEN", payload: access });
        // navigation.navigate("Profile");
      } catch (err) {
        console.log("bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onreset", err);
        alert("Invalid Credentials");
        dispatch({
          type: "ERROR",
          payload: "Invalid Credentials",
        });
      }
    };



const onCheckInAffiliate = (dispatch) => async (id) => {
  // console.log("hiiiiiiiiiii");
  // console.log("Affiliate id: ", id)
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);

  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates/${id}/check-in`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
    const data = await response.json();

    // console.log("alkjdfklasdjf??????????");
    const currents = data.data;

    dispatch({ type: "onCheckInAffiliate", payload: currents });
    // console.log(data);
  } catch (err) {

    console.log("hello", err);
  }
};
const LoadToken = (dispatch) => async (tempPayload = null) => {

  let tempToken = null

  try {
    // token = await AsyncStorage.getItem("token");
    const { access_token: token } = await getCredentials()

    // console.log("TOKEN VALUE >>>>>>>>>>>>", token);
    if (token) {
      // navigation.navigate("Dull");
      // console.log("you are already loged in >>>>>>>>>>>>");
      tempToken = token
    } else {
      tempToken = null
    }
    // console.log("In Action TOKEN: >>>>>>>>>>>>>", tempToken)
    dispatch({ type: "LOADTOKEN", payload: tempPayload ? null : tempToken });
  } catch (error) {
    tempToken = null
    dispatch({ type: "LOADTOKEN", payload: tempToken });
    console.log("Error getting token >>>>>>>>>", error);
  }


}
const onEventsByClubs =
  (dispatch) =>
    async (Club = "") => {
      // let token = await AsyncStorage.getItem("token");
      const { access_token: token } = await getCredentials()

      //  console.log(".....................,mm,m", token);



      //  console.log("=========inside oneventsbyclubs action methos =================", Club)

      try {
        //  console.log("skdfjksdjfsdjfkds");
        const response = await fetch(
          `https://be-vip-service-slxus.ondigitalocean.app/api/external/events?affiliate=${Club}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer" + token,
            },
          }
        );
        const data = await response.json();

        //  console.log("alkjdfklasdjf??????????");
        const currents = data.data;

        dispatch({ type: "onEventsByClubs", payload: currents });
        //  console.log(data);
      } catch (err) {
        console.log("hello", err);
      }
    };

const clearEventsByClub = (dispatch) => () => {
  dispatch({ type: "clearEventsbyClub", payload: null })
}

const onFavProfile =
  (dispatch) =>
    async (search, type = "") => {
      // console.log("hiiiiiiiiiii");
      // let token = await AsyncStorage.getItem("token");
      const { access_token: token } = await getCredentials()

      // console.log(".....................,mm,m", token);

      try {
        // console.log("skdfjksdjfsdjfkds");
        const response = await fetch(
          `https://be-vip-service-slxus.ondigitalocean.app/api/external/affiliates?saved=${true}&type=${type}&search=${search}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer" + token,
            },
          }
        );
        const data = await response.json();

        // console.log("alkjdfklasdjf??????????");
        const currents = data.data;

        dispatch({ type: "onFavProfile", payload: currents });
        // console.log(data);
      } catch (err) {
        console.log("hello", err);
      }
    };

const clearFavProfile = (dispatch) => () => {
  dispatch({ type: "clearFavProfile", payload: null })
}

export const { Provider, Context } = DataContext(
  AuthReducer,
  {
    onSignin,
    // onCheckLogin,
    Logout,
    // restoreToken,
    onGetProfile,
    onProfile,
    onClub,
    clearClub,
    onNew,
    onForgot,
    onReset,
    onClubs,
    onUpdate,
    onEvents,
    onCompetitions,
    onAffiliate,
    onToggleSaveAffiliate,
    onEventByTowns,
    clearEventsByTowns,
    onUpdateImage,
    onCheckInAffiliate,
    LoadToken,
    clearEventsByClub,
    onEventsByClubs,
    clearOnProfile,
    onFavProfile,
    clearFavProfile,
  },
  { token: null, msg: null }
);