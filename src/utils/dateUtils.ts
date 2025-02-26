import dayjs, {Dayjs} from "dayjs";

import { ISODateString } from "../types";

export const formatDateAsISOString = (date: Dayjs) => {
    // ISO | YYYY-MM-DD
    return date.format('YYYY-MM-DD')
}

export const formatDateAsTitleString = (date: Dayjs) => {
    return date.format('dddd, MMMM D')
}

export const convertISOStringToDate = (isostr: ISODateString) => {
    const customParseFormat = require("dayjs/plugin/customParseFormat");
    dayjs.extend(customParseFormat);
    // ISO | YYYY-MM-DD
    const d = dayjs(isostr,"YYYY-MM-DD")
    return d
}

export const isDateToday = (date: Dayjs) => {
    return date.isSame(dayjs(),'day')
}

export const isDateStringToday = (date: ISODateString) => {
    const today = formatDateAsISOString(dayjs())
    return today == date
}

