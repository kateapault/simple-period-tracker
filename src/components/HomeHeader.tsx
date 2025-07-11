import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import dayjs from 'dayjs';

import { AppText } from './elements/AppText';
import { formatDateAsTitleString } from '../utils/dateUtils';
import { COLORS } from '../constants';


const HomeHeader = () => {
    return (
        <View style={styles.container}>
            <AppText>
                <Text style={styles.headerText}>{formatDateAsTitleString(dayjs())}</Text>
            </AppText>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    }, 
    headerText: {
        fontSize: 24,
        color: COLORS.darkred
    },
})

export default HomeHeader;