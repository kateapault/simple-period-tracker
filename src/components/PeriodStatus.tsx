import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Dayjs } from 'dayjs';

import { updatePeriodStatusForDate } from '../services/dbService';
import { ISODateString, PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString } from '../utils/utils';
import dayjs from 'dayjs';
import { AppText } from './elements/AppText';
import { COLORS } from '../constants';

type PeriodStatusProps = {
    updatePeriodDateStatus: Function,
    onPeriod: boolean,
}

// show days left in this section...?

const PeriodStatus = (props: PeriodStatusProps) => {
    
    const changePeriodStatus = async () => {
        const entry: PeriodDateUpdate = {status: !props.onPeriod, date: formatDateAsISOString(dayjs()) as ISODateString}
        await props.updatePeriodDateStatus(entry);
    }

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <View style={styles.textblock}>
                    <Text style={props.onPeriod ? styles.onPeriod : styles.offPeriod}>🩸</Text>
                    <Text style={styles.blurb}>
                        <AppText>
                            <Text style={props.onPeriod ? styles.onPeriodText : styles.offPeriodText}>
                                You are {props.onPeriod ? "on" : "not on"} your period today
                            </Text>
                        </AppText>
                    </Text>
                </View>
                <Button
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
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
      backgroundColor: COLORS.darkest,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    bubble: {
        borderWidth: 1,
        borderRadius: 40,
        backgroundColor: COLORS.lightpink,
        height: "64%",
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
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
        fontSize: 80,
    },
    offPeriod: {
        fontSize: 80,
        filter: "grayscale(100%)",
    },
    blurb: {
        fontSize: 20,
        flex: 0.75,
        flexWrap: "wrap",
        textAlign: "center",
        color: COLORS.darkest,
    },
    onPeriodText: {
        color: COLORS.red,
    },
    offPeriodText: {
        color: COLORS.darkest,
    }
  })

export default PeriodStatus;