import React from "react";

import { open, DB, QueryResult } from "@op-engineering/op-sqlite";

import { formatDateAsISOString, convertISOStringToDate } from "../utils";
import { TABLENAMES } from "../constants";
import { ISODateString, PeriodDateEntry, PeriodDateUpdate } from "../types";
import PeriodHistorySimple from "../components/PeriodHistorySimple";

// TODO break out into multiple services once predictions & settings are implemented

// NOTE sqlite will hang forever if sting literal is in query
// TODO look up how to use table name constants some other way
// NOTE sqlite also seems to get angry when there's the integer primary key autoincrement in a table

export const db = open({name: 'mydata.sqlite'})

export const createTables = async (db: DB) => {
    // removing status field for now bc rly just need whether period was on that day or not
    // if support for spotting later, can easily backfill data
    const periodDatesQuery = `
    CREATE TABLE IF NOT EXISTS periodDates
    (date TEXT NOT NULL UNIQUE);`;

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
    await db.transaction( async tx => {
        await tx.execute(periodDatesQuery);
    })
}


export const updatePeriodStatusForDate = async (db: DB, entry: PeriodDateUpdate) => {
    if (entry.status) {
        // if true then add date
        const query = `INSERT INTO periodDates (date) VALUES (?)`
        await db.execute(query,[entry.date]);
    } else {
        // if false then remove entry
        const query = `DELETE FROM periodDates 
        WHERE date = ?`
        await db.execute(query,[entry.date]);
    }
}

export const getAllPeriodDateEntries = async (db: DB): Promise<PeriodDateEntry[]> => {
    // returns in order most recent to furthest back
    console.log('gettingggg')
    const query = `SELECT date 
    FROM periodDates
    ORDER BY date DESC`
    const entries: PeriodDateEntry[] = [];
    const results = await db.execute(query)
    console.log('queried')
    if (results) {
        results.rows.forEach((result) => {
            for (let index = 0; index < results.rows.length; index++) {
                const entry: PeriodDateEntry = {'date': result.date as ISODateString}
                entries.push(entry)
            }
        });
    }
    console.log(entries)
    return entries
}

export const deleteAllPeriodDateEntries = async (db: DB) => {
    // const query = `DELETE FROM periodDates`;
    const query = `DROP TABLE periodDates`
    await db.execute(query);
    console.log('all entries deleted from periodDates')
}