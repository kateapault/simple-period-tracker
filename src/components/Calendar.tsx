import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';

const CalendarView = () => {

    // TODO PRETTY use onVisibleMonthsChange effect
    // TODO format calendar to show periods as red highlights on dates
    // TODO on tap of date, modal pops up - if period, 'remove period' else 'add period'
    // if in the middle of a period, give option to remove whole period? what's best behavior for this?
    // maybe date adder to enter info? like 'add bulk dates' option? 

    return (
        <View style={styles.container}>
            <Text>Calendar view goes here</Text>
            <Calendar enableSwipeMonths={true} monthFormat={'MMM yyyy'}/>
            <Text>Add 'jump to month' picker (set current)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
    },
  })

export default CalendarView;