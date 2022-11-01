import React from 'react'
// import { Text } from 'react-native-svg'
import { Text, Image, StyleSheet, View, ScrollView,TouchableOpacity, Linking } from 'react-native'

const CompetitionDetails = ({ route }) => {
  const { image, title, content, link } = route.params
  return (
    <>

      <View style={styles.container}>
        {/* <Text style={{ color: "white" }}>Competition screen</Text> */}
        <ScrollView contentContainerStyle={{paddingBottom:200}}>
        <Image
          style={{
            height: 305,
            width: 373,
            alignSelf: "center",
            marginTop: 30,
            marginBottom: 30,
          }}
          resizeMode="cover"
          source={{ uri: image }}
        />
        <View style={{padding:25}}>
          <Text style={[styles.textStyle, {margin:10}]}>{title}</Text>
          <Text style={[styles.textStyle, {margin:10}]}>{content}</Text>
        </View>

        <View style={{flexDirection:"row", justifyContent:"center",margin:20}}>
        <TouchableOpacity
            style={{
              width: 280,
              height: 50,
              backgroundColor: "#927E5A",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => Linking.openURL(link || "https://www.google.com/")}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "OpenSansRegular",
                textTransform: "uppercase",
                color: "#ffffff",
              }}
            >
              ENTER COMPETITION
            </Text>
          </TouchableOpacity>
        </View>

        </ScrollView>

      </View>




    </>
  )
}

export default CompetitionDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000", flex: 1
  },
  textStyle: {
    color: "#927E5A",
    fontFamily: "OpenSansRegular",
    fontSize: 16,

  },
})