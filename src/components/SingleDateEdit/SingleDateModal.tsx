import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { ISODateString, PeriodDateUpdate } from '../../types';

type SingleDateEditModalProps = {
    dateUpdate: PeriodDateUpdate,
    setNewPeriodStatus: Function,
    onCancel: Function,
}

const SingleDateEditModal = (props: SingleDateEditModalProps) => {

    const updateRecord = async (periodDateUpdate: PeriodDateUpdate) => {
        await props.setNewPeriodStatus(periodDateUpdate);
        props.onCancel();
    }

    return (
        <View>
            <Text>single date edit</Text>
            <Button
                onPress={async () => {await updateRecord(props.dateUpdate)}}
                title={props.dateUpdate.status ? `Add record for ${props.dateUpdate.date}` : `Remove record for ${props.dateUpdate.date}`}
            />
            <Button 
                title="Cancel"
                onPress={()=>{props.onCancel()}}
            />
        </View>
    )
}

export default SingleDateEditModal;