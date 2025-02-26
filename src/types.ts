import { Dayjs } from "dayjs"

// hacky but valid use case so idc
// TODO MAYBE account for valid dates eg no 04-31
type ValidDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type ValidYearString = `20${ValidDigit}${ValidDigit}`
type ValidMonthString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
type ValidDateString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '22' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31'

export type ISODateString = `${ValidYearString}-${ValidMonthString}-${ValidDateString}`
// sqlite has no Date or Datetime type so stored as text
// Calendar also uses YYYY-MM-DD strings so this is gonna be the validated thing

// NOTE ON DATES - where used with the Calendar, stored as ISODateString
// everywhere else as Dayjs bc less conversion for calcs

// used to store entries from the db
export type PeriodDateEntry = {
    date: Dayjs, 
}

// used to submit request to add/change record for date in db
export type PeriodDateUpdate = {
    status: boolean, // new status for that date
    date: ISODateString, 
}


export type PredictedPeriodDateEntry = {
    date: Dayjs,
    predictedStatus: string,
    actualStatus?: string, // nullable in db
}

export type CalendarDateSettings = {
    startingDay: true,
    endingDay: true,
    color: string,
    textColor: string,
}

export type CalendarDateEntries = {[key: string]: CalendarDateSettings}


export type OverallPeriodStatistics = {
    totalPeriodsRecorded: number,
    averagePeriodLength: number,
    averageDaysBetweenPeriodStarts: number,
    lastPeriodStartDate?: Dayjs,
}

