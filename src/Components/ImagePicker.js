import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ alignSelf: "center" }}>
      <Image
        source={
          image ? { uri: image } : require("../../assets/Image/Vip.png")
        }
        style={styles.imgContainer}
      />
      <View style={{ top: -45, left: 80 }}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
            source={require("../../assets/Image/Vip.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    height: 120,
    width: 120,
    borderRadius: 360,
    alignSelf: "center",
    marginTop: hp("4"),
    margin: 12,
  },
});
