import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button,} from 'react-native';

import { PAGE } from '../constants';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import MyDataPage from './MyDataPage';


const BasePage = () => {
    const [currentPage, setCurrentPage] = useState<string>(PAGE.HOME)

    // TODO where to put settings/info?

    if (currentPage == PAGE.HOME) {
        return (
            <View style={styles.container}>
                <Header />
                <HomePage />
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
    } else {
        // just return home or error page for this...?
        return (
            <View style={styles.container}>
                <Header />
                <HomePage />
                <NavBar navigateTo={(page:string) => setCurrentPage(PAGE.HOME)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      alignContent: "space-between",
    },
});

export default BasePage;