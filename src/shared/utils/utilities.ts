import { Alert, ColorSchemeName } from "react-native"
import { Theme } from "../../redux/appCommon/types"
import { DEFAULT_ALERT_MESSAGE, DEFAULT_ALERT_TITLE, VALID_URL_REGEX } from "../../constants/SharedConstants"
import { Edge } from "react-native-safe-area-context";
import { BASE_URL } from "src/services/apiUrls";
import { arabic } from "src/assets/locales/ar/common-ar";

export interface CustomAlertProps {
    title?: string,
    message?: string,
    delay?: number
}

export const CustomAlert = ({ title = DEFAULT_ALERT_TITLE, message = DEFAULT_ALERT_MESSAGE, delay = 0 }: CustomAlertProps) => {
    setTimeout(() => {
        Alert.alert(title, message)
    }, delay)
}

export const isDarkTheme = (colorScheme: ColorSchemeName) => {
    return colorScheme == Theme.DARK
}

export const testProps = (testID: string | undefined) => {
    return { testID: testID, accessibilityLabel: testID }
}

export const horizontalEdge: Edge[] = ['left', 'right']
export const horizontalAndBottomEdge: Edge[] = [...horizontalEdge, 'bottom']

export const getImageUrl = (imageURL: string) => {
    return isValidHttpUrl(imageURL) ? imageURL : BASE_URL + imageURL;
}

export const decodeHTMLTags = (description: string) => {
    const regex = /(<([^>]+)>)/ig; // to find the html tags in the description ex: <p>, <br>, etc.,   
    return description ? description.replace(regex, '') : description;
}

export const isNonEmptyArray = (data: any): boolean => {
    return (data && Array.isArray(data) && data.length > 0)
}

export const isObjectNonEmpty = (data: any): boolean => {
    return Object.keys(data).length > 0 ? true : false
}

export const isNotEmpty = (value: string | null | undefined): boolean => {
    return typeof value === 'string' && value.trim().length > 0
}

export const isValidHttpUrl = (url: string) : boolean => {
    const pattern = new RegExp(VALID_URL_REGEX)
    return isNotEmpty(url) ? pattern.test(url) : false
}

export const timeAgo = (time: any) => {
  var date = new Date(time);
  var today = new Date();
  var yesterday = new Date((date).valueOf() - 1000 * 60 * 60 * 24);
  const isToday = date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0);
  const isYesterday = date.setHours(0, 0, 0, 0) == yesterday.setHours(0, 0, 0, 0);

  if (isToday || isYesterday) {
    return calculateTimeSince(date);
  }
  else {
    return arabic.timeSince.since + arabic.months[date.getMonth()] + ' ' + date.getDate();
  }
}

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
    [120, 'timeSince.minute_ago', 'timeSince.minute_from_now'], // 60*2
    [3600, 'timeSince.minutes', 60], // 60*60, 60
    [7200, 'timeSince.hour_ago', 'timeSince.hour_from_now'], // 60*60*2
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
    return 'timeSince.just_now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'timeSince.from_now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}