import dayjs, {Dayjs} from "dayjs";

import { ISODateString } from "./types";

export const colors = {
    red: 'red',
}

export const formatDateAsISOString = (date: Dayjs) => {
    // ISO | YYYY-MM-DD
    const isoString = date.format();
    return isoString.split('T')[0]
}


export const convertISOStringToDate = (isostr: ISODateString) => {
    const customParseFormat = require("dayjs/plugin/customParseFormat");
    dayjs.extend(customParseFormat);
    // ISO | YYYY-MM-DD
    const d = dayjs(isostr,"YYYY-MM-DD")
    return d
}


export const isDateToday = (date: Dayjs) => {
    const today = dayjs()
    return (
        date.year() == today.year() 
        && date.month() == today.month()
        && date.date() == today.date()
    )
}

export const isDateStringToday = (date: ISODateString) => {
    const today = formatDateAsISOString(dayjs())
    return today == date
}
