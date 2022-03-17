import { Theme } from "../../../redux/appCommon/types"
import { calculateDate, calculateMonth, calculateTimeSince, CustomAlert, isDarkTheme, isNonEmptyArray, isObjectNonEmpty } from ".."
import { arabic } from "src/assets/locales/ar/common-ar"
import { Alert } from "react-native"

describe('<Utilities>', () => {

    beforeEach(() => {
        jest.useFakeTimers()
    })

    global.afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
      });


    it('Check isDarkTheme', () => {
        const isDark = isDarkTheme(Theme.DARK)
        expect(isDark).toBeTruthy()
    })

    it('Check alert method', () => {
        jest.spyOn(Alert, 'alert');
        const alertInfo = {
            title: 'title',
            message: 'Message',
            data: [{ text: 'نعم', onPress: () => jest.fn() }]
        }
        CustomAlert({...alertInfo})
        jest.runAllTimers(); // or jest.advanceTimersByTime(1000)
        expect(Alert.alert).toHaveBeenCalled()

    })

    describe('<<< isObjectNonEmpty >>>', () => {
        it('Check isObjectNonEmpty with not empty data', () => {
            const data: any = {
                name: 'Name'
            }
            const result = isObjectNonEmpty(data)
            expect(result).toBeTruthy()
        })

        it('Check isObjectNonEmpty with empty data', () => {
            const data: any = {}
            const result = isObjectNonEmpty(data)
            expect(result).toBeFalsy()
        })
    })


    describe('<<< isNonEmptyArray >>>', () => {
        it('Check isNonEmptyArray with not empty data', () => {
            const data: any = [{
                name: 'Name'
            }]
            const result = isNonEmptyArray(data)
            expect(result).toBeTruthy()
        })

        it('Check isNonEmptyArray with empty data', () => {
            const data: any = []
            const result = isNonEmptyArray(data)
            expect(result).toBeFalsy()
        })
    })

    describe('<<< Time Ago >>>', () => {
        it('Check calculate time since', () => {
            const date = "2021-05-20T21:05:00+0000"
            const result = calculateTimeSince(date)
            expect(result).toBe('timeSince.just_now')
        })

        it('Check calculate time with current time', () => {
            const date =new Date().getTime()
            const result = calculateTimeSince(date)
            expect(result).toBe('0 timeSince.seconds')
        })

        it('Check calculate time for from now', () => {
            const date =new Date().getTime() + 100
            const result = calculateTimeSince(date)
            expect(result).toBe('0 timeSince.seconds')
        })

        xit('Check date is return correctly', () => {
            const date = "2021-05-20T21:05:00+0000"
            const result = calculateDate(date)
            expect(result).toBe(21)
        })

        it('Check month is return correctly', () => {
            const date = "2021-05-20T21:05:00+0000"
            const result = calculateMonth(date)
            expect(result).toBe(arabic.months[4])
        })
    })

})