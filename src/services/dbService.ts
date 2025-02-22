import React from "react";

import { DB } from "@op-engineering/op-sqlite";

import { TABLENAMES } from "../constants";
import { PeriodDateEntry } from "../types";
import PeriodHistorySimple from "../components/PeriodHistorySimple";

// TODO break out into multiple services once predictions & settings are implemented

export const createTables = (db: DB) => {
    // removing status field for now bc rly just need whether period was on that day or not
    // if support for spotting later, can easily backfill data
    const periodDatesQuery = `
    CREATE TABLE IF NOT EXISTS ${TABLENAMES.periodDates}
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    timeStamp TEXT NOT NULL UNIQUE, 
    );`;

    // const settingsQuery = `
    // CREATE TABLE IF NOT EXISTS ${TABLENAMES.settings}(
    //     id INTEGER DEFAULT 1,
    //     colorScheme varchar(500),
    //     PRIMARY KEY (id)
    // );`

    // const predictionsQuery = `
    // CREATE TABLE IF NOT EXISTS ${TABLENAMES.predictedStatus}(
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     timeStamp date NOT NULL,
    //     predictedStatus varchar(255) NOT NULL,
    //     actualStatus varchar(255),
    //   );`;

    // op-sqlite allows for synchronous requests & there will only be a handful of tables
    db.execute(periodDatesQuery)
}

// TODO change to insert or update in next phase by date
export const addPeriodDateEntry = async (db: DB, entry: PeriodDateEntry) => {
    const query = `INSERT INTO ${TABLENAMES.periodDates} 
    (timeStamp)
    VALUES (${entry.timeStamp.toLocaleDateString()})`

    await db.execute(query)
}

export const getAllPeriodDateEntries = async (db: DB) => {
    const query = `SELECT id, timeStamp, status FROM ${TABLENAMES.periodDates}`
}

export const deleteAllPeriodDateEntries = async (db: DB) => {
    const query = `DELETE FROM ${TABLENAMES.periodDates}`;
    await db.execute(query);
}