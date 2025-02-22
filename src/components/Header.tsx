import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

const Header = () => {

    return (
        <View style={styles.container}>
            <Text>SimplePeriodTracker</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        borderColor: "blue",
        borderWidth: 1,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    bolded: {
        fontWeight: "bold",
    }
})

export default Header;