import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import { addPeriodStatusEntry } from '../services/dbService';
import { PeriodStatusEntry } from '../types';

type PeriodStatusProps = {
    setNewPeriodStatus: Function,
    onPeriod: boolean,
}

const PeriodStatus = () => {
    // const [onPeriod, setOnPeriod] = useState(props.onPeriod)
    const [onPeriod, setOnPeriod] = useState(false);
    // console.log(`boolean in PeriodStatus component is ${props.onPeriod}`)
    
    const setNewPeriodStatus = () => {
        setOnPeriod(!onPeriod)
    }

    return (
        <View style={styles.container}>
            <Text>You are {onPeriod ? "on" : "not on"} on your period</Text>
            <Button
                onPress={async () => {setNewPeriodStatus()}}
                title={onPeriod ? "It stopped": "IT STARTED"}
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