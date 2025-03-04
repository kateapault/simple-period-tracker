import React from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Dayjs } from 'dayjs';

import PeriodStatus from '../components/PeriodStatus';
import PeriodHistorySimple from '../components/PeriodHistorySimple';
import HomeHeader from '../components/HomeHeader';
import { OverallPeriodStatistics } from '../types';
import Separator from '../components/Separator';

type HomePageProps = {
    updatePeriodDateStatus: Function,
    onPeriod: boolean,  
    overallPeriodStatistics: OverallPeriodStatistics,
    nextPredictedPeriodDate: Dayjs,
}

const HomePage = (props: HomePageProps) => {
    return (
        <View style={styles.container}>
            <PeriodStatus 
                updatePeriodDateStatus={props.updatePeriodDateStatus} 
                onPeriod={props.onPeriod}
                overallPeriodStatistics={props.overallPeriodStatistics}
            />
            <Separator 
                onPeriod={props.onPeriod}
                updatePeriodDateStatus={props.updatePeriodDateStatus}
            />
            <PeriodHistorySimple 
                onPeriod={props.onPeriod}
                overallPeriodStatistics={props.overallPeriodStatistics}
                nextPredictedPeriodDate={props.nextPredictedPeriodDate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
})


export default HomePage;