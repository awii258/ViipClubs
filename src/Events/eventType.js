import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import eventPromotion from '../../src/Events/eventPromotion'

const eventType = () => {
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
     <eventPromotion/>
    </View>
  )
}

export default eventType

const styles = StyleSheet.create({})