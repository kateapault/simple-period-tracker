import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { ISODateString, PeriodDateUpdate } from '../types';

type SingleDateEditModalProps = {
    dateToEdit: PeriodDateUpdate,
    updatePeriodDateStatus: Function,
    onCancel: Function,
}

const SingleDateEditModal = (props: SingleDateEditModalProps) => {

    const updateRecord = async (periodDateUpdate: PeriodDateUpdate) => {
        await props.updatePeriodDateStatus(periodDateUpdate);
        props.onCancel();
    }

    return (
        <View>
            <Text>single date edit</Text>
            <Button
                onPress={async () => {await updateRecord(props.dateToEdit)}}
                title={props.dateToEdit.status ? `Add record for ${props.dateToEdit.date}` : `Remove record for ${props.dateToEdit.date}`}
            />
            <Button 
                title="Cancel"
                onPress={()=>{props.onCancel()}}
            />
        </View>
    )
}

export default SingleDateEditModal;