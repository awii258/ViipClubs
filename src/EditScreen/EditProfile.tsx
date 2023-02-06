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
  Platform,  Modal,
  Pressable,
  
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import Spinner from 'react-native-loading-spinner-overlay';
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
const EditProfile = ({ navigation }: LoginScreenProps) => {
  const [selected, setSelected] = React.useState("");
  const { state, onGetProfile, Logout, onUpdate, onUpdateImage, LoadToken,onDelete,Logoutfordel,onNew } =
  useContext(Actions); 
  const [first, setFirst] = useState('');
  const [destination, setDestination] = useState('');
  const [last, setLast] = useState('');
  const [location, setLocation] = useState('');
  const [phone,setPhone]=useState('')
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(state?.user?.data.date_of_birth);
  const [email, setEmail] = useState('');
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [encodedImage, setEncodedImage] = useState<any>();
  const [date1, setDate1] = useState(new Date(1598051730000));
  // const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [datenew,setDateNew]=useState('')

// useEffect(()=>{
//   console.log("inside editor screen useeffect")
//   onNew()
  
// },[])
 
  // console.log("................>>>>>", state.user);

  useEffect(()=>{
    if(state.user && state.user.data){
      setFirst(state.user.data.first_name)
      setLast(state.user.data.last_name)
      setLocation(state.user.data.location)
      setDestination(state.user.data.destination)
      setDate(new Date(state?.user?.data.date_of_birth))
      setEmail(state.user.data.email)
      setPhone(state.user.data.phone)
    }

  },[state?.user?.data])


// console.log("awaiz ki khani ",first,last,date,destination)
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setShow(false);
  //   setDates(currentDate);
  // };
  

  // const showMode = (currentMode: React.SetStateAction<string>) => {
  //   if (Platform.OS === 'android') {
  //     setShow(false);
  //     // for iOS, add a button that closes the picker
  //   }
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  // console.log("hello awaiz how are you", state.user?.data.last_name);
  // const data = [
  //   { value: `${state.user?.data.destination}` },
  //   { value: "destination" },
  //   { value: "destination" },
  // ];

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
        "https://service.manage.be-vip.com/api/external/auth/image",
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
          Alert.alert("Sorry, we need camera roll permissions to make this work!");
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
    navigation.navigate("Dull");
    // console.log("End of logout handler >>>>>>>>>>>>>>>>>>>");
  };
  const deleteConfirmation =()=>{
    Logoutfordel();
    // onDelete();
    LoadToken("xyz");
    navigation.navigate("Dull");

  
  }
  
  
  const[date2,setDate2]=useState( {dateValue:new Date()});
  console.log("new date selected alternative",date2)
  const [datePicker, setDatePicker] = useState({
    show:false,
    dateValue: new Date(state?.user?.data.date_of_birth)
  });
  const newdate= datePicker.dateValue
  // console.log("all date is the",newdate)
// console.log("new date selected",datePicker)
  // const [date, setDate] = useState(new Date());
  const showDatePicker =()=> {
    setDatePicker({...datePicker, show:true});
  };

  // useEffect(()=>{
  //   if(date){
  //     setDatePicker({show:false,dateValue:new Date(date)})
  //   }

  // },[data])


  const onDateSelected = (event:any, value:any) => {
    // console.log("on delete call")
    // console.log("on selected called")
    // setDate(value);
    // console.log("value",value)
    // if(datePicker){ setDatePicker(false);}
    setDatePicker({dateValue:new Date(value), show:false})
    setDate2({dateValue:new Date(value)})
   
  };
  // useEffect(()=>{
  //   setTimeout(() => {
  //     setIsLoading(false);
      
  //   }, 6000);
  // },[])
  // useEffect(()=>{
  //   if(isLoading){
  //   setTimeout(() => {
     
      
  //     navigation.navigate("Dull");
  //   }, 6000);
  // }
  // },[])

  useEffect(() => {
    onGetProfile();
    // console.log("hi");
  }, []);

  
  return (
    <>
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
       
        <ScrollView
          contentContainerStyle={{ paddingBottom: 0.5 }}
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
                First Name
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
                City/Town
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
                Phone Number
              </Text>
              <TextInput
                style={styles.input}
                editable={true}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={phone}
                selectionColor={"#927E5A"}
                onChangeText={setPhone}
              />
            </View>
            {/* <Text
              style={{
                color: "#927E5A",
                fontSize: 13,
                fontFamily: "OpenSansRegular",
                marginLeft: 12,
                // backgroundColor:"#080402"
              }}
            >
              {" "}
              Phone Number
            </Text> */}
          {/* <View style={styles.input}>
           
       
   

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
                   flex:1,
                   // flexDirection:"row",
                   // backgroundColor:"yellow",
                   alignSelf: "flex-start",
                   // textAlign: "right",
                   // marginRight:0,

                   // justifyContent:"flex-end"
                   position: "absolute",
                   right:50
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
                 borderColor: "#927E5A",
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
              
              
             
               datePickerCon:{
                backgroundColor:'#000',
                borderColor:'red'
               },
               datePicker:{
                backgroundColor:'#927E5A',
                borderColor:'red'

               },
               btnTextConfirm:{
                 color:'#927E5A',
                 borderColor:'#927E5A'
                 
               },
               btnTextCancel:{
                 color:'#927E5A',
                 borderColor:'#927E5A'
               },
              
             }}
             onDateChange={(date)=>{setDate(date)}}
             
           />
         </View> */}
         
            
            
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
            {/* <Text
              style={{
                color: "#927E5A",
                fontSize: 13,
                fontFamily: "OpenSansRegular",
                marginLeft: 12,
              }}
            >
              {" "}
              Destination
            </Text> */}

            {/* <View style={{ marginTop: 10 }}>
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
            </View> */}
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
                onPress={async() => {
                  console.log("first:", first, "last:",last,"email:",email,"phone:",phone,"location:",location,"date:",datePicker.dateValue,"destination:",destination)
                    try{
                      await onUpdate({
                        first,
                        last,
                        email,
                        phone,
                        location,
                        date,
                        // date:Platform.OS === "ios"?date:datePicker.dateValue,
                        destination,
  
                        // newdate,
                       
                       
                        // image,
                        // encodedImage,
                      });
                  }catch(error){

                  }
                  
                    onNew()
                    onGetProfile()
                    navigation.navigate("Dull");
                  
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
            <View style={{ alignSelf: "center", marginTop: 15 }}>
              
              <TouchableOpacity
                onPress={() => {
                  {
                    // Alert.alert(
                    //   "Delete from store",
                    //   "Are you sure you want to delete the product?",
                    //   [
                    //     {
                    //       text: "Cancel",
                    //       onPress: () => console.log("Cancel Pressed"),
                    //       style: "cancel",
                    //     },
                    //     { text: "OK", onPress: () => LogoutHandler() ,style: 'destructive' },
                    //   ],
                    //   { cancelable: false }
                    // );
                    // navigation.navigate("Res");
                    setModalVisible(true)
                  }
                }}
                
              >
                <Text
                  style={[
                    styles.textStyle,
                    { textDecorationLine: "underline", color: "#FFFFFF" },
                  ]}
                >
                  Delete my account
                </Text>
              </TouchableOpacity>
              <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalcontent}>
                <Text style={styles.modalText}>
                Are you sure you want to delete the account?
                </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-evenly"}}>
                <Pressable
                  style={[styles.button1, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle2}>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.button1, styles.buttonClose]}
                  onPress={deleteConfirmation }
                >
                  <Text style={styles.textStyle2}>Yes</Text>
                </Pressable>
                </View>
              </View>
            </View>
          </Modal>
       
        </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default EditProfile;

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
    // color:'red'
  // borderColor: "#927E5A",
    // height: 40,
    // flex:4,
    // alignSelf:"flex-end",
    // background:"yellow",
    // wid,
    
   
  },
  pressableButton: {
    // flex:0.1,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: hp("1.5%"),
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("20%"),
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000",
    borderRadius: 20,

    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 2,
    
    // position:"relative",
    // bottom:100
// marginTop:5,
//     marginBottom:10,
    // width:150,
    // backgroundColor:"red"
  },
  button1: {
    borderRadius: 5,
    padding: 10,
     elevation: 2,
   width:70

    // marginBottom:20,
    // width:150,
    // backgroundColor:"red"
  },
  buttonOpen: {
    // backgroundColor: "#927E5A",
  },
  buttonClose: {
    backgroundColor: "#927E5A",
  },
  textStyle2: {
    // color: "#000",
    // fontWeight: "bold",
    // textAlign: "center",
    // fontFamily: "OpenSansRegular",
    // fontSize: 14,
    // marginTop: 2.5,
    textAlign:'center',
    fontSize: 12,

    // marginRight: 15,
    color: "#FFFFFf",
    fontFamily: "OpenSansRegular",
    // textTransform: "uppercase",
  },
  textStyle3: {
    // color: "#000",
    // fontWeight: "bold",
    // textAlign: "center",
    // fontFamily: "OpenSansRegular",
    // fontSize: 14,
    // marginTop: 2.5,
    fontSize: 12,

    // marginRight: 15,
    color: "#857878",
    fontFamily: "OpenSansRegular",
    // textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#927E5A",

    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
  modalcontent:{
  margin:20
  },
  MainContainer: {
    flex: 1,
    // padding: 6,
    alignItems: 'center',
    backgroundColor: '#080402',
   
  },
  text: {
    fontSize: 14,
    color: '#927E5A',
    padding: 3,
    marginBottom: 5,
    textAlign: "left"
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
    backgroundColor:"#000000",
    color:'#927E5A'
    
    
  },
  input1: {
    margin:15,
    height: 51,
    borderColor: "#927E5A",
    width: "92%",
    padding: 10,
    color: "#927E5A",
    borderWidth: 1,
    justifyContent:'center',
    backgroundColor:"#080402",

    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // flex: 1,
    // alignSelf: "center",
    marginTop: 10,
  },
  spinnerTextStyle: {
    color: '#927E5A',
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 25,
},
txtStyle: {
  color: "#CDD2E0",
  fontFamily: "poppinsLight",
  fontWeight: "400",
  fontSize: 20,
},
});
function _myFunction(name: any, checked: any) {
  throw new Error("Function not implemented.");
}
function toISOString(date: any): any {
  throw new Error("Function not implemented.");
}

