import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity,} from 'react-native';

import { PAGE, COLORS } from '../constants';
import { AppText } from './elements/AppText';

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
        <TouchableOpacity style={styles.navButton} onPress={()=>{pressed()}}>
                <AppText>
            <Text style={styles.navButtonLabel}>
                    {props.label}
            </Text>
                </AppText>
        </TouchableOpacity>
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
        borderColor: COLORS.lightpink,
        borderWidth: 2,
        justifyContent: "center",
        backgroundColor: COLORS.lightest,
    },
    navButtonLabel: {
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
        width: "100%",
        fontSize: 20,
        color: COLORS.darkest,
    },
})

export default NavBar;