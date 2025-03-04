import React, {useState} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

type MyDataTabProps = {
    deleteAllPeriodData: Function,
}

const MyDataTab = (props: MyDataTabProps) => {
    const [showAreYouSure, setShowAreYouSure]= useState<boolean>(false);

    const deleteAllData = () => {
        props.deleteAllPeriodData()
        console.log('delete all data pushed')
    }

    if (!showAreYouSure) {
        return (
            <View>
                <Text>My Data stuff here</Text>
                <Button 
                    title="Delete My Data"
                    onPress={()=>{setShowAreYouSure(true)}}
                />
            </View>
        )
    } else {
        return (
            <View>
                <Text>This will PERMANENTLY delete all your data. This cannot be undone.</Text>
                <Text>Are you sure you want to delete all your data?</Text>
                <View style={styles.buttons}>
                    <Button
                        onPress={async ()=>{await deleteAllData()}}
                        title="Yes, delete"
                    />
                    <Button
                        onPress={()=>{setShowAreYouSure(false)}}
                        title="No, cancel"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      color: "darkgrey",
      borderWidth: 1,
      borderColor: "black",
      flex: 1,
    },
    buttons: {
        display: "flex"
    }
  })


export default MyDataTab