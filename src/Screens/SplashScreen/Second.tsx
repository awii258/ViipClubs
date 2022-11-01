import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { background } from 'native-base/lib/typescript/theme/styled-system'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from "@react-navigation/native";
const Second = () => {
    const navigation = useNavigation();
     setTimeout(() => {
       navigation.replace("Main");
     }, 2000);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#080402"
        barStyle="light-content"
      />
      <View style={{ alignSelf: "center", marginTop: 88 }}>
        <Image
          source={require("../../../assets/Image/Vip.png")}
          style={{ height: 173, width: 183 }}
        />
      </View>
      <View style={{marginTop:80,}}>
        <Image
          source={require("../../../assets/Image/card2.png")}
          style={{ height: 205, width: 305, alignSelf: "center" }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Second

const styles = StyleSheet.create({

    container:{
        flex:1,
        
      
        backgroundColor:'#080402',
        height:'100%'
    }


})