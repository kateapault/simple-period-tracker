import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';

import { getDaysLeftInPeriod, getDaysLeftInPeriodText, getDaysLeftTilNextPeriod, getDaysLeftTilNextPeriodText } from '../services/dateService';
import { ISODateString, OverallPeriodStatistics, PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString } from '../utils/dateUtils';
import { AppHeaderText, AppText, AppTextBold } from './elements/AppText';
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
            <View style={styles.textgroup}>
                {/* <AppText>
                    <Text style={styles.text}>
                        Today is {dayjs().format('ddd, M/D')}
                    </Text>
                </AppText> */}
                <AppTextBold>
                    <Text style={styles.text}>
                        {props.onPeriod ? 'Started on' : 'Last started'}
                    </Text>
                </AppTextBold>
                <AppText>
                    <Text style={styles.text}>
                        {props.overallPeriodStatistics.lastPeriodStartDate?.format('ddd M/D')}
                    </Text>
                </AppText>
                <AppText>
                    <Text style={props.onPeriod ? styles.headsUp : styles.hidden}>{props.onPeriod ? 
                    getDaysLeftInPeriodText(getDaysLeftInPeriod(
                        props.overallPeriodStatistics.averagePeriodLength,
                        props.overallPeriodStatistics.lastPeriodStartDate,
                    )) : 
                    '.'}</Text>
                </AppText>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      flex: 0.9,
    //   backgroundColor: COLORS.white,
      display: "flex",
      justifyContent: "center",
    },
    bubble: {
        // width: "72%",
        height: "64%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
    },
    block: {
        display: "flex",
        flexDirection: "row",
    },
    textgroup: {
        display: "flex",
        alignContent: "flex-start",
        justifyContent: "center",
    },
    textblock: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-start",
        // marginLeft: -24,
    },
    button: {
        width: "40%",
        backgroundColor: "purple",
    },
    onPeriod: {
        fontSize: 60,
    },
    offPeriod: {
        fontSize: 60,
        filter: "grayscale(100%)",
    },
    blurb: {
        fontSize: 20,
        flex: 0.5,
        flexWrap: "wrap",
        textAlign: "left",
        color: COLORS.darkred,
        paddingLeft: 4,
    },
    text: {
        color: COLORS.darkred,
        fontSize: 36,
    },
    headsUp: {
        fontSize: 24,
        color: COLORS.darkred,
    },
    hidden: {
        fontSize: 24,
        color: COLORS.lightest,
    }
  })

export default PeriodStatus;