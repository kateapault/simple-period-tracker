import { DB } from "@op-engineering/op-sqlite";
import dayjs, {Dayjs, } from "dayjs"
import { ISODateString, PeriodDateEntry, OverallPeriodStatistics, PredictedPeriodDateEntry } from "../types";
import { formatDateAsISOString, isDateToday } from "../utils/dateUtils";
import { getAllPeriodDateEntries } from "./dbService";

// stats will be calculated at BasePage level & handed down
export const getFormattedPeriodDatesForStats = (periodDateEntries: PeriodDateEntry[]) => {
    // if (periodDateEntries.length > 1 && dayjs(periodDateEntries[0].date).isBefore(dayjs(periodDateEntries[1].date))) {
            // periodDateEntries.reverse()
    // }
    const formattedPeriodDates: {[key: string]: number} = {}
    let currKey: string;
    const len = periodDateEntries.length
    periodDateEntries.forEach((entry, ind) => {
        if (ind == 0 || !periodDateEntries[ind-1].date.add(1,'day').isSame(entry.date,'day')) {
            // more efficient way of checking it...?
            currKey = formatDateAsISOString(entry.date) as string
            formattedPeriodDates[currKey] = 1
        } else {
            formattedPeriodDates[currKey] = formattedPeriodDates[currKey] + 1
        }
        
        if (isDateToday(entry.date)) {
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

    let lastStartDate: string | undefined;
    if (Object.keys(formattedPeriodDates).length > 1) {
        Object.entries(formattedPeriodDates).forEach((entry: [string, number]) => {
            recordedStarts += 1
            if (lastStartDate) {
                // console.log(`laststartdate ${lastStartDate}`)
                const daysBetween = dayjs(entry[0]).diff(dayjs(lastStartDate), 'day')
                totalDaysBetween += daysBetween
            }
            if (entry[1] > 0) {
                fullPeriodsRecorded += 1
                totalDaysLength += entry[1]
            }
            lastStartDate = entry[0]
            // console.log(`startdate ${entry[0]} | days ${entry[1]} | recorded starts ${recordedStarts} | totaldaysbetween ${totalDaysBetween} | laststartdate ${lastStartDate} | total days length ${totalDaysLength}`)
        })
        const avgDaysBetween = Math.round(totalDaysBetween /  (recordedStarts-1))
        const avgLength = Math.round(totalDaysLength / fullPeriodsRecorded)
        const stats: OverallPeriodStatistics = {
            totalPeriodsRecorded: recordedStarts,
            averageDaysBetweenPeriodStarts: avgDaysBetween,
            averagePeriodLength: avgLength,
            lastPeriodStartDate: dayjs(lastStartDate),
        }
        console.log(stats)
        return stats
    } else {
        return {
            totalPeriodsRecorded: Object.keys(formattedPeriodDates).length,
            averageDaysBetweenPeriodStarts: 28,
            averagePeriodLength: 5,
        }
    }

}

export const calculatePredictedDates = (overallPeriodStatistics: OverallPeriodStatistics, calculateTilDate?: ISODateString): PredictedPeriodDateEntry[] => {
    // oh should probably add a year view to calendar page
    // make settable? calculate for 3, 6, 9, 12 months? til end of next year?
    const dates: PredictedPeriodDateEntry[] = []
    if (overallPeriodStatistics.lastPeriodStartDate) {
        const calculateTil = calculateTilDate ? dayjs(calculateTilDate) : dayjs().add(12,'months')
        const lastStart = dayjs(overallPeriodStatistics.lastPeriodStartDate)
        let nextStart = lastStart;
        while (nextStart.isBefore(calculateTil)) {
            const nextNextStart =  nextStart.add(overallPeriodStatistics.averageDaysBetweenPeriodStarts, 'days');
            dates.push({
                date: nextNextStart,
                predictedStatus: 'true', // may change to 'less likely' / 'more likely' or sth similar when calc improves
            });
            for (let i = 1; i < overallPeriodStatistics.averagePeriodLength; i++) {
                dates.push({
                    date: nextNextStart.add(i,'days'),
                    predictedStatus: 'true',
                })
            }
            nextStart = nextNextStart;
        }
    } else {
        console.log('not enough info to predict future periods')
    }

    return dates
}