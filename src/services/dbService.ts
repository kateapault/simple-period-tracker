import React from "react";

import { DB } from "@op-engineering/op-sqlite";

import { TABLENAMES } from "../constants";
import { PeriodStatusEntry } from "../types";
import PeriodHistorySimple from "../components/PeriodHistorySimple";

// TODO break out into multiple services once predictions & settings are implemented

export const createTables = (db: DB) => {
    const periodStatusQuery = `
    CREATE TABLE IF NOT EXISTS ${TABLENAMES.periodStatus}
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    timeStamp date NOT NULL, 
    status integer NOT NULL,
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
    db.execute(periodStatusQuery)
}

// TODO change to insert or update in next phase by date
export const addPeriodStatusEntry = async (db: DB, entry: PeriodStatusEntry) => {
    const query = `INSERT INTO ${TABLENAMES.periodStatus} 
    (timeStamp, status)
    VALUES (${entry.timeStamp.toLocaleDateString()}, ${entry.status})`

    await db.execute(query)
}

export const getAllPeriodStatusEntries = async (db: DB) => {
    const query = `SELECT id, timeStamp, status FROM ${TABLENAMES.periodStatus}`
}

export const deleteAllPeriodStatusEntries = async (db: DB) => {
    const query = `DELETE FROM ${TABLENAMES.periodStatus}`;
    await db.execute(query);
}