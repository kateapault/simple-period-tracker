import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { DB } from '@op-engineering/op-sqlite';
import dayjs from 'dayjs';

import { PAGE } from '../constants';
import { PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString, isDateToday, isDateStringToday } from '../utils';

import { getAllPeriodDateEntries, updatePeriodStatusForDate, deleteAllPeriodDateEntries } from '../services/dbService';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import MyDataPage from './MyDataPage';

type BasePageProps = {
    db: DB,
}

const BasePage = (props: BasePageProps) => {
    const [currentPage, setCurrentPage] = useState<string>(PAGE.HOME)
    const [periodDateEntries, setPeriodDateEntries] = useState<PeriodDateEntry[]>([])
    const [onPeriod, setOnPeriod] = useState<boolean>(false)

    const getAndSetData = async () => {
        console.log('getting and setting')
        const periodDates = await getAllPeriodDateEntries(props.db);
        if (periodDates.length > 0){
            console.log('entries found')
            setPeriodDateEntries(periodDates);
            setOnPeriod(isDateStringToday(periodDates[0].date));
        } else {
            console.log('no entries')
            setPeriodDateEntries([]);
            setOnPeriod(false);
        }
        console.log('done getting and setting')
    }

    const updatePeriodDate = async (newUpdate: PeriodDateUpdate) => {
        await updatePeriodStatusForDate(props.db, newUpdate);
        await getAndSetData();
    }

    const clearEntries = async () => {
        await deleteAllPeriodDateEntries(props.db)
        await getAndSetData()
    }
    
    useEffect(() => {
        getAndSetData()
    }, [onPeriod])

    
    // TODO where to put settings/info?
    if (currentPage == PAGE.HOME) {
        return (
            <View style={styles.container}>
                <Header />
                <Text>onPeriod {`${onPeriod}`}</Text>
                <HomePage setNewPeriodStatus={updatePeriodDate} onPeriod={onPeriod}/>
                <Button 
                    onPress={async () => {clearEntries()}}
                    title="clear table"
                />
                <NavBar navigateTo={(page:string) => setCurrentPage(page)}/>
            </View>
        )
    } else if (currentPage == PAGE.MYDATA) {
        return (
            <View style={styles.container}>
                <Header />
                <MyDataPage entries={periodDateEntries}/>
                <NavBar navigateTo={(page:string) => setCurrentPage(page)}/>
            </View>
        )
    // } else {
    //     // just return home or error page for this...?
    //     return (
    //         <View style={styles.container}>
    //             <Header />
    //             <HomePage />
    //             <NavBar navigateTo={(page:string) => setCurrentPage(PAGE.HOME)}/>
    //         </View>
    //     )
    }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      alignContent: "space-between",
    },
});

export default BasePage;