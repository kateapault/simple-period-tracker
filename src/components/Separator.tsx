import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,} from 'react-native';
import dayjs from 'dayjs';

import { COLORS, BUTTONTYPES } from '../constants';
import { formatDateAsISOString } from '../utils/dateUtils';
import CustomButton from './elements/CustomButton';

type SeparatorProps = {
    onPeriod: boolean,
    updatePeriodDateStatus: Function,
}

const Separator = (props: SeparatorProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.buttonBasic, props.onPeriod ? styles.buttonOn : styles.buttonOff]}
                activeOpacity={0.9}
                onPress={async () => {props.updatePeriodDateStatus(
                    // takes PeriodDateUpdate
                    {
                        status: !props.onPeriod,
                        date: formatDateAsISOString(dayjs()),
                    }
                )}}
            >
                <Text style={props.onPeriod ? styles.offPeriod : styles.onPeriod}>
                    🩸
                </Text>
                <Text style={props.onPeriod ? styles.buttonOnText : styles.buttonOffText}>{props.onPeriod ? "It stopped": "It started"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonBasic: {
        paddingBottom: 12,
        borderWidth: 4,
        borderRadius: 32,
        aspectRatio: "1/1", 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonOn: {
        backgroundColor: COLORS.lightpink,
        borderColor: "black",   
    },
    buttonOnText: {
        color: 'black',
        textAlign: "center",
        fontSize: 24,
    },
    buttonOff: {
        backgroundColor: COLORS.lightpink,
        borderColor: COLORS.darkred,
    },
    buttonOffText: {
        color: COLORS.darkred,
        textAlign: "center",
        fontSize: 24,
    },
    onPeriod: {
        fontSize: 100,
    },
    offPeriod: {
        fontSize: 100,
        filter: "grayscale(100%)",
    },
})

export default Separator;