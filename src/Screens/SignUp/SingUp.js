import React, { useState, useEffect, useRef,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import ImagePicker from 'react-native-image-crop-picker';
import { Context as Actions } from "../../Context/Actions";

import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import * as yup from "yup";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import PhoneInput from "react-native-phone-number-input"
// import uuid from "react-native-uuid";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import DatePicker from "react-native-datepicker";
// import { text } from "stream/consumers";
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const emailReq = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(4, "Mininum 4 characters")
    .max(30, "Maximum 30 characters")
    .required("Your name is required"),
  lastName: Yup.string()
    .min(3, "Mininum 3 characters")
    .max(30, "Maximum 30 characters")
    .required("Your lastname is required"),
  location: Yup.string()
    .min(4, "Mininum 4 characters")
    .max(30, "Maximum 30 characters")
    .required("Your locaiton is required"),
  email: yup.string()
    .matches(emailReq, "Email not valid")
    .email("Email not valid")
    .required("Phone is required  or email required")

    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 9 characters or longer")
    .required("Password is required"),
    phone: Yup.string()
      .required("Phone Number is Required")
      .matches(phoneRegExp, "Phone number is not valid"),
 
});

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default function SingUp({ navigation }) {
const { state, onSignUP} = useContext(Actions);

  const [image, setImage] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");
  const [blobImage, setBlobImage] = useState("");
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const phoneInput = useRef(null);
 
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

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  const d = randomDate(new Date(2012, 0, 1), new Date());
  console.log(d);

  //   const id = uuid.v4();
  //   console.log('i ma keepere',id);

  const [borderColorName, setBorderColorName] = React.useState("#FFFFFF");
  const [borderColorPhone, setBorderColorPhone] = React.useState("#FFFFFF");
  const [borderColorEmail, setBorderColorEmail] = React.useState("#FFFFFF");
  const [borderColorPassword, setBorderColorPassword] =
    React.useState("#FFFFFF");

  // const [username, setUsername] = React.useState("");
  // const [phone_Number, setPhoneNumber] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [datePicker, setDatePicker] = useState({
    show:false,
    dateValue:new Date()
  });

  const [date, setDate] = useState(new Date());
  const showDatePicker =()=> {
    setDatePicker({...datePicker, show:true});
  };



  const onDateSelected = (event, value) => {
    // console.log("on delete call")
    // console.log("on selected called")
    // setDate(value);
    // console.log("value",value)
    // if(datePicker){ setDatePicker(false);}
    setDatePicker({dateValue:new Date(value), show:false})
   
  };
  const Registeration= (values)=>{
    values["dateOfBirth"] = Platform.OS === 'ios'?date:datePicker.dateValue
    console.log(values)
    onSignUP(values)
    navigation.navigate("Home")
  }
 
  return (
    <>
      <View style={styles.container}>
        {/* <View style={styles.textContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ right: WIDTH / 3 }}
            >
              <Ionicons name="arrow-back" color="#CDD2E0" size={22} />
            </TouchableOpacity>
            <View>
              <Text style={styles.txtStyle}>Register</Text>
            </View>
          </View>
          <View style={styles.lineBreak}></View> */}
        <View style={styles.lineBreak}></View>

        <View style={styles.topContainer}>
          <View>
            {/* <Image
                source={require("../../../assets/logos/GSlogo2.png")}
                resizeMode="cover"
              /> */}
          </View>

          <View style={styles.txtContainer}>
            <Text style={[styles.txtStyle, { color: "#927E5A" }]}>
              Fill in the form below to register for a new Be VIP account
            </Text>
          </View>
        </View>

        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Formik
            initialValues={{
              fullName:"",
              lastName:"",
              phone:"",
              location:"",
              email:"",
              password:"",
             
            }}
            validationSchema={validationSchema}
            onSubmit={values => Registeration(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.subContainer}>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      FIRST NAME
                    </Text>

                    <View style={styles.input}>
                      <TextInput
                        style={[styles.textStyle, { flex: 1 }]}
                        value={values.fullName}
                        onBlur={() => setBorderColorName("#FFFFFF")}
                        onFocus={() => setBorderColorName("#0085FF")}
                        onChangeText={handleChange("fullName")}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        // placeholder="FullName"
                        selectionColor={"#927E5A"}
                        placeholderTextColor={"#927E5A"}
                        
                      />
                    </View>
                    <Text style={{ color: "red", marginLeft: 30 }}>
                      {errors.fullName}
                    </Text>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      LAST NAME
                    </Text>

                    <View style={styles.input}>
                      <TextInput
                        style={[styles.textStyle, { flex: 1 }]}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        // placeholder="LastName"
                        selectionColor={"#927E5A"}
                        placeholderTextColor={"#927E5A"}
                        value={values.lastName}
                        onBlur={() => setBorderColorName("#FFFFFF")}
                        onFocus={() => setBorderColorName("#0085FF")}
                        onChangeText={handleChange("lastName")}
                      />
                    </View>
                    <Text style={{ color: "red", marginLeft: 30 }}>
                      {errors.lastName}
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      PHONE NUMBER
                    </Text>

                    <View style={styles.input}>
                      <TextInput
                        style={[styles.textStyle, { flex: 1 }]}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        // placeholder="Location"
                        selectionColor={"#927E5A"}
                        placeholderTextColor={"#927E5A"}
                        value={values.phone}
                        onBlur={() => setBorderColorName("#FFFFFF")}
                        onFocus={() => setBorderColorName("#0085FF")}
                        onChangeText={handleChange("phone")}
                      />
                    </View>
                    <Text style={{ color: "red", marginLeft: 30 }}>
                      {errors.phone}
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      CITY/TOWN
                    </Text>

                    <View style={styles.input}>
                      <TextInput
                        style={[styles.textStyle, { flex: 1 }]}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        // placeholder="Location"
                        selectionColor={"#927E5A"}
                        placeholderTextColor={"#927E5A"}
                        value={values.location}
                        onBlur={() => setBorderColorName("#FFFFFF")}
                        onFocus={() => setBorderColorName("#0085FF")}
                        onChangeText={handleChange("location")}
                      />
                    </View>
                    <Text style={{ color: "red", marginLeft: 30 }}>
                      {errors.location}
                    </Text>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      DATE OF BIRTH
                    </Text>
                    {Platform.OS === 'ios'?<View style={styles.input}>
           
       
   

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
                   // alignSelf: "flex-start",
                   // textAlign: "right",
                   // marginRight:0,

                   // justifyContent:"flex-end"
                   position: "absolute",
                   right:80
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
                //  marginLeft: 15,
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

                 top: 12,
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
         </View>:<View style={styles.MainContainer}>
                  
                  <Pressable style={styles.input} onPress={showDatePicker} >

                     
      <Text style={styles.text}>{datePicker.dateValue.toLocaleDateString()}</Text>

  
      </Pressable>
     

      {datePicker.show && (
        <DateTimePicker
          value={datePicker.dateValue}
          mode={'date'}
          textColor="#927E5A" 
          accentColor="red" 
          dateFormat={"DD-MM-YYYY"}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}

</View>}
                    

       

       

<Text style={{ color: "red", marginLeft: 30 }}>
                      {errors.lastName?"Your date of birth is required":null}
                    </Text>
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      EMAIL ADDRESS
                    </Text>
                    <View style={styles.input}>
                      <TextInput
                        style={[styles.textStyle, { flex: 1 }]}
                        value={values.email}
                        onBlur={() => setBorderColorName("#FFFFFF")}
                        onFocus={() => setBorderColorName("#0085FF")}
                        onChangeText={handleChange("email")}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        // placeholder="Email"
                        selectionColor={"#927E5A"}
                        placeholderTextColor={"#927E5A"}
                       
                      />
                    </View>
                  </View>
                  <Text style={{ color: "red", marginLeft: 30 }}>
                    {errors.email}
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={[
                        styles.txtStyle,
                        {
                          fontSize: 14,
                          marginLeft: 30,
                          color: "#927E5A",
                          marginBottom: 5,
                        },
                      ]}
                    >
                      PASSWORD
                    </Text>
                    <View style={styles.input}>
                      <TextInput
                        style={[styles.textStyle, { flex: 1 }]}
                        value={values.password}
                        onBlur={() => setBorderColorPassword("#FFFFFF")}
                        onFocus={() => setBorderColorPassword("#0085FF")}
                        onChangeText={handleChange("password")}
                        // placeholder="Password"
                        selectionColor={"#927E5A"}
                        placeholderTextColor="#927E5A"
                        secureTextEntry={visible}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => {
                          setVisible(!visible);
                          setShow(!show);
                        }}
                      >
                        <MaterialCommunityIcons
                          style={{ zIndex: 200 }}
                          name={
                            show === false ? "eye-off-outline" : "eye-outline"
                          }
                          size={24}
                          color="#927E5A"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={{ color: "red", marginLeft: 30 }}>
                    {errors.password}
                  </Text>
                </View>
             
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleSubmit}
                >
                  <Text style={[styles.textStyle, { color: "#FFFFFF" }]}>
                    Register Now
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  txtStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontWeight: "400",
    fontSize: 20,
  },
  textContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 40,
  },
  lineBreak: {
    borderBottomColor: "#927E5A",
    borderBottomWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 33,
  },
  txtContainer: {
    alignSelf: "center",
  },
  subContainer: {
    marginTop: 30,
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
  textInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    width: WIDTH / 1.1,
    padding: 8,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  textInput: {
    fontWeight: "400",
    fontSize: 14,
    flex: 1,
    textAlign: "left",
  },
  icon: {
    right: 11,
  },
  imageLogoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 92,
  },
  textContainer2: {
    alignSelf: "center",
    marginTop: 100,
  },
  bottomText: {
    alignSelf: "center",
    marginTop: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    zIndex: 200,
    alignItems: "center",
    top: 10,
  },
  btnContainer: {
    alignSelf: "center",
  },
  forgotText: {
    alignSelf: "center",
    marginTop: 40,
  },
  imgContainer: {
    height: 60,
    width: 60,
    borderRadius: 360,
  },
  txtStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontWeight: "400",
    fontSize: 14,
    color: "#0085FF",
  },
  phoneContainer: {
    width: WIDTH / 1.1,
    height: 50,
    borderRadius: 4,

    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    padding: 8,
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    paddingVertical: 0,
    width: WIDTH / 1.1,
    borderRadius: 4,
  },
  input: {
    height: 51,
    borderColor: "#927E5A",
    width: "85%",
    padding: 8,
    color: "#927E5A",
    borderWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    alignSelf: "center",
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    alignSelf: "center",
  },
  buttonStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    backgroundColor: "#927E5A",
    height: 51,
    margin: 12,
    alignSelf: "center",
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 5,
  },
  MainContainer: {
    flex: 1,
    // padding: 6,
    alignItems: 'center',
    backgroundColor: '#000000',
    
  },

  text: {
    fontSize: 14,
    color: '#927E5A',
    padding: 3,
    // marginBottom: 2,
    textAlign: "left",
    // alignSelf:'center'
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
    backgroundColor:"#000000 ",
    color:'#927E5A'
    
    
  },
});
