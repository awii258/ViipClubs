import {
  LOGIN,
  ERROR,
  PROFILE,
  RESTORE_TOKEN,
  LOGOUT,
  ONPROFILE,
  ONCLUB,
  PRO,
  FORPASSWORD,
  RESET,
  ONCLUBS,
  UPDATE,
  onEvents,
  onToggleSaveAffiliate,
  onCompetitions,
  onAffiliate,
  onEventByTowns,
  onUpdateImage,
  onCheckInAffiliate,
  LOADTOKEN,
  onEventsByClubs,
  clearClubType,
  clearEventsType,
  clearEventsByClubType,
  clearOnProfileType,
  onFavProfileType,
  clearFavProfileType,
  ONTEST,
  DELACCOUNT,
  REGISTER,
  VERIFY,
  onEventAffiliate,
  onEventCity ,
  ONMULTIPLE,
  onEventByType,
  VERIFYS,
  onIbiza,
  ONEUROPE,
  REFRESH
} from "./Types";
import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-community/async-storage'

const AuthReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(action);
  switch (type) {
    // case RESTORE_TOKEN:
    //   return { ...state, token: payload };
    case LOGIN:
      return {
        ...state,

        token: payload,
      };
      // case REFRESH:
      //   return {
      //     ...state,
  
      //     token: payload,
      //   };
      case REGISTER:
        return {
          ...state,
  
          reg: payload,
        };
    case FORPASSWORD:
      return {
        ...state,

        token: payload,
      };
     case  VERIFYS:
      return {
        ...state,
        verify:payload
      }
    case RESET:
      return {
        ...state,

        token: payload,
      };

    case PROFILE:
      return {
        ...state,

        user: payload,
      };
      case  DELACCOUNT:
        return {
          ...state,
  
          del: payload,
        };
    case PRO:
      return {
        ...state,

        pro: payload,
      };
    case ONPROFILE:
      return {
        ...state,

        users: payload,
      };

    case onFavProfileType:
      return {
        ...state,
        favAffiliates: payload,
      };

    case clearFavProfileType:
      return {
        ...state,
        favAffiliates: null,
      };

    case clearOnProfileType:
      return {
        ...state,
        users: null,
      };
    case ONCLUB:
      return {
        ...state,

        club: payload,
      };
    case ONTEST:
      return {
        ...state,

        test: payload,
      };
    case clearClubType:
      return {
        ...state,
        club: null,
      };
    case ONCLUBS:
      return {
        ...state,

        clubs: payload,
      };
    case RESTORE_TOKEN:
      return {
        ...state,

        token: payload,
      };
    case LOGOUT:
      return {
        ...state,

        token: null,
      };
     

    case ERROR:
      return {
        ...state,
        msg: payload,
      };
    case UPDATE:
      return {
        ...state,
        msg: payload,
      };
    case onUpdateImage:
      return {
        ...state,
        msg: payload,
      };
    case onEvents:
      return {
        ...state,
        events: payload,
      };
    case onCompetitions:
      return {
        ...state,
        competition: payload,
      };
    case onCheckInAffiliate:
      return {
        ...state,
        competition: payload,
      };
    case onAffiliate:
      return {
        ...state,
        towns: payload,
      };
      case onIbiza:
      return {
        ...state,
        ibiza: payload,
      };
    case onEventAffiliate:
      return {
        ...state,
        eventTowns: payload,
      };
     
    case onToggleSaveAffiliate:
      return {
        ...state,
        toggle: payload,
      };
    case onEventByTowns:
      return {
        ...state,
        eventTown: payload,
      };
      case onEventByType:
      return {
        ...state,
        eventType: payload,
      };
    case clearEventsType:
      return {
        ...state,
        eventTown: null,
      };
    case onEventsByClubs:
      return {
        ...state,
        eventClub: payload,
      };

    case clearEventsByClubType:
      return {
        ...state,
        eventClub: null,
      };
    case LOADTOKEN:
      return {
        ...state,

        loadtoken: payload,
      };
     
      case VERIFY:
      return {
        ...state,

        verify: payload,
      };
      case  onEventCity:
        return {
          ...state,
          cityEvents: payload,
        };
        case  ONMULTIPLE:
          return {
            ...state,
            multiple: payload,
          };
          case  ONEUROPE:
            return {
              ...state,
              europe: payload,
            };
        
    default:
      return state;
  }
};
// const saveToken = async (token) => {
//   await SecureStore.setItemAsync("token", `Bearer ${token}`);
//   if (token) {
//     console.log("🔐 Here's your value 🔐 \n" + token);
//   } else {
//     alert("No values stored under that key.");
//   }
// };
// async storeToken(accessToken){
//     try{
//       await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
//       this.getToken();
//     }catch (error){
//       console.log("something where wrong")
//     }
//   }

const clearStorage = async () => {
  await AsyncStorage.clear();
};

export default AuthReducer;
