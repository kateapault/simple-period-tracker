import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';

import { getDaysLeftInPeriod, getDaysLeftInPeriodText, getDaysLeftTilNextPeriod, getDaysLeftTilNextPeriodText } from '../services/dateService';
import { ISODateString, OverallPeriodStatistics, PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString } from '../utils/dateUtils';
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
                    <Text style={styles.headsUp}>{props.onPeriod ? 
                        getDaysLeftInPeriodText(getDaysLeftInPeriod(
                            props.overallPeriodStatistics.averagePeriodLength,
                            props.overallPeriodStatistics.lastPeriodStartDate,
                        )) : 
                        getDaysLeftTilNextPeriodText(getDaysLeftTilNextPeriod(
                            props.overallPeriodStatistics.averageDaysBetweenPeriodStarts,
                            props.overallPeriodStatistics.lastPeriodStartDate,
                        ))}</Text>
                </AppText>
                <CustomButton
                    type={props.onPeriod ? BUTTONTYPES.cancel : BUTTONTYPES.red}
                    onPress={async () => {props.updatePeriodDateStatus(
                        // takes PeriodDateUpdate
                        {
                            status: !props.onPeriod,
                            date: formatDateAsISOString(dayjs()),
                        }
                    )}}
                    title={props.onPeriod ? "It stopped": "It started"}
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
        backgroundColor: 'white',
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