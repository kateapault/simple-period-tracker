import React from "react";

import { open, DB, QueryResult } from "@op-engineering/op-sqlite";

import { formatDateAsISOString, convertISOStringToDate } from "../utils/utils";
import { TABLENAMES } from "../constants";
import { ISODateString, PeriodDateEntry, PeriodDateUpdate } from "../types";
import PeriodHistorySimple from "../components/PeriodHistorySimple";

// TODO break out into multiple services once predictions & settings are implemented

// NOTE sqlite will hang forever if sting literal is in query
// TODO look up how to use table name constants some other way
// NOTE sqlite also seems to get angry when there's the integer primary key autoincrement in a table

export const db = open({name: 'mytestdb.sqlite', location: 'db'})

export const createTables = async (db: DB) => {
    try {
        // removing status field for now bc rly just need whether period was on that day or not
        // if support for spotting later, can easily backfill data
        const periodDatesQuery = `
        CREATE TABLE IF NOT EXISTS periodDates(
            date TEXT NOT NULL UNIQUE
        );`;
        
        
        // const settingsQuery = `
        // CREATE TABLE IF NOT EXISTS ${TABLENAMES.settings}(
            //     id INTEGER DEFAULT 1,
            //     colorScheme varchar(500),
            //     PRIMARY KEY (id)
            // );`
            
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
    const tq = `SELECT COUNT(date) FROM periodDates`
    const b = await db.execute(tq)
    console.log(`# records before update=`)
    console.log(b.rows)
    let query: string = ''
    if (entry.status) {
        // if true add entry
        console.log('adding status')
        query = `INSERT INTO periodDates (date) VALUES (?)`
    } else {
        // if false then remove entry
        console.log('removing status')
        query = `DELETE FROM periodDates WHERE date = ?`
    }
    try {
        await db.execute(query,[entry.date as string]);
        console.log('update complete')
    } catch(err) {
        console.log(`updatePeriodStatusForDate: ${err}`)
    }
    const a = await db.execute(tq)
    console.log(`# records after update=`)
    console.log(a.rows)
}

export const getAllPeriodDateEntries = async (db: DB, latestFirst: boolean = true): Promise<PeriodDateEntry[]> => {
    // returns in order most recent to furthest back
    console.log('gettingggg')
    let query: string
    if (latestFirst) {
        query = `SELECT * 
        FROM periodDates
        ORDER BY date DESC`
    } else {
        query = `SELECT * FROM periodDates`
    }

    const entries: PeriodDateEntry[] = [];
    try {
        const results = await db.execute(query)
        if (results) {
            results.rows.forEach((result) => {
                const entry: PeriodDateEntry = {'date': result.date as ISODateString}
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
        const query = `DELETE FROM periodDates`;
        // console.log('dropping table....')
        // const query = `DROP TABLE periodDates`
        await db.transaction(async tx => {
            await tx.execute(query)
        });
        console.log('all entries deleted from periodDates')
    } catch(err) {
        console.log(err)
    }
}