
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataContext from "./DataContext";
import AuthReducer from "./AuthReducer";
import {
  useNavigation,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";


import Vip from "../Context/Vip"
import { ERROR, ONLOGOUT } from './Types'
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { setCredentials, getCredentials } from './AuthCredentials'
// import axios from 'axios'



const onSignin =

  (dispatch) =>

    async ({ email, password }) => {
      console.log(">?>?>",email,password)
     
      // console.log("remememme",abc)
      
      const body = JSON.stringify({ email, password })
      const config = { headers: { "Content-Type": "application/json" } };
      // const rememberMeSetting = await AsyncStorage.getItem("remember-me");
      // const abc =JSON.parse(rememberMeSetting)
      // if(abc === true){
      //   await AsyncStorage.setItem("lase-user-email", email);}
      //   if(abc === true){
      //   await AsyncStorage.setItem("user-password", password);}
   
     
      try {
        const response = await Vip.post("/api/external/auth/login", body, config);
        // await AsyncStorage.setItem("lase-user-email",JSON.stringify(email));
        // await AsyncStorage.setItem("token",response.data.access_token);
        await setCredentials({ access_token: response.data.access_token, refresh_token: response.data.refresh_token })
        // console.log("emaillllllllllllll",email)
        // console.log("my token>>>>>>>>>0", response.data.access_token);
        const access = await JSON.stringify(response.data.refresh_token)
        console.log("hello tis is accesssss",access)
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
    // const onRefresh =

    // (dispatch) =>
  
    //   async () => {
 
       
    //     // console.log("remememme",abc)
    //     // const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2VydmljZS5tYW5hZ2UuYmUtdmlwLmNvbVwvYXBpXC9leHRlcm5hbFwvYXV0aFwvbG9naW4iLCJpYXQiOjE2NzUyNDEwMzIsImV4cCI6MTY3NTI0NDYzMiwibmJmIjoxNjc1MjQxMDMyLCJqdGkiOiJnaDNrR1RPc2s2eHZUVm9EIiwic3ViIjoxMiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.DYsStJ5c-7dmHQefvT6KztH9yfizvN6TCg6Pc6px6HY"
    //     const body =JSON.stringify("0a47fa80d1450b42c182e41b4250fad747a5b624")
    //     const config = { headers: {   Accept: 'application/json',"Content-Type": "application/json" } };
    //     const { refresh_token: token } = await getCredentials()
       
    //     try {
    //       const response = await fetch(
    //         "https://service.manage.be-vip.com/api/external/auth/refresh",
    //         {
    //           method: "POST",
             
    //           headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
              
    //           },
    //           body: {
    //             token:JSON.stringify(token) ,
               
    //           },
    //         }
    //       );
    //       let json = await response.json()
    //     console.log("hello tihsihsdhfisdfh",json )
    //       //  console.log("emaillllllllllllll", email);
    //       //  console.log("my token>>>>>>>>>0", response.data.access_token);
    //       //  const access = await response.data.access_token;
    //       // console.log("After successfully updating image >>>>>>>>>>>>>>>>>>>", response)
    //       //  dispatch({ type: "onUpdateImage", payload: response.data });
  
    //       // navigation.navigate("Profile");
    //     } catch (err) {
    //       console.log("bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>on update image", err.message);
    //       alert("Invalid Credentials", err.message);
    //       dispatch({
    //         type: "ERROR",
    //         payload: "Invalid Credentials",
    //       });
    //     }
    //   };

const verifyButton = (dispatch)=> (Value)=>
{
 dispatch({ type: "VERIFYS", payload:Value  });
}


const onUpdate =
  (dispatch) =>
  
    async ({ first, last, email,phone,location, date,destination }) => {
      console.log(">?>?>", first,last,email,location,date,destination);
      const body = {
        first_name: first,
        last_name: last,
        email,
        phone,
        location,
        date_of_birth: date,
        destination_id: destination,
      }
      const { access_token: token } = await getCredentials()
      console.log("token111",token)
      // const body = new FormData()
      const config = { headers: { "Content-Type": "application/json",  Authorization: "Bearer" + token,} };
      try {
        const response =  await axios.put("https://service.manage.be-vip.com/api/external/auth/me",body,config)


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
          "https://service.manage.be-vip.com/api/external/auth/image",
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
      "https://service.manage.be-vip.com/api/external/auth/me",
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
      "https://service.manage.be-vip.com/api/external/auth/me",
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
    const userType = data.data.tier.name || ""
    console.log("user type: ", userType)

    await AsyncStorage.setItem("user-type", userType);
    const current = data;
    dispatch({ type: "PRO", payload: current });
    // console.log(data);
  } catch (err) {
    console.log("hello", err);
    // alert(`actions failed: ${err || err.message}`)
  }
};
const onProfile = (dispatch) => async (search, type = "", town = "", page='', pageLength="") => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);



  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://service.manage.be-vip.com/api/external/affiliates?town=${town}&type=${type}&search=${search}&page=${page}&length=${pageLength}`,
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
console.log("current user ",currents)
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
      `https://service.manage.be-vip.com/api/external/affiliates/${id}/toggle`,
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

const onAffiliate = (dispatch) => async (search = "",page='',length='',screen="",affiliate="club",) => {
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
      `https://service.manage.be-vip.com/api/external/towns?search=${search}&page=${""}&length=${1000}&affiliateType=${affiliate}&eventType${""}&affiliateCountry=${"United Kingdom"}&eventCountry${""}`,
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

    if(screen === "clubs"){
    dispatch({ type: "onAffiliate", payload: currents });

    }else{
    dispatch({ type: "onEventAffiliate", payload: currents });

    }




    // console.log(data);
  } catch (err) {
    console.log("hello", err);
  }
};

const onAffiliates = (dispatch) => async (search = "",affiliate="club",) => {
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
      `https://service.manage.be-vip.com/api/external/towns?search=${search}&page=${""}&length=${1000}&affiliateType=${affiliate}&eventType${""}&affiliateCountry=${"Europe"}&eventCountry${""}`,
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
    const currents= data.data;
console.log("hello>>>>>>>>>>>>>>>>>>",currents)

    dispatch({ type: "onIbiza", payload: currents});

   




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
      `https://service.manage.be-vip.com/api/external/events?town=${town}&type=${"Affiliate Event"}&length=${1000}`,
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
// const onEventByType = (dispatch) => async (page= "",length = "",from = "",to = "", types,affiliate = "",eventtype,search = "") => {
//   // let token = await AsyncStorage.getItem("token");
//   const { access_token: token } = await getCredentials()

//   // console.log(".....................,mm,m", token);


//   try {
//     console.log("skdfjksdjfsdjfkds");
//     const response = await fetch(
//       `https://be-vip-service-slxus.ondigitalocean.app/api/external/events?page=${page}&pagelength=${length}&from=${from}&to=${to}&town=${types}&affiliate=${affiliate}&type=${eventtype}&search=${search}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer" + token,
//         },
//       }
//     );
//     const data = await response.json();

//     // console.log('alkjdfklasdjf??????????')
//     const currentsss = data.data;
// console.log("hello ia am new event",currentsss)
//     dispatch({ type: "onEventByType", payload: currentsss });
//     // console.log(data);
//   } catch (err) {
//     console.log("hello", err);
//   }
// };


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
      `https://service.manage.be-vip.com/api/external/affiliates/${call}`,
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
      `https://service.manage.be-vip.com/api/external/affiliates?town=${citys}`,
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
      "https://service.manage.be-vip.com/api/external/events",
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



const onCompetitions = (dispatch) => async (search,page = " ",length = " ") => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  // const {access_token: token} = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    const { access_token: token } = await getCredentials()

    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://service.manage.be-vip.com/api/external/competitions?page=${page}&pagelength=${1000}&search=${search}`,
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
const Logoutfordel = (dispatch) => async () => {
  // console.log("inside logout action >>>>>>>>>>>>>>>>>>>>>>>>>>")
  //  await AsyncStorage.removeItem("token");
  try {
    const body = JSON.stringify({});
    const {access_token: token} = await getCredentials()

    const config = { headers: { "Content-Type": "application/json", "Content-Type": "application/json", Authorization: "Bearer" + token,} };

    console.log("Before request")
    // const response_del = await Vip.delete("/api/external/auth/me", body, config);

    // const response = await Vip.post("/api/external/auth/logout", body, config);



    const response_for_del = await fetch(
      "https://service.manage.be-vip.com/api/external/auth/me",
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        },
      }
    );
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
          "https://service.manage.be-vip.com/api/external/auth/forgot-password",
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
      `https://service.manage.be-vip.com/api/external/affiliates/${id}/check-in`,
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
    async (Club = "",) => {
      console.log("hello action id",Club)
      // let token = await AsyncStorage.getItem("token");
      const { access_token: token } = await getCredentials()

      //  console.log(".....................,mm,m", token);



      //  console.log("=========inside oneventsbyclubs action methos =================", Club)

      try {
        //  console.log("skdfjksdjfsdjfkds");
        const response = await fetch(
          `https://service.manage.be-vip.com/api/external/events?affiliate=${Club}&type=${"Affiliate Event"}&length=${1000}`,
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
          `https://service.manage.be-vip.com/api/external/affiliates?saved=${true}&type=${type}&search=${search}`,
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
const onTest =
  (dispatch) =>
  async (type = "", town = "") => {
    console.log("town", town);
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

    let call = await AsyncStorage.getItem("id");
    // console.log("hilllkillllkill",call)

    // let token = await AsyncStorage.getItem("token");
    const { access_token: token } = await getCredentials();

    // console.log(".....................,mm,m", token);

    try {
      // console.log("skdfjksdjfsdjfkds");
      const response = await fetch(
        `https://service.manage.be-vip.com/api/external/affiliates?town=${town}&type=${"club"}`,
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
      const currentsss = data.data;
      // const Curren = Object.assign({}, data.data);
      dispatch({ type: "ONTEST", payload: currentsss });
      console.log("hellllllllllllllllllll???????????????", currentsss);
    } catch (err) {
      console.log("hello", err);
    }
  };
  const onSignUP=

  (dispatch) =>

    async (formdata) => {
      
      const body = {
        first_name: formdata.fullName,
        last_name:formdata.lastName,
        email:formdata.email,
        phone:formdata.phone,
        location:formdata.location,
        date_of_birth: formdata.dateOfBirth,
        facebook:"",
        twitter:"",
        instagram:"",
        password:formdata.password,
        account_url:"https://be-vip.com/subscription/#/login"
      }
      const config = { headers: { "Content-Type": "application/json" } };
      try {
        
        const response = await axios.post("https://service.manage.be-vip.com/api/external/auth/register",body,config)

        console.log("After success", response)
   
        setCredentials({ access_token: response.data.access_token, refresh_token: response.data.refresh_token })
   
    
        const access = await response.data.access_token
        dispatch({ type: "LOGIN", payload: response.data });

    
      } catch (err) {
        console.log('bugs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>signUp', err)
        alert("Invalid Credentials");
        dispatch({
          type: "ERROR",
          payload: "Invalid Credentials",
        });
      }
    }
    const onVerify = (dispatch) => async () => {
   
      const { access_token: token } = await getCredentials()
      console.log("Verifying token: ", token)
    
  
    
      try {
      
        const response = await fetch(
          "https://service.manage.be-vip.com/api/external/auth/me",
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
        const verifydata = data;
        dispatch({ type: "VERIFY", payload: verifydata});
        // console.log(data);
      } catch (err) {
        console.log("hello", err);
        // alert(`actions failed: ${err || err.message}`)
      }
    };
    
const onEventTown = (dispatch) => async (town = "",page= "",search = " ") => {
 

  const { access_token: token } = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://service.manage.be-vip.com/api/external/affiliates?town=${town}&type=${"Restaurant"}&search=${search}&page=${page}&length=${1000}`,
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
    const c = data.data;

   console.log("currents affairs",c)
   

   
    dispatch({ type:"onEventCity", payload: c });

   } catch (err) {
    console.log("hello", err);
  }
};
const onMultiple = (dispatch) => async (page="",length="",search = "",type = "bar",types ) => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  // const {access_token: token} = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    const { access_token: token } = await getCredentials()

    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://service.manage.be-vip.com/api/external/towns?page=${page}&length=${1000}&search=${search}&affiliateType=${"Restaurant"}&eventType=${""}&affiliateCountry=${"United Kingdom"}&eventCountry${""}`,
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
    const cu = data.data;
// console.log("multiple data ",currents)
    dispatch({ type: "ONMULTIPLE", payload: cu });
    // console.log(data);
  } catch (err) {
    console.log("hello MUltiple", err);
  }
};
const OnEUROPE = (dispatch) => async (page="",length="",search = "",type = "Restaurant",types ) => {
  // console.log("hiiiiiiiiiii");
  // let token = await AsyncStorage.getItem("token");
  // const {access_token: token} = await getCredentials()

  // console.log(".....................,mm,m", token);


  try {
    const { access_token: token } = await getCredentials()

    // console.log("skdfjksdjfsdjfkds");
    const response = await fetch(
      `https://service.manage.be-vip.com/api/external/towns?page=${page}&length=${1000}&search=${search}&affiliateType=${"Restaurant"}&eventType=${""}&affiliateCountry=${"Europe"}&eventCountry${""}`,
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
    const awaiz = data.data;
    console.log("hello this is work",awaiz)
// console.log("multiple data ",currents)
    dispatch({ type: "ONEUROPE", payload: awaiz});
    // console.log(data);
  } catch (err) {
    console.log("hello MUltiple", err);
  }
};
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
    onTest,
    onSignUP,
    Logoutfordel,
    onVerify,
    onEventTown,
    onMultiple, 
    verifyButton,
    onAffiliates,
    OnEUROPE,
   
    },
  { token: null, msg: null }
);