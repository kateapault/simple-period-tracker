import dayjs, {Dayjs} from "dayjs";
import { COLORS } from "../constants";
import { formatAsCalendarDateEntries, getDaysLeftInPeriod, getDaysLeftTilNextPeriod, getDaysLeftInPeriodText, getDaysLeftTilNextPeriodText } from "./dateService";
import { PeriodDateEntry, PredictedPeriodDateEntry, CalendarDateEntries } from "../types";

const dateStringForTest = '2025-01-01'
const dateForTest = dayjs(dateStringForTest, 'YYYY-MM-DD')

const periodDateEntry = {date: dateForTest}
const predictedPeriodDateEntry = {predictedStatus: 'true', date: dateForTest}

// TODO figure out test constants eg use dateStringForTest
// pytest my beloved i'll never say anything bad about you again
test("formatAsCalendarDateEntries: Formats PeriodDateEntry as CalendarDateEntries obj", () => {
    const expectedPeriodDateOutput = {'2025-01-01': {
        startingDay: true,
        endingDay: true,
        color: COLORS.red,
        textColor: COLORS.white
    }}
    expect(formatAsCalendarDateEntries([periodDateEntry])).toEqual(expectedPeriodDateOutput)
});

test("formatAsCalendarDateEntries: Formats PredictedPeriodDateEntry as CalendarDateEntries obj", () => {
    const expectedPeriodDateOutput = {'2025-01-01': {
        startingDay: true,
        endingDay: true,
        color: COLORS.pink,
        textColor: COLORS.white
    }}
    expect(formatAsCalendarDateEntries([predictedPeriodDateEntry])).toEqual(expectedPeriodDateOutput)
});

// getDaysLeftInPeriod is called when user is onPeriod

test("getDaysLeftInPeriod: period should end in 3 days", () => {
    // period usually lasts 4 days; started today
    expect(getDaysLeftInPeriod(4,dayjs().add(1,'second'))).toEqual(3)
})

test("getDaysLeftInPeriod: avg length period should end today", () => {
    // period usually lasts 4 days; started 3 days ago
    expect(getDaysLeftInPeriod(4,dayjs().subtract(3,'days').add(1,'second'))).toEqual(0)
})

test("getDaysLeftInPeriod: period lasting longer than average", () => {
    // period usually lasts 4 days; started 4 days ago
    expect(getDaysLeftInPeriod(4,dayjs().subtract(4,'days').subtract(1,'second'))).toEqual(-1)
})


// getDaysLeftTilNextPeriod is called when user is NOT onPeriod

test("getDaysLeftTilNextPeriod: period starts in 14 days", () => {
    const daysTil = getDaysLeftTilNextPeriod(28,dayjs().subtract(14,'days').add(1,'second'))
    console.log(`daysTil should be 14, is ${daysTil}`)
    expect(daysTil).toEqual(14)
})

test("getDaysLeftTilNextPeriod: period starts tomorrow", () => {
    const daysTil = getDaysLeftTilNextPeriod(28,dayjs().subtract(27,'days').add(1,'second'))
    console.log(`daysTil should be 1, is ${daysTil}`)
    expect(daysTil).toEqual(1)
})

test("getDaysLeftTilNextPeriod: period start is overdue", () => {
    expect(getDaysLeftTilNextPeriod(28,dayjs().subtract(29,'days').subtract(1,'second'))).toEqual(-1)
})



// super simple functions but test to prevent >= / <= mixups
test("getDaysLeftTilNextPeriodText: overdue -> period probably starts today", () => {
    expect(getDaysLeftTilNextPeriodText(-3)).toEqual('your next period will probably start today')
})

test("getDaysLeftTilNextPeriodText: today -> period probably starts today", () => {
    expect(getDaysLeftTilNextPeriodText(0)).toEqual('your next period will probably start today')
})

test("getDaysLeftTilNextPeriodText: predicted tomorrow -> period probably starts tomorrow", () => {
    expect(getDaysLeftTilNextPeriodText(1)).toEqual('your next period will probably start tomorrow')
})

test("getDaysLeftTilNextPeriodText: predicted further out -> period starts in X days", () => {
    expect(getDaysLeftTilNextPeriodText(10)).toEqual(`your next period will probably start in 10 days`)
})