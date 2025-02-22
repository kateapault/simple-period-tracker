export type TestEntry = {
    value: string,
    id?: number
}


export type PeriodStatusEntry = {
    status: number, // 1 for period; not in table otherise. or make one str of options for spotting?
    timeStamp: Date, 
    // sqlite has no Date or Datetime type
    // .toLocaleDateString() should be called before db entries
    // TODO enforce this better / add validation
}

export type PredictedPeriodStatusEntry = {
    timeStamp: Date,
    predictedStatus: string,
    actualStatus: string, //nullable in db
}