import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';

import { PeriodDateEntry, CalendarEntry } from '../types';
import { colors, formatDateAsISOString } from '../utils';

type CalendarViewProps = {
    entries: PeriodDateEntry[],
}

const CalendarView = (props: CalendarViewProps) => {
    const formatEntries = (entries: PeriodDateEntry[]) => {
        console.log('Calendar view')
        console.log(entries)
        const formatted: {[k: string]: any} = {}
        if (entries?.length > 0) {
            entries.forEach((e) => {
                formatted[e.date] = {
                    startingDay: true,
                    endingDay: true,
                    color: 'red',
                    textColor: 'white',
                }
            })
        }
        console.log(formatted)
        return formatted
    }
    const [dates, setDates] = useState(formatEntries(props.entries))

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
                markedDates={dates}
            />
            <Text>Add 'jump to month' picker (setCurrent)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
    },
  })

export default CalendarView;