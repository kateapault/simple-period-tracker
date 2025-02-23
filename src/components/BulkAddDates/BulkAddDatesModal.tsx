import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Modal} from 'react-native';

import CustomButton from '../elements/CustomButton';
import { ISODateString } from '../../types';

import BulkAddDateList from './BulkAddDateList';
import BulkAddDateAdder from './BulkAddDateAdder';


type BulkAddDatesProps = {
    onClose: Function,
}

const BulkAddDatesModal = (props: BulkAddDatesProps) => {
    const [dates,setDates] = useState<ISODateString[]>([])

    const addDate = (newDate) => {
        setDates([...dates, newDate])
    }

    const saveDates = () => {
        console.log('saving dates')
    }

    return (
        <View style={styles.wholeView}>
            <View style={styles.container}>
                <BulkAddDateAdder 
                    onAddDate={addDate}
                />
                <BulkAddDateList />
            </View>
            <CustomButton
                onPress={saveDates}
                title='save dates'
            />
            <CustomButton 
                title='close'
                onPress={props.onClose}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wholeView: {
        display: "flex",
        flexDirection: "column",
    },
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
      display: "flex",
    },
  })

export default BulkAddDatesModal