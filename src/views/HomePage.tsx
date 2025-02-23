import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import PeriodStatus from '../components/PeriodStatus';
import PeriodHistorySimple from '../components/PeriodHistorySimple';

type HomePageProps = {
    setNewPeriodStatus: Function,
    onPeriod: boolean,   
}

const HomePage = (props: HomePageProps) => {
    return (
        <View style={styles.container}>
            <Text>home page</Text>
            <Text>props onPeriod {`${props.onPeriod}`}</Text>
            <PeriodStatus setNewPeriodStatus={props.setNewPeriodStatus} onPeriod={props.onPeriod}/>
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