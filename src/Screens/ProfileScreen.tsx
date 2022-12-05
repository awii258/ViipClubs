import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SelectList from "react-native-dropdown-select-list";
import DatePicker from "react-native-datepicker";
import { Picker } from "@react-native-picker/picker";
import DocumentPicker from "react-native-document-picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Context as Actions } from "../Context/Actions";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import DropDownPicker from "react-native-dropdown-picker";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePickerExample from "../Components/ImagePicker";
type Stack = {
  Login: undefined;
  Splash: undefined;
  Person: undefined;
  Res: undefined;
  Tabs: undefined;
  Du: undefined;
  Dull: undefined;
};
const Stack = createNativeStackNavigator<Stack>();

type NavigationLoginProps = NativeStackScreenProps<Stack, "Login">;

type LoginScreenProps = {
  navigation: NavigationLoginProps["navigation"];
};
// const { state, onGetProfile } = useContext(Actions);
// const endPoint =
//   "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/me";
// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iZS12aXAtc2VydmljZS1zbHh1cy5vbmRpZ2l0YWxvY2Vhbi5hcHBcL2FwaVwvZXh0ZXJuYWxcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjUwNDUwNjQwLCJleHAiOjE2NTA0NTQyNDAsIm5iZiI6MTY1MDQ1MDY0MCwianRpIjoiVUpWaFNlYU45NFBqM3dkaiIsInN1YiI6MywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bZzhRAyVDVKmXAKdAHz7_VKFOW5EqbsAvR4BEMFEtUM";
const ProfileScreen = ({ navigation }: LoginScreenProps) => {
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    onGetProfile();
    // console.log("hi");
  }, [onGetProfile]);
  const { state, onGetProfile, Logout, onUpdate, onUpdateImage, LoadToken } =
    useContext(Actions);
  // console.log("................>>>>>", state.user);

  const [first, setFirst] = useState(state.user?.data.first_name);
  const [destination, setDestination] = useState(state.user?.data.destination);
  const [last, setLast] = useState(state.user?.data.last_name);
  const [location, setLocation] = useState(state.user?.data.location);
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(state.user?.data.date_of_birth);
  const [email, setEmail] = useState(state.user?.data.email);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [encodedImage, setEncodedImage] = useState<any>();
  const [date1, setDate1] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  console.log("hello awaiz how are you", state.user?.data.last_name);
  const data = [
    { value: `${state.user?.data.destination}` },
    { value: "destination" },
    { value: "destination" },
  ];

  // console.log("********************************** dropdown destination", destination);

  const [singleFile, setSingleFile] = useState(null);
  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append("name", "Image Upload");
      data.append("file_attachment", fileToUpload);
      // Please change file upload URL
      let res = await fetch(
        "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/image",
        {
          method: "post",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        Alert.alert("Upload Successful");
      }
    } else {
      // If no file selected the show alert
      Alert.alert("Please Select File first");
    }
  };
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      //  console.log("res : " + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        Alert.alert("Canceled");
      } else {
        // For Unknown Error
        Alert.alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };
  // const { state, onLogout } = useContext(GG);

  const a = (ab: any) => {
    if (ab == "male") {
      setMale(true);
      setFemale(false);
    }
    if (ab == "female") {
      setMale(false);
      setFemale(true);
    }
  };

  const [image, setImage] = useState("");

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
    // console.log("inside pic image")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true
    });

    // console.log("Showing result of image: ",result);

    // console.log("just outside if")
    if (!result.cancelled) {
      // console.log('>>>>>>>>>>inside if>>>>>>>>>>>')
      // try{
      //   // ImagePicker saves the taken photo to disk and returns a local URI to it
      //   let localUri = result.uri;
      //   let filename_ = localUri.split("/").pop();

      //   // Infer the type of the image
      //   let match = /\.(\w+)$/.exec(filename_);
      //   let type = match ? `image/${match[1]}` : `image`;

      //   // Upload the image using the fetch and FormData APIs
      //   let formData = new FormData();
      //   // Assume "photo" is the name of the form field the server expects
      //   formData.append("image", { uri: localUri, name: filename_, type });

      //     let res = await fetch(
      //       "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/image",
      //       {
      //         method: "post",
      //         body: formData,
      //         headers: {
      //           Accept: "application/json",
      //           "Content-Type": "multipart/form-data",
      //         },
      //       }
      //     );
      //    console.log("successfully upload image: ", res)
      // }catch(error){
      //   console.log("Could not upload image: ", error)
      // }
      // console.log(">>>>>>>>>>>>>>>>>> outside try block >>>>>>>>>>>>>>>>>")
      setImage(result.uri);

      // const formBody = new FormData()
      // formBody.append("image", blob)
      // try{
      //   let res = await fetch(
      //     "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/image",
      //     {
      //       method: "post",
      //       body: formBody,
      //       headers: {
      //         "Accept": "application/json",
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //  console.log("successfully upload image: ", res)
      // }catch(error){
      //   console.log("could not upload image: ", error)

      // }
    }
  };

  const updateImage = async (image) => {
    // console.log("inside update image function")
    // console.log("image uri: ", image)
    try {
      let localUri = image;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append("image", { uri: localUri, name: filename, type });
      // console.log("Successfully stored in formdata: ", formData);
      onUpdateImage(formData);
      // let res = await fetch(
      //   "https://be-vip-service-slxus.ondigitalocean.app/api/external/auth/image",
      //   {
      //     method: "POST",
      //     body: formData,
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      // console.log("After Successfully updated image: ", res)
    } catch (error) {
      console.log("could not create blob: ", error);
    }
  };

  useEffect(() => {
    if (image) {
      // console.log("image changes")
      updateImage(image);
    }
  }, [image]);

  const LogoutHandler = () => {
    // console.log("inside logout handler >>>>>>>>>>>>>>>>>>");
    Logout();
    LoadToken("xyz");
    navigation.navigate("Home");
    // console.log("End of logout handler >>>>>>>>>>>>>>>>>>>");
  };

  return (
    <>
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.textImageContainer}>
              <View
                style={{
                  elevation: 5,
                  shadowColor: "#927E5A",
                  shadowOffset: { width: 3, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 30,
                  left: -15,
                }}
              >
                <Image
                  resizeMode="cover"
                  source={
                    image ? { uri: image } : { uri: state.user?.data.image }
                  }
                  style={styles.imageContainer}
                />
              </View>

              <TouchableOpacity style={styles.buttonDesign} onPress={pickImage}>
                <Text style={styles.textStyle}>Change Picture</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  color: "#927E5A",
                  fontSize: 13,
                  fontFamily: "OpenSansRegular",
                  marginLeft: 12,
                }}
              >
                {" "}
                Name
              </Text>
              <TextInput
                style={styles.input}
                editable={true}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                selectionColor={"#927E5A"}
                value={first}
                onChangeText={setFirst}
              />
            </View>

            <View>
              <Text
                style={{
                  color: "#927E5A",
                  fontSize: 13,
                  fontFamily: "OpenSansRegular",
                  marginLeft: 12,
                }}
              >
                {" "}
                Surname
              </Text>
              <TextInput
                style={styles.input}
                editable={true}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                selectionColor={"#927E5A"}
                onChangeText={setLast}
                value={last}
              />
            </View>

            <View>
              <Text
                style={{
                  color: "#927E5A",
                  fontSize: 13,
                  fontFamily: "OpenSansRegular",
                  marginLeft: 12,
                }}
              >
                {" "}
                Location
              </Text>
              <TextInput
                style={styles.input}
                editable={true}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={location}
                selectionColor={"#927E5A"}
                onChangeText={setLocation}
              />
            </View>
            <Text
              style={{
                color: "#927E5A",
                fontSize: 13,
                fontFamily: "OpenSansRegular",
                marginLeft: 12,
              }}
            >
              {" "}
              DOB
            </Text>
            <View style={styles.input}>
           
       
   

              <DatePicker
                style={styles.datePickerStyle}
                date={date} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Date of  Birth"
                format="DD-MM-YYYY"
                minDate="01-01-1950"
                maxDate="01-01-2025"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={
                  <MaterialIcons
                    name="date-range"
                    size={24}
                    color="#927E5A"
                    style={{
                      flex: 1,
                      // flexDirection:"row",
                      // backgroundColor:"yellow",
                      alignSelf: "flex-start",
                      textAlign: "right",
                      marginRight: 20,
                      // justifyContent:"flex-end"
                      // position: "absolute",
                      // right: wp("5%"),
                      // top: hp("-0.1%"),
                      // top: 4,
                      // right: 20,
                    }}
                  />
                }
                customStyles={{
                  // dateIcon: {
                  //   //display: 'none',

                  //   position: "absolute",

                  //   top: 4,
                  //   left: 0,
                  // },
                  dateInput: {
                    // marginLeft: 15,
                    // borderColor: "#927E5A",
                    borderWidth: 0,
                  },
                  placeholderText: {
                    color: "#927E5A",
                    position: "absolute",

                    top: 7,
                    left: 10,
                  },
                  dateText: {
                    color: "#927E5A",
                    position: "absolute",

                    top: 7,
                    left: 10,
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
            </View>
            <View>
              {/* <Text style={{ backgroundColor: "white", fontSize: 30 }}>Awaiz</Text> */}
              <Text
                style={{
                  color: "#927E5A",
                  fontSize: 13,
                  fontFamily: "OpenSansRegular",
                  marginLeft: 12,
                }}
              >
                {" "}
                Email
              </Text>
              <TextInput
                style={styles.input}
                editable={true}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                selectionColor={"#927E5A"}
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <Text
              style={{
                color: "#927E5A",
                fontSize: 13,
                fontFamily: "OpenSansRegular",
                marginLeft: 12,
              }}
            >
              {" "}
              Destination
            </Text>

            <View style={{ marginTop: 10 }}>
              <SelectList
                // onSelect={() => alert(selected)}
                placeholder={`${state.user?.data.destination}`}
                inputStyles={{ color: "#927E5A" }}
                setSelected={`${state.user?.data.destination}`}
                data={data}
                arrowicon={
                  <FontAwesome
                    name="chevron-down"
                    size={12}
                    color={"#927E5A"}
                  />
                }
                search={false}
                dropdownTextStyles={{ color: "#927E5A" }}
                boxStyles={{
                  borderRadius: 0,
                  width: "92%",
                  alignSelf: "center",
                  borderColor: "#927E5A",
                  height: 51,
                  alignItems: "center",
                }} //override default styles
                dropdownStyles={{
                  borderRadius: 0,
                  width: "92%",
                  alignSelf: "center",
                  borderColor: "#927E5A",
                  top: -10,
                }}
              />
            </View>
            {/* <View>
          <DropDownPicker
            items={[
              { label: "Item 1", value: "item1" },
              { label: "Item 2", value: "item2" },
            ]}
            defaultValue="item 1"
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fafafa" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => console.log(item.label, item.value)}
            
          />
        </View> */}

            <View>
              <TouchableOpacity
                style={[
                  styles.buttonDesign,
                  {
                    backgroundColor: "#927E5A",
                    width: 280,
                    margin: 20,
                    marginTop: hp("4%"),
                  },
                ]}
                onPress={() => {
                  {
                    onUpdate({
                      first,
                      last,
                      email,
                      date,
                      destination,
                      image,
                      encodedImage,
                    });
                    navigation.navigate("Dull");
                  }
                }}
              >
                <Text style={[styles.textStyle, { color: "#000000" }]}>
                  Save{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonDesign,
                {
                  backgroundColor: "#927E5A",
                  width: 280,
                  // marginTop: hp("12%"),
                },
              ]}
              onPress={LogoutHandler}
            >
              <Text style={[styles.textStyle, { color: "#000000" }]}>
                Logout
              </Text>
            </TouchableOpacity>

            <View style={{ alignSelf: "center", marginTop: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate("Res");
                  }
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { textDecorationLine: "underline", color: "#FFFFFF" },
                  ]}
                >
                  Reset My Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080402",
    borderTopWidth: 1,
    borderTopColor: "#927E5A",
  },
  input: {
    margin: 15,
    height: 51,
    borderColor: "#927E5A",
    fontFamily: "OpenSansRegular",
    padding: 10,
    color: "#927E5A",
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "#080402",
    // backgroundColor:"yellow",
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
  },
  textImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
  },
  imageContainer: {
    width: 118,
    height: 118,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#927E5A",
  },
  buttonDesign: {
    backgroundColor: "#080402",
    width: 175,
    height: 51,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderColor: "#927E5A",
    borderWidth: 1,
    borderRadius: 5,
  },
  exit: {
    alignSelf: "center",
    marginTop: 15,
  },
  buttonStyle3: {
    marginTop: 22,
    marginLeft: 15,
    marginRight: 15,
  },
  datePickerStyle: {
    width: 380,
    // borderColor: "#927E5A",
    // height: 40,
    // flex:4,
    // alignSelf:"flex-end",
    // background:"yellow"
    // wid
  },
});
function _myFunction(name: any, checked: any) {
  throw new Error("Function not implemented.");
}
