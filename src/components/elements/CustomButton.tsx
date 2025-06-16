import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

import { BUTTONTYPES, COLORS } from '../../constants';
import { AppText } from './AppText';

type CustomButtonProps = {
    onPress: Function,
    title: string,
    type?: string,
}

const CustomButton = (props: CustomButtonProps) => {

    const setStyle = (type: string | undefined) => {
        if (!type) {
            return styles.buttonDefault
        } else if (type == BUTTONTYPES.block) {
            return styles.block
        } else if (type == BUTTONTYPES.confirm) {
            return styles.confirm
        } else if (type == BUTTONTYPES.cancel) {
            return styles.cancel
        } else if (type == BUTTONTYPES.neutralLight) {
            return styles.neutralLight
        } else if (type == BUTTONTYPES.neutralDark) {
            return styles.neutralDark
        } else if (type == BUTTONTYPES.red) {
            return styles.red
        }
    }

    const setTextStyle = (type: string | undefined) => {
        if (!type) {
            return styles.buttonDefaultText
        } else if (type == BUTTONTYPES.block) {
            return styles.blockText
        } else if (type == BUTTONTYPES.confirm) {
            return styles.confirmText
        } else if (type == BUTTONTYPES.cancel) {
            return styles.cancelText
        } else if (type == BUTTONTYPES.neutralLight) {
            return styles.neutralLightText
        } else if (type == BUTTONTYPES.neutralDark) {
            return styles.neutralDarkText
        } else if (type == BUTTONTYPES.red) {
            return styles.redText
        }
    }

    return (
        <TouchableOpacity 
            style={setStyle(props.type)}
            activeOpacity={0.9}
            onPress={() => {props.onPress()}}
        >
            <AppText>
                <Text style={setTextStyle(props.type)}>{props.title}</Text>
            </AppText>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonDefault: {
        height: 40,
        width: 160,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: COLORS.lightpink,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonDefaultText: {
        color: COLORS.black,
    },
    block: {
        aspectRatio: 1,
        width: "25%",
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
    },
    blockText: {
        color: 'black',
    },
    confirm: {
        padding: 12,
        backgroundColor: "lightgreen",
        borderWidth: 2,
        borderColor: "green",
        borderRadius: 8,
    },
    confirmText: {
        color: 'green'
    },
    cancel: {
        padding: 12,
        backgroundColor: "lightgrey",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 8,
        width: "40%",
    },
    cancelText: {
        color: 'black',
        textAlign: "center",
        fontSize: 18,
    },
    neutralLight: {
        padding: 12,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.white,
        borderRadius: 8,
    },
    neutralLightText: {
        color: COLORS.darkred,
    },
    neutralDark: {
        padding: 12,
        backgroundColor: COLORS.darkred,
        borderWidth: 2,
        borderColor: COLORS.darkred,
        borderRadius: 8,
    },
    neutralDarkText: {
        color: COLORS.white,
    },
    red: {
        padding: 12,
        backgroundColor: COLORS.lightred,
        borderWidth: 2,
        borderColor: COLORS.darkred,
        borderRadius: 8,
        width: "40%",
    },
    redText: {
        color: COLORS.lightest,
        textAlign: "center",
        fontSize: 18,
    },
})


export default CustomButton;