import { Alert, ColorSchemeName, Insets, Linking } from "react-native"
import { Theme } from "../../redux/appCommon/types"
import { DEFAULT_ALERT_MESSAGE, DEFAULT_ALERT_TITLE, VALID_URL_REGEX, PODCAST_URL_SUFFIX, CONST_OK } from "src/constants/Constants"
import { Edge } from "react-native-safe-area-context";
import { BASE_URL, PODCAST_SPREAKER_URL, PROFILE_IMAGE_URL } from "src/services/apiUrls";
import { arabic } from "src/assets/locales/ar/common-ar";
import moment from "moment";
import 'moment/locale/ar';
import { getSvgImages } from "../styles/svgImages";
import { normalize } from 'src/shared/utils';
import { ImagesName } from "../styles";
import { isIOS, isTab } from "./dimensions";
import { decode } from "html-entities";
import DeviceInfo from 'react-native-device-info';
import countries from "i18n-iso-countries";
import arabicLang from "i18n-iso-countries/langs/ar.json";
import { HomePageArticleType } from "src/redux/latestNews/types";

export enum DateIcon {
  CLOCK,
  CALENDAR
}

export interface CustomAlertProps {
  title?: string;
  message?: string;
  delay?: number;
  buttonTitle?: string;
  onPress?: () => void
}

export const CustomAlert = ({
  title = DEFAULT_ALERT_TITLE,
  message = DEFAULT_ALERT_MESSAGE,
  delay = 0,
  buttonTitle = CONST_OK,
  onPress
}: CustomAlertProps) => {
  setTimeout(() => {
    Alert.alert(title, message, [
      {text: buttonTitle, onPress: () => onPress && onPress()}
    ]);
  }, delay);
};


export const isDarkTheme = (colorScheme: ColorSchemeName) => {
  return colorScheme === Theme.DARK;
};

export const testProps = (testId: string | undefined) => {
  return { testID: testId, accessibilityLabel: testId };
};

export const horizontalEdge: Edge[] = ['left', 'right'];
export const horizontalAndBottomEdge: Edge[] = [...horizontalEdge, 'bottom'];
export const horizontalAndTop: Edge[] = [...horizontalEdge, 'top']

export const DEFAULT_HIT_SLOP: Insets = {top: 10, bottom: 10, left: 10, right: 10}

export const getImageUrl = (imageURL: string) => {
  if (isValidHttpUrl(imageURL)) {
    return imageURL
  }
  return BASE_URL + (isNotEmpty(imageURL) && imageURL[0] === '/' ? imageURL.substring(1) : imageURL);
};

export const getArticleImage = (fieldImage: any, newPhoto: any) : string => {
  let image = fieldImage ?? ''

  if(!isNotEmpty(fieldImage) && isNotEmpty(newPhoto)) {
    image = newPhoto
  }

  return getImageUrl(image)
}

export const decodeHTMLTags = (description: string | any) : string => {
  const regex = /(<([^>]+)>)/gi; // to find the html tags in the description ex: <p>, <br>, etc.,
  const dataInfo = isNotEmpty(description) ? description.replace(regex, '').trim() : '';
  return isNotEmpty(dataInfo) ? decode(dataInfo.trim()) : ''
};

export const isNonEmptyArray = (data: any): boolean => {
  return data && Array.isArray(data) && data.length > 0;
};

export const isInvalidOrEmptyArray = (data: any): boolean => {
  return !data || !Array.isArray(data) || data.length === 0;
};

export const isObjectNonEmpty = (data: any): boolean => {
  return data && Object.keys(data).length > 0 ? true : false;
};

export const isNumberNonEmpty = (data: any): boolean => {
  return typeof data === 'number' && data > 0;
};

export const isNotEmpty = (value: string | null | undefined): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const joinArray = (data: any, joinKey = ','): string => {
  return isNonEmptyArray(data) ? data.join(joinKey) : ''
}

export const isValidHttpUrl = (url: string): boolean => {
  const pattern = new RegExp(VALID_URL_REGEX);
  return isNotEmpty(url) ? pattern.test(url) : false;
};

export const spliceArray = (data: any,start: number, count: number): any[] => {
  return isNonEmptyArray(data) ? data.splice(start, count) : []
}

export const isNonNegativeNumber = (data: any): boolean => {
   return !isNaN(data) && typeof data === 'number' && data >= 0 ? true : false
}

export const isArray = (data: any) => data && Array.isArray(data) ? true : false

export const isStringIncludes = (data: any, searchText: string): boolean => {
  return isNotEmpty(data) && data.includes(searchText) ? true : false
}

export const getString = (value: any): string => {
  return isNotEmpty(value) ? decodeHTMLTags(value) : ' '
};

export const isStringEqual = (valueOne: any, valueTwo: any): boolean => {
  return valueOne == valueTwo;
}

export const isNumberOrString = (data: any): boolean => {
  return (typeof data == 'string' || typeof data === 'number');
}

export const timeAgo = (time: any) => {
  const date = new Date(time);
  const today = new Date();
  const threeHoursBefore = new Date(today.valueOf() - 1000 * 60 * 60 * 3);
  const isToday =   date.getDate() === today.getDate() &&  date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  const isThreeHoursAgo = date.getHours() - threeHoursBefore.getHours() >= 3;
  const fullDateFormat =  `${arabic.months[moment(time).get('month')]} ${calculateDate(time)}, ${calculateYear(time)}`;
  const recentHoursFormat = arabic.timeSince.since + moment().fromNow(true);
  if (isToday && isThreeHoursAgo) {
    return recentHoursFormat;
  } else {
    return fullDateFormat;
  }
};

export type DateTimeAgoType = {
  icon: DateIcon, 
  time: string
}

export const dateTimeAgo = (time: any): DateTimeAgoType => {
  const today = new Date();

  const startTime = moment(time).format();
  const endTime = moment(today).format();

  const duration = moment.duration(moment(endTime).diff(startTime));
  const minutes = Number((duration.asMinutes()).toFixed(0));

  const isLessThanHour = minutes < 60;
  const isLessThanTwoHours = minutes < 120;
  const isLessThanThreeHours = minutes < 180;
  const isLessThanFourHours = minutes < 240;  

  if (isLessThanFourHours) {
    if (isLessThanHour) {
      return { icon: DateIcon.CLOCK, time: `${arabic.timeSince.since} ${JSON.stringify(minutes)} ${arabic.timeSince.minute}` }
    } else if (isLessThanTwoHours) {
      return { icon: DateIcon.CLOCK, time: arabic.timeSince.sinceHour }
    } else if (isLessThanThreeHours) {
      return { icon: DateIcon.CLOCK, time: arabic.timeSince.sinceTwoHours }
    } 
    return {
      icon: DateIcon.CLOCK,
      time: arabic.timeSince.sinceThreeHours
    }
  }

  const day =  calculateDay(time)
  const dayString = arabic.day[day] + ' '
  const hourValue = calculateHour(time)
  const hourString = hourValue  < 10 ? '0' + hourValue : hourValue
  const minuteValue = calculateMinutes(time)
  const minuteString = minuteValue  < 10 ? '0' + minuteValue : minuteValue

  const timeAgoFormatInfo = isTab ?
    `${calculateDateNumber(time)}/${calculateMothNumber(time)} - ${hourString}:${minuteString}` : 
    `${calculateDateNumber(time)}/${calculateMothNumber(time)} ${hourString}:${minuteString}`
  
  const fullDateFormat = (dayString + timeAgoFormatInfo).toString();
  return { icon: DateIcon.CALENDAR, time: fullDateFormat }
};


export const calculateDay = (time: any) => {
  return moment(time).utcOffset(time).get('day');
};

export const calculateHour = (time: any) => {
  return moment(time).utcOffset(time).get('hours');
};

export const calculateMinutes = (time: any) => {
  return moment(time).utcOffset(time).get('minutes');
};

export const calculateDateNumber = (time: any) => {
  const date = calculateDate(time)
  return date < 10 ? '0' + date : date;
};

export const calculateMothNumber = (time: any) => {
  const month = moment(time).get('months') + 1
  return month < 10 ? '0' + month : month;
};

export const calculateDate = (time: any) => {
  return moment(time).utcOffset(time).get('date');
};

export const calculateMonthNumber = (time: any) => {
  return moment(time).utcOffset(time).get('month');
};

export const calculateMonth = (time: any) => {
  return arabic.months[moment(time).utcOffset(time).get('month')];
};

export const calculateYear = (time: any) => {
  return  moment(time).utcOffset(time).get('year');
};

export const getFullDate = (time: any) => {
  return `${calculateNonUtcDate(time)} ${calculateNonUtcMonth(time)} ${moment(time).get('year')}`;
}

export const calculateNonUtcDateNumber = (time: any) => {
  const date = calculateNonUtcDate(time)
  return date < 10 ? '0' + date : date;
};

export const calculateNonUtcDate = (time: any) => {
  return moment(time).get('date');
};

export const calculateNonUtcMonth = (time: any) => {
  return arabic.months[moment(time).get('month')];
};

export const calculateNonUtcYear = (time: any) => {
  return  moment(time).get('year');
};

export const getFormattedDate = (time: any) => {
  const year = calculateNonUtcYear(time)
  const monthValue = moment(time).get('month') + 1
  const month = monthValue < 10 ? '0' + monthValue : monthValue
  const dateValue = calculateNonUtcDate(time);
  const date = dateValue < 10 ? '0' + dateValue : dateValue
  return `${year}-${month}-${date}`
}

export const getProfileImageUrl = (imageURL: string) => {
  return isValidHttpUrl(imageURL) ? imageURL : PROFILE_IMAGE_URL + imageURL;
};

export const getPodcastUrl = (episodeId: string) => {
  return PODCAST_SPREAKER_URL + episodeId +PODCAST_URL_SUFFIX
}

export const getPodcastDate = (time:any) => {
  return isNotEmpty(time) ? `${calculateMonth(time)}, ${calculateDate(time)} ${calculateMonth(time)}` : " "
}

export const getDay = (time:any) => {
  if(!isNotEmpty(time)) {
    return '';
  }

  const day =  calculateDay(time)
  return `${arabic.day[day]}, ${calculateDate(time)} ${calculateMonth(time)} ${moment(time).get('year')}`
}

export const  getSecondsToHms = (time:any): string => {
  time = Number(time);
  const h = Math.floor(time / 3600);
  const m = Math.floor(time % 3600 / 60);
  const s = Math.floor(time % 3600 % 60);

  const secondsDisplay = s > 0 ? s  : "";
  const minutesDisplay = (m > 0) ? (secondsDisplay > 0) ? m < 10 ? `0${m.toString()}:` :  m.toString() +  ":"  : m.toString() : "";
  const hoursDisplay = h > 0 ? m > 0 ? h.toString() + ":" : h.toString() : ""; 
  return hoursDisplay + minutesDisplay + secondsDisplay; 
}

export const getUpdatedObject = (obj:any, key: string, val: any, newVal: any) => {
  const newValue = newVal;
    let objects: any = [];
    for (const i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getUpdatedObject(obj[i], key, val, newValue));
        } else if (i === key && obj[key] === val) {
            obj[key] = newValue;
        }
    }
    return obj;
}

export const convertSecondsToHMS = (seconds: number | string) => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
  const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
  const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
  return `${hrs}${mins}${scnds}`;
};

export const TimeIcon = (type: DateIcon) => {
  const calendarIcon = isTab ? ImagesName.calendarLightIcon : ImagesName.calendarIcon;
  return(
    getSvgImages({
      name: type === DateIcon.CALENDAR ? calendarIcon : ImagesName.clock,
      width: isTab ? 16 : 12,
      height: isTab ? 16 : 12,
      style: { marginRight: normalize(7), marginBottom: isIOS ? 2 : 5 }
    })
)}

export const removeWhiteSpace = ( value: string) : string | any => {
  return typeof value === 'string' ? value.trim() : value;
}


export const getDeviceName = async () => {
  return await DeviceInfo.getDeviceName();
};

export const getConvertedTime = (time?: number, timezone?: number) => {
  moment.locale('en')
  if (time && timezone) {
    const offsetTimezone = (timezone).toString();
    const timeWeatherSunriseData = new Date(time * 1000);
    const countrySpecificTimeSunrise = moment(new Date(timeWeatherSunriseData)).utcOffset(offsetTimezone).format('ddd MMM D Y hh:mm:ss A ')
    return moment(new Date(countrySpecificTimeSunrise)).format('HH:mm:ss')
  } else {
    return ''
  }
};

const formatToTwoDigit = (num: number) => {
  return num < 10 ? `0${num}` : num;
}

export const formatHijri = (value: string) => {
  const day = formatToTwoDigit(calculateDate(value));
  const month = formatToTwoDigit(calculateMonthNumber(value) + 1);
  const year = formatToTwoDigit(calculateYear(value));
  const formattedDate = `${year}-${month}-${day}`.toString();
  const date = new Date(formattedDate);

  const format = new Intl.DateTimeFormat('ar-SA-u-nu-latn', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const parsedDate = format.format(date);
  return parsedDate;
}

export const formatGregorian = (value: string) => {
  const hour = formatToTwoDigit(calculateHour(value));
  const minutes = formatToTwoDigit(calculateMinutes(value));

  const day = formatToTwoDigit(calculateDate(value));
  const month = calculateMonth(value);
  const year = formatToTwoDigit(calculateYear(value));

  return `${day}-${hour}:${minutes} ${month} ${year}`;
}

export const getCountryNameFromCode = ( countryCode: string) : string => {
  countries.registerLocale(arabicLang);
  return countries.getName(countryCode, "ar");
}

export const isValidDate = (dateObject: any): boolean => {
  return dateObject && new Date(dateObject).toString() !== 'Invalid Date';
}

export const getShareUrl = (shortUrl: string, linkNodeUrl:string): string => {
  return  isNotEmpty(shortUrl) ? shortUrl : linkNodeUrl;
}

export const isTypeAlbum = (type: HomePageArticleType): boolean => {
  return isNotEmpty(type) && type === HomePageArticleType.ALBUM;
}

export const openBrowserURL = async (url: string, callback?: () => void) => {
  try {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    }
  } catch {
    callback && callback();
  }
};

export const APP_STORE_ID = '470905035';
