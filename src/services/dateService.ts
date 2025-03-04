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
        // -1 because the day the period started is day 1 not day 0
        const endDate = lastStartDate.add(averagePeriodLength-1, 'days')
        return endDate.diff(dayjs(),'days')
    }
    console.log('daysleft: no last start date')
    return 0
}

export const getDaysLeftInPeriodText = (diff: number) => {
    console.log(`daysleftin: ${diff}`)
    if (diff <= 0) {
        return 'likely the last day'
    } else if (diff == 1) {
        return 'about 1 day left'
    } else {
        return `about ${diff} days left`
    }
}

export const getDaysLeftTilNextPeriod = (averageDaysBetweenStarts: number, lastStartDate?: Dayjs) => {
    if (lastStartDate) {
        const nextDate = lastStartDate.add(averageDaysBetweenStarts,'day')
        const diff = nextDate.diff(dayjs(),'day')
        console.log(`diff days til next ${diff}`)
        console.log(`diff days til next evald ${nextDate.diff(dayjs(),'days')}`)
        return diff
    }
    return 0
}

export const getDaysLeftTilNextPeriodText = (diff: number) => {
    console.log(`tilnext diff ${diff}`)
    if (diff <= 0) {
        return `(your next period will probably start today)`
    } else if (diff == 1) {
        return `(your next period will probably start tomorrow)`
    } else {
        return `(your next period will probably start in ${diff} days)`
    }
}