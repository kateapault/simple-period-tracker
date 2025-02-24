import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Modal,} from 'react-native';
import { DB } from '@op-engineering/op-sqlite';
import dayjs from 'dayjs';

import { PAGE, COLORS } from '../constants';
import { PeriodDateEntry, PeriodDateUpdate, OverallPeriodStatistics, PredictedPeriodDateEntry } from '../types';
import { formatDateAsISOString, isDateToday, isDateStringToday } from '../utils/utils';
import { calculateOverallPeriodStatistics, getFormattedPeriodDatesForStats, calculatePredictedDates } from '../services/predictionService';

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
    // use default data to get initial predictions
    // TODO add something somewhere like "you don't have a lot of data yet, so the predictions are based off of common values. the predictions will get more accurate for you once you have more recorded"
    const [overallStats, setOverallStats] = useState<OverallPeriodStatistics>({totalPeriodsRecorded: 0, averagePeriodLength: 5, averageDaysBetweenPeriodStarts: 28})
    const [predictedPeriodDates, setPredictedPeriodDates] = useState<PredictedPeriodDateEntry[]>([])
    // const [notEnoughData, setNotEnoughData] = useState<boolean>(false)
    // const [loading, setLoading] = useState<boolean>((periodDateEntries.length == 0 && !overallStats) || !notEnoughData)

    const setPredictions = async () => {
        console.log('calculating predictions')
        const entries = await getAllPeriodDateEntries(props.db, false);
        // TODO measure later if faster to call db vs reversing string; using this for now
        const formattedDates = getFormattedPeriodDatesForStats(entries)
        const stats = await calculateOverallPeriodStatistics(formattedDates);
        setOverallStats(stats);
        const predicted = await calculatePredictedDates(stats);
        setPredictedPeriodDates(predicted);
    }

    const getAndSetData = async () => {
        const periodDates = await getAllPeriodDateEntries(props.db);
        await setPredictions();
        if (periodDates.length > 0){
            console.log('entries found')
            setPeriodDateEntries(periodDates);
            setOnPeriod(isDateToday(periodDates[0].date));

        } else {
            console.log('no entries')
            setPeriodDateEntries([]);
            setOnPeriod(false);
        }
        console.log('getAndSetData finished')
    }

    const updatePeriodDateStatus = async (newUpdate: PeriodDateUpdate) => {
        await updatePeriodStatusForDate(props.db, newUpdate);
        await getAndSetData();
    }

    const deleteAllPeriodData = async () => {
        await deleteAllPeriodDateEntries(props.db)
        await getAndSetData()
    }
    
    useEffect(() => {
        getAndSetData()
        return () => {}
    }, [onPeriod])

    
    // TODO where to put settings/info?
    if (currentPage == PAGE.HOME) {
        return (
            <View style={styles.container}>
                <Header />
                <HomePage 
                    updatePeriodDateStatus={updatePeriodDateStatus} onPeriod={onPeriod}
                    overallPeriodStatistics={overallStats}
                />
                <NavBar navigateTo={(page:string) => setCurrentPage(page)}/>
            </View>
        )
    } else if (currentPage == PAGE.MYDATA) {
        return (
            <View style={styles.container}>
                <Header />
                <MyDataPage 
                    periodDateEntries={periodDateEntries} 
                    updatePeriodDateStatus={updatePeriodDateStatus}
                    predictedPeriodDates={predictedPeriodDates}
                    deleteAllPeriodData={deleteAllPeriodData}
                />
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
      backgroundColor: COLORS.darkest,
      color: COLORS.lightest,
    },
});

export default BasePage;