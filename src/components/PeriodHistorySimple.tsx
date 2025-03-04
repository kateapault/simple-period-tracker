import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList, } from 'react-native';
import { Dayjs } from 'dayjs';

import { getAllPeriodDateEntries } from '../services/dbService';
import { PeriodDateEntry, ISODateString, OverallPeriodStatistics } from '../types';
import { AppText, AppTextBold } from './elements/AppText';
import { formatDateAsISOString } from '../utils/dateUtils';
import { calculateOverallPeriodStatistics } from '../services/statisticsService';

type EntryProps = {
    status: string,
    date: ISODateString,
}

type PeriodHistorySimpleProps = {
    overallPeriodStatistics: OverallPeriodStatistics,
    onPeriod: boolean,
    nextPredictedPeriodDate: Dayjs,
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
            <View style={styles.smaller}>
                {/* <AppText>
                    <Text style={styles.predictionBlurb}>Your next period</Text>
                </AppText> */}
                {/* <AppTextBold>
                    <Text style={styles.predictionDates}>
                        Next start: {props.nextPredictedPeriodDate.format('ddd, M/D')}
                    </Text>
                </AppTextBold>  */}
                <AppTextBold>
                    <Text style={styles.predictionBlurb}>
                        Next expected
                    </Text>
                </AppTextBold>
                <AppText>
                    <Text style={styles.predictionDates}>
                        Thu 3/20 - 3/23 
                        {/* {props.nextPredictedPeriodDate.format('ddd M/D')} - {props.nextPredictedPeriodDate.add(props.overallPeriodStatistics.averagePeriodLength,'days').format('M/D')} */}
                    </Text>
                </AppText>
                {/* <AppText>
                        <Text style={styles.predictionText}>
                            ({props.nextPredictedPeriodDate.format('ddd')} - {props.nextPredictedPeriodDate.add(props.overallPeriodStatistics.averagePeriodLength,'days').format('ddd')})
                        </Text>
                </AppText> */}
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
        display: "flex",
        justifyContent: "space-around",
        // height: "100%",
        paddingRight: 10,
    },
    larger: {

    },
    smaller: {
        display: "flex",
        flexDirection: "column",
    },
    predictionBlurb: {
        textAlign: "right",
        fontSize: 36,
    },
    predictionText: {
        textAlign: "right",
        fontSize: 32,
    },
    predictionDates: {
        textAlign: "right",
        fontSize: 36,
    }
})

export default PeriodHistorySimple;