import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Dayjs } from 'dayjs';

import { updatePeriodStatusForDate } from '../services/dbService';
import { PeriodDateEntry, PeriodDateUpdate } from '../types';
import dayjs from 'dayjs';

type PeriodStatusProps = {
    setNewPeriodStatus: Function,
    onPeriod: boolean,
}

const PeriodStatus = (props: PeriodStatusProps) => {
    
    const changePeriodStatus = async () => {
        const entry: PeriodDateUpdate = {status: !props.onPeriod, timeStamp: dayjs()}
        await props.setNewPeriodStatus(entry);
    }

    return (
        <View style={styles.container}>
            <Text>You are {props.onPeriod ? "on" : "not on"} on your period</Text>
            <Button
                onPress={async () => {changePeriodStatus()}}
                title={props.onPeriod ? "It stopped": "IT STARTED"}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
    },
    button: {
        width: "40%",
        backgroundColor: "purple",
    }
  })

export default PeriodStatus;