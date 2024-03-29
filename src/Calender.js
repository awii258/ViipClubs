import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          monthTitleStyle={{color:"#927E5A",fontFamily: "OpenSansRegular",}}
          yearTitleStyle={{color:"#927E5A",fontFamily: "OpenSansRegular",}}
          todayTextStyle={{color:"#ffff",fontFamily: "OpenSansRegular",}}
          textStyle={{color:"#927E5A",fontFamily: "OpenSansRegular",}}
          todayBackgroundColor={"#927E5A"}
          selectedDayTextColor={'#ffff'}
          selectedDayColor={'#927E5A'}
          customDayHeaderStyles={{color:'#927E5A'            }}
       
       
          onDateChange={this.onDateChange}
        />

        <View>
          <Text style={{color:"#927E5A"}}>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // marginTop: 10,
  },
});