import { Alert, ColorSchemeName, Insets } from "react-native"
import { Theme } from "../../redux/appCommon/types"
import { DEFAULT_ALERT_MESSAGE, DEFAULT_ALERT_TITLE, VALID_URL_REGEX, PODCAST_URL_SUFFIX, CONST_OK } from "src/constants/SharedConstants"
import { Edge } from "react-native-safe-area-context";
import { BASE_URL, PODCAST_SPREAKER_URL } from "src/services/apiUrls";
import { arabic } from "src/assets/locales/ar/common-ar";
import moment from "moment";
import 'moment/locale/ar';
import { PROFILE_IMAGE_URL } from "src/services/apiUrls";
import { getSvgImages } from "../styles/svgImages";
import { normalize } from 'src/shared/utils';
import { ImagesName } from "../styles";
import { isIOS } from "./dimensions";
import { decode } from "html-entities";

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
  return colorScheme == Theme.DARK;
};

export const testProps = (testID: string | undefined) => {
  return { testID: testID, accessibilityLabel: testID };
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

export const decodeHTMLTags = (description: string) : string => {
  const regex = /(<([^>]+)>)/gi; // to find the html tags in the description ex: <p>, <br>, etc.,
  const dataInfo = isNotEmpty(description) ? description.replace(regex, '').trim() : '';
  return isNotEmpty(dataInfo) ? decode(dataInfo.trim()) : ''
};

export const isNonEmptyArray = (data: any): boolean => {
  return data && Array.isArray(data) && data.length > 0;
};

export const isObjectNonEmpty = (data: any): boolean => {
  return data && Object.keys(data).length > 0 ? true : false;
};

export const isNotEmpty = (value: string | null | undefined): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const joinArray = (data: any, joinKey: string = ','): string => {
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

export const timeAgo = (time: any) => {
  var date = new Date(time);
  var today = new Date();
  var yesterday = new Date(today.valueOf() - 1000 * 60 * 60 * 24);
  var threeHoursBefore = new Date(today.valueOf() - 1000 * 60 * 60 * 3);
  const isToday =   date.getDate() == today.getDate() &&  date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
  const isThreeHoursAgo = date.getHours() - threeHoursBefore.getHours() >= 3;
  const fullDateFormat =  arabic.months[moment(time).get('month')] + ' ' + calculateDate(time) + ', ' + calculateYear(time);
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
  var today = new Date();

  var startTime = moment(time).format();
  var endTime = moment(today).format();

  var duration = moment.duration(moment(endTime).diff(startTime));
  var minutes = Number((duration.asMinutes()).toFixed(0));

  const isLessThanHour = minutes < 60;
  const isLessThanTwoHours = minutes < 120;
  const isLessThanThreeHours = minutes < 180;
  const isLessThanFourHours = minutes < 240;  

  if (isLessThanFourHours) {
    if (isLessThanHour) {
      return { icon: DateIcon.CLOCK, time: `${arabic.timeSince.since} ${JSON.stringify(minutes)} ${arabic.timeSince.minute}` }
    } else if (isLessThanTwoHours) {
      return { icon: DateIcon.CLOCK, time: arabic.timeSince.fromHour }
    } else if (isLessThanThreeHours) {
      return { icon: DateIcon.CLOCK, time: arabic.timeSince.fromTwoHours }
    } if (isLessThanFourHours) {
      return { icon: DateIcon.CLOCK, time: arabic.timeSince.fromThreeHours }
    }
  }

  const day =  calculateDay(time)
  const dayString = arabic.day[day] + ' '
  const hourValue = calculateHour(time)
  const hourString = hourValue  < 10 ? '0' + hourValue : hourValue
  const minuteValue = calculateMinutes(time)
  const minuteString = minuteValue  < 10 ? '0' + minuteValue : minuteValue

  const timeAgoFormatInfo = `${calculateDateNumber(time)}/${calculateMothNumber(time)} ${hourString}:${minuteString}`
  const fullDateFormat = (dayString + timeAgoFormatInfo).toString();
  return { icon: DateIcon.CALENDAR, time: fullDateFormat }
};


export const calculateTimeSince = (time: any) => {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'timeSince.seconds', 1], // 60
    [120, 'timeSince.one_minute', 'timeSince.minute_from_now'], // 60*2
    [3600, 'timeSince.minutes', 60], // 60*60, 60
    [7200, 'timeSince.one_hour', 'timeSince.hour_from_now'], // 60*60*2
    [86400, 'timeSince.hours', 3600], // 60*60*24, 60*60
    [172800, 'timeSince.yesterday', 'timeSince.tomorrow'], // 60*60*24*2
    [604800, 'timeSince.days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'timeSince.last_week', 'timeSince.next_week'], // 60*60*24*7*4*2
    [2419200, 'timeSince.weeks', 604800], // 60*60*24*7*4, 60*60*24*7
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'timeSince.ago',
    list_choice = 1;

  if (seconds > 1) {
    return 'timeSince.just_now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'timeSince.from_now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1];
    }
  return time;
};

export const calculateDay = (time: any) => {
  return moment(time).get('day');
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
  return moment(time).get('date');
};

export const calculateMonth = (time: any) => {
  return arabic.months[moment(time).get('month')];;
};

export const calculateYear = (time: any) => {
  return  moment(time).get('year');
};

export const getFullDate = (time: any) => {
  return calculateDate(time) + ' ' + calculateMonth(time) + ' ' + moment(time).get('year');
}

export const getFormatedDate = (time: any)=> {
  return  moment(time).get('year') + '.' + (moment(time).get('month')+1)+ '.' + calculateDate(time);
}

export const getProfileImageUrl = (imageURL: string) => {
  return isValidHttpUrl(imageURL) ? imageURL : PROFILE_IMAGE_URL + imageURL;
};

export const getPodcastUrl = (episode_id: string) => {
  return PODCAST_SPREAKER_URL + episode_id +PODCAST_URL_SUFFIX
}

export const getPodcastDate = (time:any) => {
  return isNotEmpty(time) ? calculateMonth(time) + ', ' + calculateDate(time) + ' ' + calculateMonth(time) : " "
}

export const  getSecondsToHms = (time:any): string => {
  time = Number(time);
  var h = Math.floor(time / 3600);
  var m = Math.floor(time % 3600 / 60);
  var s = Math.floor(time % 3600 % 60);

  var secondsDisplay = s > 0 ? s  : "";
  var minutesDisplay = (m > 0) ? (secondsDisplay > 0) ? m < 10 ? '0' + m.toString() + ":" :  m.toString() +  ":"  : m.toString() : "";
  var hoursDisplay = h > 0 ? m > 0 ? h.toString() + ":" : h.toString() : ""; 
  return hoursDisplay + minutesDisplay + secondsDisplay; 
}

export const getUpdatedObject = (obj:any, key: string, val: any, newVal: any) => {
  var newValue = newVal;
    var objects: any = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getUpdatedObject(obj[i], key, val, newValue));
        } else if (i == key && obj[key] == val) {
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

export const TimeIcon = (type: DateIcon) => (
  getSvgImages({
    name: type === DateIcon.CALENDAR ? ImagesName.calendarIcon : ImagesName.clock,
    width: 12,
    height: 12,
    style: { marginRight: normalize(7), marginBottom: isIOS ? 2 : 5 }
  })
)

export const removeWhiteSpace = ( value: string) : string | any => {
  return typeof value === 'string' ? value.trim() : value;
}