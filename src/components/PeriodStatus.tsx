import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';

import { updatePeriodStatusForDate } from '../services/dbService';
import { ISODateString, OverallPeriodStatistics, PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString } from '../utils/utils';
import { AppHeaderText, AppText } from './elements/AppText';
import CustomButton from './elements/CustomButton';
import { COLORS, BUTTONTYPES } from '../constants';
import HomeHeader from './HomeHeader';

type PeriodStatusProps = {
    updatePeriodDateStatus: Function,
    onPeriod: boolean,
    overallPeriodStatistics: OverallPeriodStatistics,
}

// show days left in this section...?

const PeriodStatus = (props: PeriodStatusProps) => {

    const getDaysLeftInPeriod = () => {
        if (props.overallPeriodStatistics.lastPeriodStartDate) {
            const endDate = props.overallPeriodStatistics.lastPeriodStartDate.add(props.overallPeriodStatistics.averagePeriodLength)
            return endDate.diff(dayjs(),'days')
        }
        return 0
    }

    const getDaysLeftInPeriodText = (diff: number) => {
        return (diff > 0) ? `about ${diff} days left` : `today is probably the last day`
    }

    const getDaysLeftTilNextPeriod = () => {
        if (props.overallPeriodStatistics.lastPeriodStartDate) {
            console.log(props.overallPeriodStatistics.lastPeriodStartDate)
            console.log(props.overallPeriodStatistics.averageDaysBetweenPeriodStarts)
            const nextDate = props.overallPeriodStatistics.lastPeriodStartDate.add(props.overallPeriodStatistics.averageDaysBetweenPeriodStarts,'days')
            return nextDate.diff(dayjs(),'days')
        }
        return 0
    }

    const getDaysLeftTilNextPeriodText = (diff: number) => {
        if (diff == 0) {
            return `your next period will probably start today`
        } else if (diff == 1) {
            return `your next period will probably start tomorrow`
        } else {
            return `your next period will probably start in ${diff} days`
        }
    }
    
    const changePeriodStatus = async () => {
        const entry: PeriodDateUpdate = {status: !props.onPeriod, date: formatDateAsISOString(dayjs()) as ISODateString}
        await props.updatePeriodDateStatus(entry);
    }

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <HomeHeader />
                <View style={styles.textblock}>
                    <Text style={props.onPeriod ? styles.onPeriod : styles.offPeriod}>🩸</Text>
                    <Text style={styles.blurb}>
                        <AppText>
                            <Text style={props.onPeriod ? styles.onPeriodText : styles.offPeriodText}>
                                You are {props.onPeriod ? "on" : "not on"} your period
                            </Text>
                        </AppText>
                    </Text>
                </View>
                <AppText>
                    <Text style={styles.headsUp}>{props.onPeriod ? getDaysLeftInPeriodText(getDaysLeftInPeriod()) : getDaysLeftTilNextPeriodText(getDaysLeftTilNextPeriod())}</Text>
                </AppText>
                <CustomButton
                    type={props.onPeriod ? BUTTONTYPES.cancel : BUTTONTYPES.red}
                    onPress={async () => {changePeriodStatus()}}
                    title={props.onPeriod ? "It stopped": "IT STARTED"}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      flex: 2,
    //   backgroundColor: COLORS.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    bubble: {
        borderWidth: 1,
        borderRadius: 40,
        borderColor: COLORS.lightpink,
        backgroundColor: COLORS.lightpink,
        width: "80%",
        aspectRatio: "8/7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: "-50%",
    },
    textblock: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginLeft: -24,
    },
    button: {
        width: "40%",
        backgroundColor: "purple",
    },
    onPeriod: {
        fontSize: 84,
    },
    offPeriod: {
        fontSize: 84,
        filter: "grayscale(100%)",
    },
    blurb: {
        fontSize: 20,
        flex: 0.5,
        flexWrap: "wrap",
        textAlign: "center",
        color: COLORS.darkred,
    },
    onPeriodText: {
        color: COLORS.red,
    },
    offPeriodText: {
        color: COLORS.darkred,
    },
    headsUp: {
        fontSize: 12,
        color: COLORS.black,
    },
  })

export default PeriodStatus;