import dayjs, {Dayjs} from "dayjs";


export const formatDateAsISOString = (date) => {
    // ISO | YYYY-MM-DD
    const isoString = date.format();
    return isoString.split('T')[0]
}


export const convertISOStringToDate = (isostr) => {
    const customParseFormat = require("dayjs/plugin/customParseFormat");
    dayjs.extend(customParseFormat);
    // ISO | YYYY-MM-DD
    const d = dayjs(isostr,"YYYY-MM-DD")
    return d
}


export const isDateToday = (date) => {
    const today = dayjs()
    return (
        date.year() == today.year() 
        && date.month() == today.month()
        && date.date() == today.date()
    )
}