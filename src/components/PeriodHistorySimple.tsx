import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList, } from 'react-native';
import { Dayjs } from 'dayjs';

import { getAllPeriodDateEntries } from '../services/dbService';
import { PeriodDateEntry, ISODateString, OverallPeriodStatistics } from '../types';
import { AppText } from './elements/AppText';
import { formatDateAsISOString } from '../utils/dateUtils';
import { calculateOverallPeriodStatistics } from '../services/statisticsService';

type EntryProps = {
    status: string,
    date: ISODateString,
}

type PeriodHistorySimpleProps = {
    overallPeriodStatistics: OverallPeriodStatistics,
    onPeriod: boolean,
    // predictedNextPeriodDate: Dayjs,
}


// const Entry = (props: EntryProps) => {
//     return (
//         <View>
//             <Text>{props.timeStamp.toDateString()}: {props.status}</Text>
//         </View>
//     )
// }

const PeriodHistorySimple = (props: PeriodHistorySimpleProps) => {
    // maybe separate out so below data only renders if there is a last period start date

    return (
        <View style={styles.container}>
            <View style={styles.larger}>
                <AppText>
                    {
                        props.overallPeriodStatistics.lastPeriodStartDate ?
                        <View>
                            <Text>
                                Your{props.onPeriod ? ' last' : ''} period started on {formatDateAsISOString(props.overallPeriodStatistics.lastPeriodStartDate)}
                            </Text>
                            <Text>
                                {props.onPeriod ? `about X days left` : ''}
                            </Text>
                        </View>
                        : <Text>
                            Not enough data
                        </Text>
                    }
                </AppText>
            </View>
            <View style={styles.smaller}>
                <AppText>
                    <Text>Your next period will probably start on *3/14*</Text>
                </AppText>
            </View>
            {/* <AppText>On average about {props.overallPeriodStatistics?.averageDaysBetweenPeriodStarts} days between the start of your periods</AppText> */}
            {/* <AppText>{props.overallPeriodStatistics?.lastPeriodStartDate ? `${calculateNextStartDate()} days until your next period probably starts` : `not enough data to predict next period start`}</AppText> */}
            {/* <AppText>{props.onPeriod ? `${calculateEndDate()} days left in your period` : ''}</AppText> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    larger: {

    },
    smaller: {

    },
})

export default PeriodHistorySimple;