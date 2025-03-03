import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity,} from 'react-native';

import { HomeIcon, StatsIcon, DataIcon, CalendarIcon, SelectedIcon } from './elements/Icons';
import { PAGE, COLORS } from '../constants';
import { AppText, AppTextBold } from './elements/AppText';

type NavBarProps = {
    navigateTo: Function,
    selectedPage: string,
}

type NavBarButtonProps = {
    label: string,
    navigateTo: Function,
    icon: React.JSX.Element,
    selectedPage: string,
}

const NavBarButton = (props: NavBarButtonProps) => {
    const pressed = () => {
        props.navigateTo(props.label)
    }

    return (
        <TouchableOpacity style={styles.navButton} onPress={()=>{pressed()}}>
            { props.icon }
            {
                props.label == props.selectedPage
                ? <AppTextBold>
                    <Text style={styles.navButtonLabel}>
                        { props.label }
                    </Text>
                </AppTextBold>
                : <AppText>
                    <Text style={styles.navButtonLabel}>
                            { props.label }
                    </Text>
                </AppText>
            }
            <SelectedIcon selected={props.selectedPage == props.label} />
        </TouchableOpacity>
    )
}

const NavBar = (props: NavBarProps) => {

    return (
        <View style={styles.container}>
            <NavBarButton 
                label={PAGE.HOME} 
                navigateTo={props.navigateTo} 
                icon={<HomeIcon selected={PAGE.HOME == props.selectedPage}/>}
                selectedPage={props.selectedPage}/>
            <NavBarButton 
                label={PAGE.MYDATA} 
                navigateTo={props.navigateTo} 
                icon={<DataIcon selected={PAGE.MYDATA == props.selectedPage}/>}
                selectedPage={props.selectedPage}
            />
            <NavBarButton 
                label={PAGE.CALENDAR} 
                navigateTo={props.navigateTo} 
                icon={<CalendarIcon selected={PAGE.CALENDAR == props.selectedPage}/>}
                selectedPage={props.selectedPage}
            />
            <NavBarButton 
                label={PAGE.STATS} 
                navigateTo={props.navigateTo} 
                icon={<StatsIcon selected={PAGE.STATS == props.selectedPage}/>}
                selectedPage={props.selectedPage}
            />
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
        justifyContent: "center",
        backgroundColor: COLORS.white,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
    },
    navButtonLabel: {
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
        width: "100%",
        fontSize: 14,
        color: COLORS.darkred,
    },
})

export default NavBar;