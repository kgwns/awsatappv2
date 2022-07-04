import { Theme } from "../../../redux/appCommon/types"
import { calculateDate, calculateMonth, calculateTimeSince, CustomAlert, isDarkTheme, isNonEmptyArray, isObjectNonEmpty } from ".."
import { arabic } from "src/assets/locales/ar/common-ar"
import { Alert } from "react-native"
import { getFormatedDate, getFullDate, getPodcastDate, getPodcastUrl, getProfileImageUrl, getSecondsToHms, isNotEmpty, isValidHttpUrl, joinArray } from "../utilities"

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


        it('Check month is return correctly', () => {
            const date = "2021-05-20T21:05:00+0000"
            const result = calculateMonth(date)
            expect(result).toBe(arabic.months[4])
        })
    })

    describe('<<< joinArray >>>', () => {
        it('Check joinArray with empty data', () => {
            const data: any = []
            const result = joinArray(data)
            expect(result).toBe('')
        })

        it('Check joinArray with not empty data', () => {
            const data: any = ['1','2','3']
            const result = joinArray(data)
            expect(result).toBe("1,2,3")
        })
    })

    describe('<<< isNotEmpty >>>', () => {
        it('Check isNotEmpty with empty data', () => {
            const data: any = null
            const result = isNotEmpty(data)
            expect(result).toBeFalsy()
        })

        it('Check isNotEmpty with not empty data', () => {
            const data: any = 'Awsat'
            const result = isNotEmpty(data)
            expect(result).toBeTruthy()
        })
    })

    describe('<<< isValidHttpUrl >>>', () => {
        it('Check isValidHttpUrl with InValidHTTp', () => {
            const data: any = 'awsat'
            const result = isValidHttpUrl(data)
            expect(result).toBeFalsy()
        })

        it('Check isValidHttpUrl with ValidHTTP', () => {
            const data: any = 'http://awsat.com'
            const result = isValidHttpUrl(data)
            expect(result).toBeTruthy()
        })
    })

    describe('<<< getSecondsToHms >>>', () => {
        it('Check getSecondsToHms', () => {
            const data: any = 3000
            const result = getSecondsToHms(data)
            expect(result).toBe('50')
        })
    })

    describe('<<< getPodcastDate >>>', () => {
        it('Check getPodcastDate', () => {
            const data: any = '2013-05-28T16:16:54+0000'
            const result = getPodcastDate(data)
            expect(result).toBe('مايو, 28 مايو')
        })
    })

    describe('<<< getPodcastUrl >>>', () => {
        it('Check getPodcastUrl', () => {
            const data: any = '123'
            const result = getPodcastUrl(data)
            expect(result).toBe("https://api.spreaker.com/v2/episodes/123/play.mp3")
        })
    })

    describe('<<< getFormatedDate >>>', () => {
        it('Check getFormatedDate', () => {
            const data: any = '2013-05-28T16:16:54+0000'
            const result = getFormatedDate(data)
            expect(result).toBe('2013.5.28')
        })
    })

    describe('<<< getFullDate >>>', () => {
        it('Check getFullDate', () => {
            const data: any = '2013-05-28T16:16:54+0000'
            const result = getFullDate(data)
            expect(result).toBe('28 مايو 2013')
        })
    })

    describe('<<< getProfileImageUrl >>>', () => {
        it('Check getProfileImageUrl', () => {
            const data: any = 'https://picsum.photos/200'
            const result = getProfileImageUrl(data)
            expect(result).toBe('https://picsum.photos/200')
        })
    })
  

})