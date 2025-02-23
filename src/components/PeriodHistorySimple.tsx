import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList, } from 'react-native';
import { Dayjs } from 'dayjs';

import { getAllPeriodDateEntries } from '../services/dbService';
import { PeriodDateEntry, ISODateString, OverallPeriodStatistics } from '../types';

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
            <Text>Quick Stats</Text>
            <Text>On average about {props.overallPeriodStatistics?.averageDaysBetweenPeriodStarts} days between the start of your periods</Text>
            <Text>{props.overallPeriodStatistics?.lastPeriodStartDate ? `${calculateNextStartDate()} days until your next period probably starts` : `not enough data to predict next period start`}</Text>
            <Text>{props.onPeriod ? `${calculateEndDate()} days left in your period` : ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: "red",
        borderWidth: 1,
        flex: 1,
    },
})

export default PeriodHistorySimple;