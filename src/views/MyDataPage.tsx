import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import CalendarView from '../components/Calendar';
import { PeriodDateEntry, CalendarEntry } from '../types';

type MyDataPageProps = {
    entries: PeriodDateEntry[],
}

const MyDataPage = (props: MyDataPageProps) => {
    return (
        <View style={styles.container}>
            <Text>my data page</Text>
            <CalendarView entries={props.entries}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 5,
      },
})


export default MyDataPage;