import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";


export const AppText = ({children}) => {
    return (
        <Text style={styles.default}>{children}</Text>
    )
}

export const AppHeaderText = ({children}) => {
    return (
        <Text style={styles.headerDefault}>{children}</Text>
    )
}

export const AppHeaderTextBold = ({children}) => {
    return (
        <Text style={styles.headerBold}>{children}</Text>
    )
}

export const AppHeaderTextItalic = ({children}) => {
    return (
        <Text style={styles.headerItalic}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    headerDefault: {
        fontFamily: 'ArvoRegular',
        color: COLORS.white,
    },
    headerBold: {
        fontFamily: 'ArvoBold',
        color: COLORS.white,
    },
    headerItalic: {
        fontFamily: 'ArvoItalic',
        color: COLORS.white,
    },
    default: {
        fontFamily: 'AtkinsonHyperlegibleNextRegular',
        color: COLORS.white,
    },
    bold: {
        fontFamily: 'AtkinsonHyperlegibleNextBold',
        color: COLORS.white,
    }

})
