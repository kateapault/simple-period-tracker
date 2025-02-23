import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Modal, SafeAreaView} from 'react-native';

import CalendarView from '../components/Calendar';
import { PeriodDateEntry, CalendarEntry, ISODateString, PeriodDateUpdate } from '../types';
import BulkAddDatesModal from '../components/BulkAddDates/BulkAddDatesModal';
import DataBox from '../components/DataBox';

type MyDataPageProps = {
    entries: PeriodDateEntry[],
    setNewPeriodStatus: Function,
}

const MyDataPage = (props: MyDataPageProps) => {
    const [dateToEdit, setDateToEdit] = useState<PeriodDateUpdate | undefined>();

    const onDateEditClose = () => {
        setDateToEdit(undefined)
    }

    return (
        <View style={styles.container}>
            <Text>my data page</Text>
            <Text>{dateToEdit?.date}</Text>
            <CalendarView 
                entries={props.entries}
                setDateToEdit={setDateToEdit}

            />
            <DataBox 
                dateToEdit={dateToEdit ? dateToEdit : undefined}
                onDateEditClose={onDateEditClose}
                setNewPeriodStatus={props.setNewPeriodStatus}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 5,
      },
})


export default MyDataPage;