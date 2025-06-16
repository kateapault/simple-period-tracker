import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import {AppHeaderText, AppHeaderTextBold} from './elements/AppText';
import { COLORS } from '../constants';

const Header = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                <AppHeaderTextBold><Text style={styles.emphasis}>Simple</Text></AppHeaderTextBold><AppHeaderText>PeriodTracker</AppHeaderText>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        borderBottomColor: COLORS.lightpink,
        borderWidth: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLORS.darkred,
    },
    header: {
        fontSize: 24,
    },
    emphasis: {
        color: COLORS.pink,
    }
})

export default Header;