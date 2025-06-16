import React, {use, useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import { DATABOX_TAB_TITLES } from '../../constants';
import CustomButton from '../elements/CustomButton';
import SingleDateEditModal from '../SingleDateModal';
import { ISODateString, PeriodDateUpdate } from '../../types';
import MyDataTab from './MyDataTab';

type DataBoxProps = {
    onDateEditClose: Function,
    updatePeriodDateStatus: Function,
    deleteAllPeriodData: Function,
    dateToEdit?: PeriodDateUpdate,
}

type TabProps = {
    title: string,
    onSelect: Function,
}




const DataBox = (props: DataBoxProps) => {
    // const [selectedTab, setSelectedTab] = useState<string>(DATABOX_TAB_TITLES.MYDATA)
    // const [dateEditOpen, setDateEditOpen] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            {
                props.dateToEdit ? 
                <SingleDateEditModal 
                    dateToEdit={props.dateToEdit}
                    updatePeriodDateStatus={props.updatePeriodDateStatus}
                    onCancel={props.onDateEditClose}
                />
                : <></>
            }
            <MyDataTab 
                deleteAllPeriodData={props.deleteAllPeriodData}
            />
        </View>
    )


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