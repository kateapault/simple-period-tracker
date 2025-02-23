import { Dayjs } from "dayjs"


// used to store entries from the db
export type PeriodDateEntry = {
    timeStamp: Dayjs, 
    // sqlite has no Date or Datetime type so stored as text
    // conversions between Date & string all happen in db service
}

// used to add/change record for date in db
export type PeriodDateUpdate = {
    status: boolean, // new status for that date
    timeStamp: Dayjs, // see note for PeriodDateEntry
}


export type PredictedPeriodDateEntry = {
    timeStamp: Dayjs, // see note for PeriodDateEntry
    predictedStatus: string,
    actualStatus: string, // nullable in db
}

