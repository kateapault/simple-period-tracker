import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import CustomButton from '../elements/CustomButton';

type DateAdderProps = {
    onAddDate: Function,
}


const BulkAddDateAdder = (props: DateAdderProps) => {

    return (
        <View>
            <Text>pick a date & add it to the list</Text>
            <CustomButton
                onPress={props.onAddDate}
                title={"Add date"}
            />
        </View>
    )
}

export default BulkAddDateAdder