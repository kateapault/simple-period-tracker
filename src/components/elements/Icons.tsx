import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons'

import { COLORS } from '../../constants';

type IconProps = {
    selected: boolean,
}

const ICONSIZE = 30;
const COLOR = COLORS.darkred;
const INVERSE_COLOR = COLORS.white;

export const HomeIcon = (props: IconProps) => {
    return <Icon style={styles.icon} name={props.selected ? 'home' : 'home-outline'} size={ICONSIZE} color={COLOR} />
}

export const DataIcon = (props: IconProps) => {
    return <Icon style={styles.icon} name={props.selected ? 'text-box-multiple' : 'text-box-multiple-outline'} size={ICONSIZE} color={COLOR} />
}

export const StatsIcon = (props: IconProps) => {
    return <Icon style={styles.icon} name={props.selected ? 'chart-box' : 'chart-box-outline'} size={ICONSIZE} color={COLOR} />
}

export const CalendarIcon = (props: IconProps) => {
    return <Icon style={styles.icon} name={props.selected ? 'calendar-month' : 'calendar-month-outline'} size={ICONSIZE} color={COLOR} />
}

export const SelectedIcon = (props: IconProps) => {
    return <Icon style={styles.icon} name={'color-helper'} size={(ICONSIZE/2)} color={props.selected ? COLOR : COLORS.white}/>
}

const styles = StyleSheet.create({
    icon: {
        textAlign: "center",
        textAlignVertical: "center",
    },
})
