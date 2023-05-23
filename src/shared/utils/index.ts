export {
  screenHeight,
  screenWidth,
  isIOS,
  isAndroid,
  isNotchDevice,
  isTab,
  normalize,
  normalizeBy320
} from 'src/shared/utils/dimensions';

export {
  CustomAlert,
  isDarkTheme,
  testProps,
  horizontalEdge,
  horizontalAndBottomEdge,
  horizontalAndTop,
  isNonEmptyArray,
  isObjectNonEmpty,
  timeAgo,
  dateTimeAgo,
  calculateDate,
  calculateMonth,
  joinArray,
  isNotEmpty,
  DEFAULT_HIT_SLOP,
  decodeHTMLTags,
  getArticleImage,
  spliceArray,
  isNonNegativeNumber,
  isArray,
  isStringIncludes,
  isInvalidOrEmptyArray,
  isValidDate,
  isTypeAlbum,
  getString,
  formatHijri,
  formatGregorian,
  isStringEqual,
  isNumberOrString,
} from 'src/shared/utils/utilities'
export { SystemPermissions } from 'src/shared/utils/SystemPermissions'
export {
  recordCurrentScreen,
  recordLogEvent,
  recordUserId,
  recordLogSignUp,
  recordLogLogin,
  recordUserProperty
} from './analytics';
export {
  EventsValue,
  podcastPlayEventParameter,
  articleEventParameter,
  articleEvents,
  podcastPlayEvents,
  podcastShareEvents,
  videoEvents,
  sideMenuEventParameter,
  videoEventParameter
} from './analyticsEvents'
