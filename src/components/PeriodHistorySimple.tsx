import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, FlatList, } from 'react-native';

import { getAllPeriodStatusEntries } from '../services/dbService';
import { PeriodStatusEntry } from '../types';

type EntryProps = {
    status: string,
    timeStamp: Date,
}

type PeriodHistorySimpleProps = {
    entries: PeriodStatusEntry[] | null,
}


const Entry = (props: EntryProps) => {
    return (
        <View>
            <Text>{props.timeStamp.toLocaleTimeString()}: {props.status}</Text>
        </View>
    )
}

const PeriodHistorySimple = () => {

    return (
        <View style={styles.container}>
            <Text>last start & stop go here</Text>
            <Text>probable days between period starts</Text>
            {/* {
                props.entries ? 
                <FlatList 
                    data={props.entries}
                    renderItem={({item}) => <Entry status={item.status} timeStamp={item.timeStamp} />}
                    keyExtractor={item => `${item.timeStamp}`}
                />
                : <Text>No data</Text>
            } */}
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