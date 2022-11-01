import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

// export default class GeoLocation extends React.Component{

//     state={
//         location:{},
//         errorMessage:''
//     }

//     componentWillMount(){
//         this._getLocation();
//     }

//     _getLocation = async() =>{
//         const {status} = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);

//         if(status !== 'granted'){
//             console.log("PERMISSION NOT GRANTED");

//             this.setState({
//                 errorMessage:"PERMISSION NOT GRANTED"
//             })
//         }
//         const location = await Location.getCurrentPositionAysnc();

//         this.setState({
//             location
//         })
//     }

//     render(){
//         return (
//             <View>
//               <Text>GeoLocation :  {JSON.stringify(this.state.location)}</Text>
//             </View>
//           )
//     }
// }

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      //text = JSON.stringify(location);
 text=location
      // console.log("Location==========================================>>>>>>>>>>",typeof(text));

// console.log("Location Text--------------------------------------",text)      
    }
  
    return (
      <View style={styles.container}>
        <Text style={{color:"white", fontSize:15}}>{JSON.stringify(text)}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({})