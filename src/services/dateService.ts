import dayjs, { Dayjs } from "dayjs"
import { COLORS } from "../constants"
import { CalendarDateEntries, PeriodDateEntry, PredictedPeriodDateEntry } from "../types"
import { formatDateAsISOString } from "../utils/dateUtils"


export const formatAsCalendarDateEntries = (entries: PeriodDateEntry[] | PredictedPeriodDateEntry[]): CalendarDateEntries => {
    const formatted: {[k: string]: any} = {}
    if (entries?.length > 0) {
        const predicted = Object.hasOwn(entries[0] as object, 'predictedStatus')
        console.log(entries[0], predicted)
        entries.forEach((e) => {
            formatted[formatDateAsISOString(e.date)] = {
                startingDay: true,
                endingDay: true,
                color: predicted ? COLORS.pink : COLORS.red,
                textColor: COLORS.white,
            }
        })
    }
    console.log(formatted)
    return formatted
}

export const getDaysLeftInPeriod = (averagePeriodLength: number, lastStartDate?: Dayjs) => {
    if (lastStartDate) {
        const endDate = lastStartDate.add(averagePeriodLength-1, 'days')
        return endDate.diff(dayjs(),'days')
    }
    return 0
}

export const getDaysLeftInPeriodText = (diff: number) => {
    return (diff > 0) ? `about ${diff} days left` : `today is probably the last day`
}

export const getDaysLeftTilNextPeriod = (averageDaysBetweenStarts: number, lastStartDate?: Dayjs) => {
    if (lastStartDate) {
        const nextDate = lastStartDate.add(averageDaysBetweenStarts,'days')
        return nextDate.diff(dayjs(),'days')
    }
    return 0
}

export const getDaysLeftTilNextPeriodText = (diff: number) => {
    if (diff >= 0) {
        return `your next period will probably start today`
    } else if (diff == 1) {
        return `your next period will probably start tomorrow`
    } else {
        return `your next period will probably start in ${diff} days`
    }
}