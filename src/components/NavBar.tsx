import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import { PAGE } from '../constants';

type NavBarProps = {
    navigateTo: Function,
}

type NavBarButtonProps = {
    label: string,
    navigateTo: Function,
}


const NavBarButton = (props: NavBarButtonProps) => {
    const pressed = () => {
        props.navigateTo(props.label)
    }

    return (
        <View style={styles.navButton}>
            <Text style={styles.navButtonLabel} onPress={()=>{pressed()}}>{props.label}</Text>
        </View>
    )
}

const NavBar = (props: NavBarProps) => {

    return (
        <View style={styles.container}>
            <NavBarButton label={PAGE.HOME} navigateTo={props.navigateTo}/>
            <NavBarButton label={PAGE.MYDATA} navigateTo={props.navigateTo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        borderColor: "green",
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
    },
    navButton: {
        flex: 1,
        borderColor: "green",
        borderWidth: 2,
        justifyContent: "center",
    },
    navButtonLabel: {
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
        width: "100%",
    },
})

export default NavBar;