import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EvilIcons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();
  return (
    <View style={{marginRight:30}}>
      <TouchableOpacity onPress={()=> navigation.navigate("Srch")}>
        <EvilIcons name="search" size={24} color="#927E5A" />
      </TouchableOpacity>
    </View>
  );
}

export default Search

const styles = StyleSheet.create({})