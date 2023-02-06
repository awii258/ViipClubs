import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


import jwt_decode from 'jwt-decode'




async function getAccessUsingRefresh(keys) {

  const config = { headers: { "Content-Type": "application/json" } };

  console.log("token check before take request: ", keys.access_token)
  if (isTokenExpired(keys.access_token)) {
    try {
      const body = {
        token: keys.refresh_token
      }
      console.log('old keys: ', await AsyncStorage.getItem("keys"))



      const response = await axios.post('https://service.manage.be-vip.com/api/external/auth/refresh', body, config)
      console.log("instant showing response: ", response)
      if (response.data.access_token) {
        console.log("updating keys >>>>>>>>>>>>>>>>>>>>")
        await AsyncStorage.setItem('keys', JSON.stringify({ access_token: response.data.access_token, refresh_token: response.data.refresh_token }))
        console.log('new keys: ', await AsyncStorage.getItem("keys"))
      }


      return response.data



    } catch (error) {
      return error.message || "internal server error"
    }

  } else {
    return keys
  }




  // return fetch("https://service.manage.be-vip.com/api/external/auth/refresh", {
  //   method: 'POST',
  //   headers: {
  //     Accept: "application/json",
  //     'Content-Type': 'application/json',
  //     Authorization: keys.access_token
  //   },
  //   body: {
  //     token: JSON.stringify(keys.refresh_token)
  //   }
  // }).then(res => res.json()).catch(err => err.message)
}

async function getVerifiedKeys(keys) {
  console.log('Loading keys from storage')

  if (keys) {
    console.log('checking access')

    if (!isTokenExpired(keys.access_token)) {
      console.log('returning access')
      return keys
    } else {
      console.log('access expired')

      console.log('checking refresh expiry')


      console.log('fetching access using refresh')

      const response = await getAccessUsingRefresh(keys)
      console.log("getaccessusingrefresh response: ", response.data)

      if (response && response.data && response.data.access_token) {


        return response.data
      } else {
        if (response.includes("401")) {
          console.log("inside 401 function response: ", response)
          return "401"
        } else {
          console.log("inside null function response: ", response)

          return null
        }
      }




    }
  } else {
    console.log('access not available please login')

    return null
  }
}

function isTokenExpired(token) {
  var decoded = jwt_decode(token)
  // return true
  // Date.now() / 1000
  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}

// function isTokenExpired2(token) {
//   var decoded = jwt_decode(token)
//   // return true

//   if (decoded.exp < Date.now() / 1000) {
//     return true
//   } else {
//     return false
//   }
// }

export const setCredentials = async keys => {
  try {
    console.log("Inputing credentials: ", keys)
    await AsyncStorage.setItem('keys', JSON.stringify(keys))
  } catch (e) {
    console.log(e)
  }
}

export const getCredentials = async () => {
  try {
    let credentials = await AsyncStorage.getItem('keys')
    const jsonCredentials = JSON.parse(credentials)

    console.log("showing json credentials: ", jsonCredentials)

    if (jsonCredentials.access_token && jsonCredentials.refresh_token) {
      console.log("checking token expiry upper: ", isTokenExpired(jsonCredentials.access_token))
      const isExpired = isTokenExpired(jsonCredentials.access_token)
      if (!isExpired) {
        return jsonCredentials
      } else {
        console.log("token expired")

        const newTokenResponse = await getAccessUsingRefresh(jsonCredentials)

        console.log("newTokenResponse: ", newTokenResponse)
        if (newTokenResponse.access_token && newTokenResponse.refresh_token) {
          return newTokenResponse
        } else {
          if (newTokenResponse.includes("401")) {
            const newCredentials = await AsyncStorage.getItem('keys')
            const jsonNewCredentials = JSON.parse(newCredentials)
            console.log("showing new Credentials inside 401: ", jsonNewCredentials)
            console.log("checking token expiry inner: ", isTokenExpired(jsonNewCredentials.access_token))
            // const isNotValid = isTokenExpired(jsonNewCredentials.access_token)
            if (!isTokenExpired(jsonNewCredentials.access_token)) {
              return jsonNewCredentials
            } else {
              return null
            }

          } else {
            console.log("else of 401")
            return null
          }
        }

      }
    } else {
      console.log("overall else")
      return null
    }

  } catch (e) {
    console.log("could not get token getcredentialsfunction: ", e)
    return null

  }

}