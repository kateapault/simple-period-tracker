import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity,} from 'react-native';

import { PAGE, COLORS } from '../constants';
import { AppHeaderText } from './elements/AppText';

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
                <AppHeaderText>
            <Text style={styles.navButtonLabel}>
                    {props.label}
            </Text>
                </AppHeaderText>
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
        flex: 1,
        flexDirection: "row",
    },
    navButton: {
        flex: 1,
        borderColor: COLORS.lightpink,
        borderWidth: 2,
        justifyContent: "center",
        backgroundColor: COLORS.white,
    },
    navButtonLabel: {
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
        width: "100%",
        fontSize: 20,
        color: COLORS.darkred,
    },
})

export default NavBar;