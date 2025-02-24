import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import {AppText, AppTextBold} from './elements/AppText';
import { COLORS } from '../constants';

const Header = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                <AppTextBold>Simple</AppTextBold><AppText>PeriodTracker</AppText>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        borderBottomColor: COLORS.lightest,
        borderWidth: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },
    header: {
        fontSize: 24,
    },
})

export default Header;