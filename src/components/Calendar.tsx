import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Calendar, CalendarList, DateData } from 'react-native-calendars';
import dayjs from 'dayjs';

import { COLORS, BUTTONTYPES } from '../constants';
import { PeriodDateEntry, CalendarDateEntries, ISODateString, PeriodDateUpdate, PredictedPeriodDateEntry } from '../types';
import { formatDateAsISOString } from '../utils/dateUtils';
import { AppText } from './elements/AppText';
import CustomButton from './elements/CustomButton';

type CalendarViewProps = {
    calendarEntries: CalendarDateEntries,
    periodDateEntries: PeriodDateEntry[],
    setDateToEdit: Function,
    predictedPeriodDates: PredictedPeriodDateEntry[],
}

const CalendarView = (props: CalendarViewProps) => {
    const handleDatePress = (date: DateData) => {
        const dateEdit: PeriodDateUpdate = {
            status: !(date.dateString in props.calendarEntries),
            date: date.dateString as ISODateString,
        }
        props.setDateToEdit(dateEdit)
    }

    // TODO PRETTY use onVisibleMonthsChange effect
    // TODO on tap of date, modal pops up - if period, 'remove period' else 'add period'
    // if in the middle of a period, give option to remove whole period? what's best behavior for this?
    // maybe date adder to enter info? like 'add bulk dates' option? 

    return (
        <View style={styles.container}>
            <Calendar 
                enableSwipeMonths={true} 
                monthFormat={'MMM yyyy'}
                markingType={'period'}
                markedDates={props.calendarEntries}
                onDayPress={handleDatePress}
                maxDate={formatDateAsISOString(dayjs())}
            />
            <View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
    },
  })

export default CalendarView;