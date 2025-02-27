import React from "react";
import dayjs from "dayjs";
import { open, DB, QueryResult } from "@op-engineering/op-sqlite";
import { generateSecureRandom } from "react-native-securerandom";
import * as Keychain from 'react-native-keychain';

import { formatDateAsISOString, convertISOStringToDate } from "../utils/dateUtils";
import { TABLENAMES } from "../constants";
import { ISODateString, PeriodDateEntry, PeriodDateUpdate } from "../types";
import PeriodHistorySimple from "../components/PeriodHistorySimple";

// TODO break out into multiple services once predictions & settings are implemented

export const configureEncryption = async () => {
    try {
        const creds = await Keychain.getGenericPassword();
        if (creds) {
            return creds.password
        } else {
            const secureBytes = await generateSecureRandom(42);
            const key = btoa(String.fromCharCode.apply(null, Array.from(secureBytes)))
            await Keychain.setGenericPassword('myKey',key)
            return key
        }
    } catch(err) {
        console.log(err)
    }
    
}


export const opendb = async (dbName: string, dbLocation: string, encrypted: boolean = true) => {
    if (encrypted) {
        const myKey = await configureEncryption()
        return open({name: dbName, location: dbLocation, encryptionKey: myKey})
    } else {
        return open({name: dbName, location: dbLocation})
    }
}

const PERIODDATES: string = 'periodDates'

export const createTables = async (db: DB) => {
    try {
        // removing status field for now bc rly just need whether period was on that day or not
        // if support for spotting later, can easily backfill data
        const periodDatesQuery = `
        CREATE TABLE IF NOT EXISTS ` + PERIODDATES + `(
            date TEXT NOT NULL UNIQUE
        );`;
        
        
        // const settingsQuery = `
        // CREATE TABLE IF NOT EXISTS ${TABLENAMES.settings}(
            //     id INTEGER DEFAULT 1,
            //     colorScheme varchar(500),
            //     PRIMARY KEY (id)
            // );`
        

        // NOTE does this actually need to go in the db? useful to track actual vs predicted...?
        // const predictionsQuery = `
        // CREATE TABLE IF NOT EXISTS ${TABLENAMES.predictedStatus}(
            //     date date NOT NULL UNIQUE,
            //     predictedStatus varchar(255) NOT NULL,
            //     actualStatus varchar(255),
            //   );`;
        // await db.transaction( async tx => {
        //     await tx.execute(periodDatesQuery);
        // })
        await db.execute(periodDatesQuery)
        console.log('tables created in db')
    } catch(err) {
        console.log(err)
    }
}


export const updatePeriodStatusForDate = async (db: DB, entry: PeriodDateUpdate) => {
    let query: string = ''
    if (entry.status) {
        // if true add entry
        console.log('adding status')
        query = `INSERT INTO ` + PERIODDATES + ` (date) VALUES (?)`
    } else {
        // if false then remove entry
        console.log('removing status')
        query = `DELETE FROM ` + PERIODDATES + ` WHERE date = ?`
    }
    try {
        await db.execute(query,[entry.date as string]);
        console.log('update complete')
    } catch(err) {
        console.log(`updatePeriodStatusForDate: ${err}`)
    }
}

export const getAllPeriodDateEntries = async (db: DB, latestFirst: boolean = true): Promise<PeriodDateEntry[]> => {
    // returns in order most recent to furthest back
    console.log('gettingggg')
    let query: string = 'SELECT * FROM ' + PERIODDATES + ' ORDER BY date'
    if (latestFirst) {
        query += ' DESC'
    }
    const entries: PeriodDateEntry[] = [];
    try {
        const results = await db.execute(query)
        if (results) {
            results.rows.forEach((result) => {
                const entry: PeriodDateEntry = {'date': dayjs(result.date as string)}
                entries.push(entry)
            });
        }
    } catch(err) {
        console.log(`getAllPeriodDateEntries: ${err}`)
    }
    return entries
}

export const deleteAllPeriodDateEntries = async (db: DB) => {
    try {
        console.log('dropping entries..')
        const query = `DELETE FROM ` + PERIODDATES;
        await db.transaction(async tx => {
            await tx.execute(query)
        });
        console.log('all entries deleted from periodDates')
    } catch(err) {
        console.log(err)
    }
}