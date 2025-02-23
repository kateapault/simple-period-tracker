import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

type CustomButtonProps = {
    onPress: Function,
    title: string,
    type?: string,
}

const CustomButton = (props: CustomButtonProps) => {

    const setStyle = (type: string | undefined) => {
        if (!type) {
            return styles.buttonDefault
        } else if (type == 'block') {
            return styles.block
        }
    }

    return (
        <TouchableOpacity 
            style={setStyle(props.type)}
            activeOpacity={0.9}
            onPress={() => {props.onPress()}}
        >
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonDefault: {
        height: 40,
        width: 160,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
    },
    block: {
        aspectRatio: 1,
        width: "25%",
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
    }
    
})


export default CustomButton;