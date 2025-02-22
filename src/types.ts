export type TestEntry = {
    value: string,
    id?: number
}


export type PeriodDateEntry = {
    timeStamp: Date, 
    // sqlite has no Date or Datetime type so stored as text
    // .toLocaleDateString() should be called before db entries
    // TODO enforce this better / add validation
}

export type PredictedPeriodDateEntry = {
    timeStamp: Date, // see note for PeriodDateEntry
    predictedStatus: string,
    actualStatus: string, //nullable in db
}