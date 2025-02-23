import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';
import { DB } from '@op-engineering/op-sqlite';
import dayjs from 'dayjs';

import { PAGE } from '../constants';
import { PeriodDateEntry, PeriodDateUpdate } from '../types';
import { formatDateAsISOString, isDateToday } from '../utils';

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
        console.log(`period dates from get all ${periodDates}`)
        if (periodDates.length > 0){
            setPeriodDateEntries(periodDates);
            console.log(`${periodDates}`)
            console.log(`${periodDates[0]}`)
            setOnPeriod(isDateToday(periodDates[0].timeStamp));
            console.log(`on period: ${onPeriod}`)
        } else {
            setPeriodDateEntries([]);
            setOnPeriod(false);
            console.log('no data yet')
        }
        console.log('done getting and setting')
    }

    const updatePeriodDate = async (newUpdate: PeriodDateUpdate) => {
        console.log('updating period date')
        await updatePeriodStatusForDate(props.db, newUpdate);
        console.log('updated status in db')
        await getAndSetData();
        console.log('got and set data')
    }

    const clearEntries = async () => {
        console.log('clearing')
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
                <HomePage setNewPeriodStatus={updatePeriodDate} onPeriod={onPeriod}/>
                <Text>{`${periodDateEntries}`}</Text>
                <Button 
                    onPress={async () => {clearEntries()}}
                    title="clear db"
                />
                <NavBar navigateTo={(page:string) => setCurrentPage(page)}/>
            </View>
        )
    } else if (currentPage == PAGE.MYDATA) {
        return (
            <View style={styles.container}>
                <Header />
                <MyDataPage />
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