import React, {use, useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import CustomButton from './elements/CustomButton';
import SingleDateEditModal from './SingleDateEdit/SingleDateModal';
import { ISODateString, PeriodDateUpdate } from '../types';

type DataBoxProps = {
    onDateEditClose: Function,
    setNewPeriodStatus: Function,
    dateToEdit?: PeriodDateUpdate,
}


const DataBox = (props: DataBoxProps) => {
    const [bulkAddOpen, setBulkAddOpen] = useState<boolean>(false);
    // const [dateEditOpen, setDateEditOpen] = useState<boolean>(false);

    const openBulkAdd = () => {
        // setBulkAddOpen(true)
        return
    }
    const onBulkAddClose = () => {
        setBulkAddOpen(false)
    }

    if (bulkAddOpen) {
        return (
            <View>
                <Text>Bulk add open</Text>
                <Button
                    onPress={onBulkAddClose}
                    title="Close"
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                {
                    props.dateToEdit ? 
                    <SingleDateEditModal 
                        dateUpdate={props.dateToEdit}
                        setNewPeriodStatus={props.setNewPeriodStatus}
                        onCancel={props.onDateEditClose}
                    />
                    : <></>
                }
                <Text>nothing selected</Text>
                <CustomButton 
                    type="block"
                    title="Bulk Add"
                    onPress={openBulkAdd}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around" 
    },
  })

export default DataBox;