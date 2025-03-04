import { getFormattedPeriodDatesForStats, calculateOverallPeriodStatistics, calculatePredictedDates } from "./statisticsService";


test('placeholder', () => {
    expect(1 + 2).toEqual(3)
})
// getFormattedPeriodDatesForStats
// return empty if no data
// for single period that's ended, get correct output ('datestr': #days)
// for single period that's ongoing, get correct output ('datestr': 0)


// calculateOverallPeriodStatistics
// return basic template if no data
// return expected stats with two past periods
// return expected stats with two past and one current period


// calculatePredictedDates
// return empty if not enough info
// return expected array