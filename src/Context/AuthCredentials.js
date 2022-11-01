import AsyncStorage from "@react-native-async-storage/async-storage";


import jwt_decode from 'jwt-decode'




async function getAccessUsingRefresh (refreshToken) {

  return fetch("https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/refresh", {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: {
      token: JSON.stringify(refreshToken)
    }
  }).then(res => res.json())
}

async function getVerifiedKeys (keys) {
  console.log('Loading keys from storage')

  if (keys) {
    console.log('checking access')

    if (!isTokenExpired(keys.access_token)) {
      console.log('returning access')

      return keys
    } else {
      console.log('access expired')

      console.log('checking refresh expiry')

      if (!isTokenExpired(keys.refresh_token)) {
        console.log('fetching access using refresh')

        const response = await getAccessUsingRefresh(keys.refresh_token)

        await AsyncStorage.setItem('keys', JSON.stringify({access_token: response.data.access_token, refresh_token: response.data.refresh_token}))

        console.log('UPDATED ONE')

        return response
      } else {
        console.log('refresh expired, please login')

        return null
      }
    }
  } else {
    console.log('access not available please login')

    return null
  }
}

function isTokenExpired (token) {
  var decoded = jwt_decode(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}

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


    let cred = await getVerifiedKeys(JSON.parse(credentials))

    console.log("Showing credentials: ", cred)


    if (credentials != null && cred != null) {
      return cred
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
  }

  return null
}