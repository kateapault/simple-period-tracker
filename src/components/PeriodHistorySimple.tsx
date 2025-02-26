import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList, } from 'react-native';
import { Dayjs } from 'dayjs';

import { getAllPeriodDateEntries } from '../services/dbService';
import { PeriodDateEntry, ISODateString, OverallPeriodStatistics } from '../types';
import { AppText } from './elements/AppText';

type EntryProps = {
    status: string,
    date: ISODateString,
}

type PeriodHistorySimpleProps = {
    overallPeriodStatistics: OverallPeriodStatistics,
    onPeriod: boolean,
    periodDateEntries?: PeriodDateEntry[],
}


// const Entry = (props: EntryProps) => {
//     return (
//         <View>
//             <Text>{props.timeStamp.toDateString()}: {props.status}</Text>
//         </View>
//     )
// }

const PeriodHistorySimple = (props: PeriodHistorySimpleProps) => {
    const calculateNextStartDate = () => {
        return 25
    }

    const calculateEndDate = () => {
        return 2
    }

    // maybe separate out so below data only renders if there is a last period start date

    return (
        <View style={styles.container}>
            <AppText>Quick Stats</AppText>
            <AppText>On average about {props.overallPeriodStatistics?.averageDaysBetweenPeriodStarts} days between the start of your periods</AppText>
            <AppText>{props.overallPeriodStatistics?.lastPeriodStartDate ? `${calculateNextStartDate()} days until your next period probably starts` : `not enough data to predict next period start`}</AppText>
            <AppText>{props.onPeriod ? `${calculateEndDate()} days left in your period` : ''}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default PeriodHistorySimple;