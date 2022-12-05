import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Context as Actions } from "../Context/Actions";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const { state, onProfile, Logout, onClub } = useContext(Actions);
  const g = state.club;

  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <Ionicons name="location" size={30} color="#927E5A" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
