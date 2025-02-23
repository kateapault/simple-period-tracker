import { DB } from "@op-engineering/op-sqlite";
import dayjs, {Dayjs} from "dayjs"
import { ISODateString, PeriodDateEntry, OverallPeriodStatistics } from "../types";
import { formatDateAsISOString } from "../utils/utils";
import { getAllPeriodDateEntries } from "./dbService";


// stats will be calculated at BasePage level & handed down
export const getFormattedPeriodDatesForStats = (periodDateEntriesEarliestFirst: PeriodDateEntry[]) => {

    const formattedPeriodDates: {[key: string]: number} = {}
    let currKey: string;
    const len = periodDateEntriesEarliestFirst.length
    periodDateEntriesEarliestFirst.forEach((entry, ind) => {
        if (ind == 0 || !dayjs(periodDateEntriesEarliestFirst[ind-1].date).add(1,'day').isSame(dayjs(entry.date))) {
            // more efficient way of checking it...?
            currKey = entry.date as string
            formattedPeriodDates[currKey] = 1
        } else {
            formattedPeriodDates[currKey] = formattedPeriodDates[currKey] + 1
        }
        if (entry.date == formatDateAsISOString(dayjs())) {
            // if currently on period, don't use length bc ongoing
            formattedPeriodDates[currKey] = 0
        }
    });
    console.log(formattedPeriodDates)
    return formattedPeriodDates
} 


export const calculateOverallPeriodStatistics = (formattedPeriodDates: {[key: string]: number}): OverallPeriodStatistics => {
    let recordedStarts = 0
    let totalDaysBetween = 0
    let fullPeriodsRecorded = 0
    let totalDaysLength = 0

    let lastStartDate: string = '';
    if (Object.keys(formattedPeriodDates).length > 1) {
        Object.entries(formattedPeriodDates).forEach((entry: [string, number]) => {
            if (!!lastStartDate) {
                const daysBetween = dayjs(entry[0]).diff(dayjs(lastStartDate), 'day')
                totalDaysBetween += daysBetween
            }
            if (entry[1] > 0) {
                fullPeriodsRecorded += 1
                totalDaysLength += entry[1]
            }
            console.log(`recorded starts ${recordedStarts} | totaldaysbetween ${totalDaysBetween} | laststartdate ${lastStartDate} | total days length ${totalDaysLength}`)
        })
        const avgDaysBetween = Math.round(totalDaysBetween / recordedStarts)
        const avgLength = Math.round(totalDaysLength / fullPeriodsRecorded)
        const stats: OverallPeriodStatistics = {
            totalPeriodsRecorded: recordedStarts,
            averageDaysBetweenPeriodStarts: avgDaysBetween,
            averagePeriodLength: avgLength,
            lastPeriodStartDate: lastStartDate as ISODateString,
        }
        return stats
    } else {
        return {
            totalPeriodsRecorded: Object.keys(formattedPeriodDates).length,
            averageDaysBetweenPeriodStarts: 28,
            averagePeriodLength: 5,
        }
    }

}

// const calculatePredictedDates = (overAll, calculateTilDate?: ISODateString) => {
//     // calculate for a year out for now
//     // oh should probably add a year view to calendar page
//     // make settable? calculate for 3, 6, 9, 12 months? til end of next year?



// }