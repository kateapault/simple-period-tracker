// hacky but valid use case so idc
// TODO MAYBE account for valid dates eg no 04-31
type ValidDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type ValidYearString = `20${ValidDigit}${ValidDigit}`
type ValidMonthString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
type ValidDateString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '22' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31'

export type ISODateString = `${ValidYearString}-${ValidMonthString}-${ValidDateString}`
// sqlite has no Date or Datetime type so stored as text
// Calendar also uses YYYY-MM-DD strings so this is gonna be the validated thing
// any date comparisons or date math will be handled by utils which will convert inside function



// used to store entries from the db
export type PeriodDateEntry = {
    date: ISODateString, 
}

// used to add/change record for date in db
export type PeriodDateUpdate = {
    status: boolean, // new status for that date
    date: ISODateString,
}


export type PredictedPeriodDateEntry = {
    date: ISODateString,
    predictedStatus: string,
    actualStatus: string, // nullable in db
}

export type CalendarEntry = {
    date: ISODateString,
    selected: boolean,
    selectedColor: string,
}


