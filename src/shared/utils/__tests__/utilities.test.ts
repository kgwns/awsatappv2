import { Theme } from "../../../redux/appCommon/types"
import { calculateDate, calculateMonth, CustomAlert, isDarkTheme, isNonEmptyArray, isObjectNonEmpty } from ".."
import { arabic } from "src/assets/locales/ar/common-ar"
import { Alert } from "react-native"
import { calculateDateNumber, calculateDay, calculateHour, calculateMinutes, calculateMothNumber, calculateNonUtcDate, calculateNonUtcDateNumber, calculateNonUtcMonth, calculateNonUtcYear, convertSecondsToHMS, DateIcon, dateTimeAgo, decodeHTMLTags, getArticleImage, getConvertedTime, getCountryNameFromCode, getDay, getDeviceName, getFormattedDate, getFullDate, getImageUrl, getPodcastDate, getPodcastUrl, getProfileImageUrl, getSecondsToHms, getShareUrl, getUpdatedObject, isArray, isInvalidOrEmptyArray, isNonNegativeNumber, isNotEmpty, isStringIncludes, isTypeAlbum, isValidDate, isValidHttpUrl, joinArray, removeWhiteSpace, spliceArray, testProps, timeAgo, TimeIcon } from "../utilities"
import { HomePageArticleType } from "src/redux/latestNews/types"
describe('<Utilities>', () => {

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        })
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

    describe('<<< getFormattedDate >>>', () => {
        it('Check getFormattedDate', () => {
            const data: any = '2013-05-28T16:16:54+0000'
            const result = getFormattedDate(data)
            expect(result).toBe('2013-05-28')
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

describe("check methods in utilities",() => {
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        jest.clearAllMocks();
    })

    it("test convertSecondsToHMS returns a valid time ",() => {
        const result = convertSecondsToHMS(2333);
        expect(result).toBeDefined();
        expect(result).toBe("38:53");
        expect(typeof result).toBe('string');
    })

    it("test decodeHTMLTags returns the text without any html tags",() => {
        const result = decodeHTMLTags('<p>description</p>');
        expect(result).toBeDefined();
        expect(result).toBe('description')
        expect(typeof result).toBe('string');
    })

    it("test getImageUrl with valid url and returns a url",() => {
        const result = getImageUrl('https://imageURl.com');
        expect(result).toBeDefined();
        expect(result).toBe('https://imageURl.com')
        expect(typeof result).toBe('string');
    })

    it("test getImageUrl by passing a invalid url and returns a default url",() => {
        const result = getImageUrl('imageURl');
        expect(result).toBeDefined();
        expect(result).toBe("https://aawsat.srpcdigital.com/imageURl")
        expect(typeof result).toBe('string');
    })

    it("test spliceArray",() => {
        const result = spliceArray([{result:true},{result:false}],0,1);
        expect(result).toBeDefined();
        expect(result).toStrictEqual([{"result": true}])
        expect(typeof result).toBe('object');
    })

    it("test testProps",() => {
        const result = testProps('testId');
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
    })

    it("test if the array is valid or invalid",() => {
        const result = isInvalidOrEmptyArray({result:true});
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(typeof result).toBe('boolean');
    })

    it("test isNonNegativeNumber passing positive value",() => {
        const result = isNonNegativeNumber(34);
        expect(result).toBeDefined();
        expect(result).toBe(true);
        expect(typeof result).toBe('boolean');
    })

    it("test isNonNegativeNumber passing negative value",() => {
        const result = isNonNegativeNumber(-34);
        expect(result).toBeDefined();
        expect(result).toBe(false);
        expect(typeof result).toBe('boolean');
    })

    it("test the props is an array",() => {
        const result = isArray([{result:true}]);
        expect(result).toBeDefined();
        expect(result).toBeTruthy();
        expect(typeof result).toBe('boolean');
    })

    it("test the props is not an array",() => {
        const result = isArray({result:true});
        expect(result).toBeDefined();
        expect(result).toBeFalsy();
        expect(typeof result).toBe('boolean');
    })

    it("test timeAgo method should return a full date format",() => {
        const result = timeAgo(30);
        expect(result).toBeDefined();
        expect(result).toBe("يناير 1, 1970")
        expect(typeof result).toBe('string');
    })

    it("test getDay method with passing time as props",() => {
        const result = getDay('3');
        expect(result).toBeDefined();
        expect(result).toBe("الخميس, 1 مارس 2001")
        expect(typeof result).toBe('string');
    })

    it("test getDay method without passing empty string as props",() => {
        const result = getDay('');
        expect(result).toBeDefined();
        expect(result).toBe('');
        expect(typeof result).toBe('string');
    })

    it("test removeWhiteSpace method passing string as props",() => {
        const result = removeWhiteSpace('value');
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
    })

    it("test removeWhiteSpace method passing number as props",() => {
        const result = removeWhiteSpace(3);
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateDay",() => {
        const result = calculateDay('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateHour",() => {
        const result = calculateHour('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateMinutes",() => {
        const result = calculateMinutes('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateDateNumber",() => {
        const result = calculateDateNumber('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateMothNumber",() => {
        const result = calculateMothNumber('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateNonUtcDateNumber",() => {
        const result = calculateNonUtcDateNumber('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateNonUtcDate",() => {
        const result = calculateNonUtcDate('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test to calculateNonUtcYear",() => {
        const result = calculateNonUtcYear('23:00');
        expect(result).toBeDefined();
        expect(typeof result).toBe('number');
    })

    it("test getUpdatedObject",() => {
        const result = getUpdatedObject({result:true},'result',true,false);
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
    })

    it("test getConvertedTime with no props",() => {
        const result = getConvertedTime();
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
    })

    it("test getConvertedTime with props",() => {
        const result = getConvertedTime(23,24543);
        expect(result).toBeDefined();
        // expect(result).toBe("05:30:23");
        expect(typeof result).toBe('string');
    })

    it("test getCountryNameFromCode method returns a country name",() => {
        const result = getCountryNameFromCode('32');
        expect(result).toBeDefined();
        expect(result).toBe("الأرجنتين")
        expect(typeof result).toBe('string');
    })

    it("test isValidDate returns if the date is valid or not",() => {
        const result = isValidDate(new Date());
        expect(result).toBeDefined();
        expect(typeof result).toBe('boolean');
    })

    it("test getShareUrl returns a short url",() => {
        const result = getShareUrl('http://shorturl.com','http://linknodeurl.in');
        expect(result).toBeDefined();
        expect(result).toBe('http://shorturl.com');
        expect(typeof result).toBe('string');
    })

    it("test getShareUrl returns a linkNodeUrl url",() => {
        const result = getShareUrl('','http://linknodeurl.in');
        expect(result).toBeDefined();
        expect(result).toBe('http://linknodeurl.in');
        expect(typeof result).toBe('string');
    })

    it("check isTypeAlbum returns true if the type is album",() => {
        const result = isTypeAlbum(HomePageArticleType.ALBUM);
        expect(result).toBeDefined();
        expect(result).toBe(true);
        expect(typeof result).toBe('boolean');
    })

    it("check isTypeAlbum returns false if the type is not album",() => {
        const result = isTypeAlbum(HomePageArticleType.ARTICLE);
        expect(result).toBeDefined();
        expect(result).toBe(false);
        expect(typeof result).toBe('boolean');
    })

    it("check getDeviceName returns a device name",() => {
        const result = getDeviceName();
        expect(result).toBeDefined();
    })

    it("check getArticleImage returns fieldImage url",() => {
        const result = getArticleImage('fieldImage','newPhoto');
        expect(result).toBeDefined();
        expect(result).toBe("https://aawsat.srpcdigital.com/fieldImage")
    })

    it("check getArticleImage returns newPhoto url",() => {
        const result = getArticleImage('','newPhoto');
        expect(result).toBeDefined();
        expect(result).toBe("https://aawsat.srpcdigital.com/newPhoto")
    })

    it("check isStringIncludes returns true",() => {
        const result = isStringIncludes('data','ta');
        expect(result).toBeDefined();
        expect(result).toBe(true);
        expect(typeof result).toBe('boolean')
    })

    it("check isStringIncludes returns false",() => {
        const result = isStringIncludes('data','dd');
        expect(result).toBeDefined();
        expect(result).toBe(false);
        expect(typeof result).toBe('boolean')
    })

    it("test dateTimeAgo",() => {
        const result = dateTimeAgo(80);
        expect(result).toBeDefined();
        expect(result).toStrictEqual({"icon": 1, "time": "الخميس 01/01 01:20"});
        expect(typeof result).toBe('object');
    })

})