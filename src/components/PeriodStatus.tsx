import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Dayjs } from 'dayjs';

import { updatePeriodStatusForDate } from '../services/dbService';
import { ISODateString, PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString } from '../utils/utils';
import dayjs from 'dayjs';

type PeriodStatusProps = {
    updatePeriodDateStatus: Function,
    onPeriod: boolean,
}

const PeriodStatus = (props: PeriodStatusProps) => {
    
    const changePeriodStatus = async () => {
        const entry: PeriodDateUpdate = {status: !props.onPeriod, date: formatDateAsISOString(dayjs()) as ISODateString}
        await props.updatePeriodDateStatus(entry);
    }

    return (
        <View style={styles.container}>
            <Text>onPeriod {`${props.onPeriod}`}</Text>
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