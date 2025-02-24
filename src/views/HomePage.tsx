import React from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import PeriodStatus from '../components/PeriodStatus';
import PeriodHistorySimple from '../components/PeriodHistorySimple';
import { OverallPeriodStatistics } from '../types';

type HomePageProps = {
    updatePeriodDateStatus: Function,
    onPeriod: boolean,  
    overallPeriodStatistics: OverallPeriodStatistics,
}

const HomePage = (props: HomePageProps) => {
    return (
        <View style={styles.container}>
            <PeriodStatus 
                updatePeriodDateStatus={props.updatePeriodDateStatus} 
                onPeriod={props.onPeriod}
            />
            <PeriodHistorySimple 
                onPeriod={props.onPeriod}
                overallPeriodStatistics={props.overallPeriodStatistics}
            />
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