import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const First = () => {
    const navigation = useNavigation();
     setTimeout(() => {
       navigation.replace("Main");
     }, 8000);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#080402"
        barStyle="light-content"
      />
     
      <Image 
                
        source={require("../../../assets/Image/sp.png")} 
        style={{width:321,height:263,alignSelf:'center'}}       />
    </View>
  );
};

export default First;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#080402",
    height: "100%",
    justifyContent:'center',
  
  },
});
