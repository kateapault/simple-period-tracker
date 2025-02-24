import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const AppText = ({children}) => {
    return (
        <Text style={styles.default}>{children}</Text>
    )
}

export const AppTextBold = ({children}) => {
    return (
        <Text style={styles.bold}>{children}</Text>
    )
}

export const AppTextItalic = ({children}) => {
    return (
        <Text style={styles.italic}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'ArvoRegular',
        color: COLORS.lightest,
    },
    bold: {
        fontFamily: 'ArvoBold',
        color: COLORS.lightpink,
    },
    italic: {
        fontFamily: 'ArvoItalic',
    }
})
