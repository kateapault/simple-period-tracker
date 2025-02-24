import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Modal, SafeAreaView} from 'react-native';
import dayjs from 'dayjs';

import CalendarView from '../components/Calendar';
import { PeriodDateEntry, CalendarEntry, ISODateString, PeriodDateUpdate, PredictedPeriodDateEntry } from '../types';
import BulkAddDatesModal from '../components/BulkAddDates/BulkAddDatesModal';
import DataBox from '../components/DataBox';

type MyDataPageProps = {
    periodDateEntries: PeriodDateEntry[],
    updatePeriodDateStatus: Function,
    predictedPeriodDates: PredictedPeriodDateEntry[],
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
                periodDateEntries={props.periodDateEntries}
                setDateToEdit={setDateToEdit}
                predictedPeriodDates={props.predictedPeriodDates}
            />
            <DataBox 
                dateToEdit={dateToEdit ? dateToEdit : undefined}
                onDateEditClose={onDateEditClose}
                updatePeriodDateStatus={props.updatePeriodDateStatus}
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