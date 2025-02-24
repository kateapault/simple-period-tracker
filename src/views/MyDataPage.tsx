import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Modal, SafeAreaView} from 'react-native';
import dayjs from 'dayjs';

import CalendarView from '../components/Calendar';
import { PeriodDateEntry, CalendarEntry, ISODateString, PeriodDateUpdate, PredictedPeriodDateEntry } from '../types';
import BulkAddDatesModal from '../components/BulkAddDates/BulkAddDatesModal';
import DataBox from '../components/DataBox/DataBox';

type MyDataPageProps = {
    periodDateEntries: PeriodDateEntry[],
    updatePeriodDateStatus: Function,
    predictedPeriodDates: PredictedPeriodDateEntry[],
    deleteAllPeriodData: Function,
}

const MyDataPage = (props: MyDataPageProps) => {
    const [dateToEdit, setDateToEdit] = useState<PeriodDateUpdate | undefined>();

    const onDateEditClose = () => {
        setDateToEdit(undefined)
    }

    return (
        <View style={styles.container}>
            <CalendarView 
                periodDateEntries={props.periodDateEntries}
                setDateToEdit={setDateToEdit}
                predictedPeriodDates={props.predictedPeriodDates}
            />
            <DataBox 
                dateToEdit={dateToEdit ? dateToEdit : undefined}
                onDateEditClose={onDateEditClose}
                updatePeriodDateStatus={props.updatePeriodDateStatus}
                deleteAllPeriodData={props.deleteAllPeriodData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        padding: 5,
        display: "flex",
        flexDirection: "column",
      },
})


export default MyDataPage;