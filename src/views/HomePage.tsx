import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import PeriodStatus from '../components/PeriodStatus';
import PeriodHistorySimple from '../components/PeriodHistorySimple';


const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text>home page</Text>
            <PeriodStatus />
            <PeriodHistorySimple />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 5,
        display: "flex",
        flexDirection: "column",
      },
})


export default HomePage;