import React, { FunctionComponent, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  isIOS,
  isTab,
  normalize,
} from '../../../shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { images } from 'src/shared/styles/images';
import { fonts } from 'src/shared/styles/fonts';
import { Divider, Label } from 'src/components/atoms';
import { ScrollView } from 'react-native-gesture-handler';
import WeatherThermometerIcon from 'src/assets/images/icons/weather/weather_thermometer.svg';
import WeatherRainIcon from 'src/assets/images/icons/weather/weather_rain.svg';
import WeatherIcon3 from 'src/assets/images/icons/weather/weather_Icon3.svg'
import WeatherIcon4 from 'src/assets/images/icons/weather/weather_Icon4.svg'
import WeatherIcon5 from 'src/assets/images/icons/weather/weather_Icon5.svg'
import WeatherIcon6 from 'src/assets/images/icons/weather/weather_Icon6.svg'
import WeatherDayIcon from 'src/assets/images/icons/weather/weather_Day_Icon.svg'
import WeatherNightIcon from 'src/assets/images/icons/weather/weather_Night_Icon.svg'
import { calculateNonUtcDateNumber, 
  calculateNonUtcMonth, 
  calculateNonUtcYear, 
  getConvertedTime, 
  getCountryNameFromCode, 
  isNonEmptyArray, 
  isObjectNonEmpty, 
  isStringIncludes } from 'src/shared/utils/utilities';
import { arabic } from 'src/assets/locales/ar/common-ar';
import moment from 'moment';
import { useOrientation, useWeatherDetails } from 'src/hooks';
import SunImageIcon from 'src/assets/images/icons/weather/Images/Sun.svg'
import CloudImageIcon from 'src/assets/images/icons/weather/Images/Clouds.svg'
import FogImageIcon from 'src/assets/images/icons/weather/Images/Fog.svg'
import RainImageIcon from 'src/assets/images/icons/weather/Images/Rain.svg'
import SunCloudsImageIcon from 'src/assets/images/icons/weather/Images/SunClouds.svg'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { AlignItemsTo, AlignSelfTo, FlexDirectionTo, JustifyContentTo } from 'src/shared/styles/styleProperties';

interface WeatherDate {
  date: string,
  month: string,
  day: string,
  year: number,
  selected: boolean,
}

export enum weatherType {
  rain = 'rain',
  clouds = 'clouds',
  clear = 'clear',
  sun = 'sun',
  sand = 'sand',
  fog = 'fog',
}


export const WeatherDetailScreen: FunctionComponent = () => {
const CONST_SUNRISE = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SUNRISE })
const CONST_SUNSET = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SUNSET })
const CONST_HUMIDITY = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_HUMIDITY })
const CONST_SPEED = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SPEED })
const CONST_KMH = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_KMH })
const CONST_VISIBILITY = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_VISIBILITY })
const CONST_PRESSURE = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_PRESSURE })
const CONST_SEA_CONDITION = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_SEA_CONDITION })
const CONST_KM = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_KM })
const CONST_MBAR = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_MBAR })
const CONST_MAX = TranslateConstants({ key: TranslateKey.WEATHER_DETAILS_MAX })
const NO_INFORMATION_TEXT = TranslateConstants({ key: TranslateKey.WEATHER_NO_INFORMATION_TEXT })

  const { fetchWeatherDetailsSuccessInfo, fetchWeatherDetailsVisibilitySuccessInfo } = useWeatherDetails();
  const styles = useThemeAwareObject(createStyles);
  const {isPortrait} = useOrientation();

  const currentDate = new Date();
  const data: WeatherDate[] = [];

  const [weatherDataDetails, setWeatherDataDetails] = React.useState(data);
  const [weatherListDetails, setWeatherListDetails] = React.useState<any>(fetchWeatherDetailsSuccessInfo?.list[0] ? fetchWeatherDetailsSuccessInfo?.list[0] : []);
  const [weatherDataVisibility, setWeatherDataVisibility] = React.useState(
    fetchWeatherDetailsVisibilitySuccessInfo?.visibility ? 
    fetchWeatherDetailsVisibilitySuccessInfo.visibility : '');


  currentDate.setDate(currentDate.getDate());

  data.push({ 
    date: (calculateNonUtcDateNumber(currentDate).toString()), 
    month: calculateNonUtcMonth(currentDate), 
    day: arabic.day[moment(currentDate).get('day')],
    year: calculateNonUtcYear(currentDate), 
    selected: true 
  });
  for (let i = 1; i < 7; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    data.push({ 
      date: (calculateNonUtcDateNumber(currentDate)).toString(), 
      month: calculateNonUtcMonth(currentDate), 
      day: arabic.day[moment(currentDate).get('day')], 
      year: calculateNonUtcYear(currentDate), 
      selected: false 
    });
  }

  const getCountryName = () => {
    let countryName = ''
    if (fetchWeatherDetailsSuccessInfo?.city.country) {
      countryName = getCountryNameFromCode(fetchWeatherDetailsSuccessInfo?.city.country);
      return countryName
    } else {
      return countryName
    }
  };

  const weatherDetail = () => (
    <View style={styles.weatherDetail}>
      <Label style={styles.locationLabel}>
        {fetchWeatherDetailsSuccessInfo?.city.name}
        {' ,'}
        {getCountryName()}
      </Label>
      {weatherImage()}
    </View>
  );

  const weatherListData: any[] = useMemo(() => {
    if (isObjectNonEmpty(fetchWeatherDetailsSuccessInfo) && isNonEmptyArray(fetchWeatherDetailsSuccessInfo?.list)) {
      return fetchWeatherDetailsSuccessInfo?.list ?? []
    }
    return []
  }, [fetchWeatherDetailsSuccessInfo])

  const getMainData = (): string => {
    let mainData = ''
    if (isNonEmptyArray(weatherListData) && isNonEmptyArray(weatherListData[0].weather)) {
      mainData = weatherListData[0].weather[0].main.toLowerCase();
    }
    return mainData
  }

  const getBackgroundImage = () => {
    const mainData = getMainData()
    if (isStringIncludes(mainData, weatherType.rain)) {
      return images.rainyImg
    } else if (isStringIncludes(mainData, weatherType.clouds)) {
      return images.cloudyImg
    } else if (isStringIncludes(mainData, weatherType.clear)) {
      return images.clearSkyImg
    } else if (isStringIncludes(mainData, weatherType.sun)) {
      return images.sunnyImg
    } else if (isStringIncludes(mainData, weatherType.sand)) {
      return images.sandImg
    } else {
      return images.clearSkyImg
    }
  };

  const getImageIcon = () => {
    const mainData = getMainData();
    const width = 160;
    const height = 160;
    if (isStringIncludes(mainData, weatherType.rain)) {
      return <RainImageIcon height={height} width={width} />
    } else if (isStringIncludes(mainData, weatherType.clouds)) {
      return <CloudImageIcon height={height} width={width} />
    } else if (isStringIncludes(mainData, weatherType.clear)) {
      return <SunCloudsImageIcon height={height} width={width} />
    } else if (isStringIncludes(mainData, weatherType.sun)) {
      return <SunImageIcon height={height} width={width} />
    } else if (isStringIncludes(mainData, weatherType.fog)) {
      return <FogImageIcon height={height} width={width} />
    } else {
      return <SunCloudsImageIcon height={height} width={width} />
    }
  };

  const renderSunRiseAndSunSet = () => {
    const _timeZone = isObjectNonEmpty(fetchWeatherDetailsSuccessInfo?.city) ? fetchWeatherDetailsSuccessInfo?.city?.timezone : undefined
    const timeZone = _timeZone !== undefined ? _timeZone : '';
    if (!isNonEmptyArray(weatherListData) || !timeZone) {
      return null
    }

    const todayWeatherData = weatherListData[0]
    return (
      <>
        {(todayWeatherData.sunrise && timeZone) &&
          <View style={styles.timeZoneStyle}>
            <WeatherDayIcon style={styles.weatherSunIcon} width={25} height={20} />
            <View style={styles.timeZoneLabelStyle}>
              <Label style={styles.sunStateLabelStyle} children={CONST_SUNRISE} />
              <Label style={styles.sunStateDurationStyle} children={getConvertedTime(todayWeatherData.sunrise, timeZone)} />
            </View>
          </View>
        }
        {(todayWeatherData.sunset && timeZone) &&
          <View style={styles.timeZoneStyle}>
            <WeatherNightIcon style={styles.weatherSunIcon} width={25} height={20} />
            <View style={styles.timeZoneLabelStyle}>
              <Label style={styles.sunStateLabelStyle} children={CONST_SUNSET} />
              <Label style={styles.sunStateDurationStyle} children={getConvertedTime(todayWeatherData.sunset, timeZone)} />
            </View>
          </View>
        }
      </>
    )
  }

  const weatherImage = () => (
    <ImageBackground source={getBackgroundImage()} style={styles.weatherImage}>
      <View style={styles.weatherLocationView}>
        <Text style={styles.cityLabelStyle}>{fetchWeatherDetailsSuccessInfo?.city.name}</Text>
        <Text style={styles.dateLabelStyle}>{data[0].date} {data[0].month} {data[0].year}</Text>
      </View>
      <View style={styles.temperatureViewStyle}>
        <Text style={styles.temperatureLabelStyle}>{Math.round(fetchWeatherDetailsSuccessInfo?.list[0].temp.day as number) + '°'}</Text>
        <View style={styles.temperatureIconStyle}>
          {getImageIcon()}
          <Label style={styles.weatherLabelStyle}>
            {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description}
          </Label>
        </View>
      </View>
      {isNonEmptyArray(weatherListData) && renderSunRiseAndSunSet()}
    </ImageBackground>
  );

  const updateOnPress = (index: number) => {
    const weatherUpdates = weatherDataDetails.map((item: WeatherDate) => {
      item.selected = false;
      return item;
    });
    weatherDataDetails[index].selected = true;
    setWeatherDataDetails(weatherUpdates);
    setWeatherListDetails(fetchWeatherDetailsSuccessInfo?.list[index])
    if (index === 0 && fetchWeatherDetailsVisibilitySuccessInfo?.visibility) {
      setWeatherDataVisibility(fetchWeatherDetailsVisibilitySuccessInfo?.visibility)
    } else {
      setWeatherDataVisibility('')
    }
  };

  const renderItem = (item: WeatherDate, index: number) => {
    const dayContainerStyle = isPortrait ? styles.tabDayContainerNotSelected : styles.tabLandscapeDayContainerNotSelected
    return (
      <TouchableWithoutFeedback onPress={() => updateOnPress(index)}>
        <View style={[styles.dayContainerNotSelected, isTab && dayContainerStyle, item.selected && styles.dayContainerSelected]}>
          <View>
            <Label numberOfLines={1}
              style={[styles.dayContainerLabel, item.selected && { color: colors.white }]}
              children={item.day} />
          </View>
          <View>
            <Label numberOfLines={1} style={styles.dateContainerLabel}>
              {item.date}
              {' '}
              {item.month}
            </Label>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const weatherDescription = () => (
    <View style={styles.weatherDescriptionContainer}>
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherThermometerIcon width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.fieldTextStyle}>
            {'    '}
            {CONST_MAX}
          </Label>
        </View>
        <Label 
          style={styles.fieldDataStyle} 
          children={(weatherListDetails?.temp.max && weatherListDetails?.temp.min) 
          ? `${weatherListDetails?.temp.max}°/${weatherListDetails?.temp.min}°`:
          NO_INFORMATION_TEXT} 
        />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherRainIcon width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.fieldTextStyle}>
            {'    '}
            {CONST_HUMIDITY}
          </Label>
        </View>
        <Label style={styles.fieldDataStyle} children={weatherListDetails?.humidity ? weatherListDetails?.humidity + '%' : NO_INFORMATION_TEXT} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon3 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.fieldTextStyle}>
            {'    '}
            {CONST_SPEED}
          </Label>
        </View>
        <Label style={styles.fieldDataStyle} children={weatherListDetails?.speed ? `${weatherListDetails?.speed} ${CONST_KMH}` : NO_INFORMATION_TEXT} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon4 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.fieldTextStyle}>
            {'    '}
            {CONST_VISIBILITY}
          </Label>
        </View>
        <Label style={styles.fieldDataStyle} children={weatherDataVisibility ? `${weatherDataVisibility} ${CONST_KM}` : NO_INFORMATION_TEXT} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon5 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.fieldTextStyle}>
            {'    '}
            {CONST_PRESSURE}
          </Label>
        </View>
        <Label style={styles.fieldDataStyle} children={weatherListDetails?.pressure ? `${weatherListDetails?.pressure} ${CONST_MBAR}` : NO_INFORMATION_TEXT} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon6 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.fieldTextStyle}>
            {'    '}
            {CONST_SEA_CONDITION}
          </Label>
        </View>
        <Label style={styles.fieldDataStyle} children={NO_INFORMATION_TEXT} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weatherDetail()}
        <View style={isTab? styles.tabHorizontalDateView : styles.horizontalDateView}>
          <FlatList
            testID={'newsHorizontalListId'}
            horizontal
            data={weatherDataDetails}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)}
            bounces={false}
            style={!isIOS && {alignSelf: AlignSelfTo.FLEX_START}}
          />
        </View>
        {weatherDescription()}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    weatherDetail: {
      margin: normalize(20),
    },
    horizontalDateView: {
      margin: normalize(15),
      marginBottom: normalize(40)
    },
    tabHorizontalDateView: {
      margin: isIOS ? normalize(15) :  normalize(20),
      marginBottom: normalize(40)
    },
    weatherImage: {
      marginTop: normalize(20),
      paddingHorizontal: normalize(15),
      paddingRight: normalize(10)
    },
    weatherDescriptionView: {
      flexDirection: FlexDirectionTo.ROW,
      flex: 1,
      justifyContent: JustifyContentTo.SPACE_BETWEEN
    },
    locationLabel: {
      fontFamily: fonts.AwsatDigital_Regular,
      textAlign: 'left',
      fontSize: 17,
      color: theme.primaryBlack,
      lineHeight: 27,
    },
    dayContainerLabel: {
      fontFamily: fonts.AwsatDigital_Regular,
      textAlign: 'left',
      fontSize: 15,
      color: colors.greenishBlue,
      lineHeight: 28,
    },
    dateContainerLabel: {
      fontFamily: fonts.Effra_Regular,
      textAlign: 'left',
      fontSize: 11,
      lineHeight: 18,
      color: colors.titleGrey,
    },
    cityLabelStyle: {
      fontSize: 38,
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'left',
      lineHeight: 55,
    },
    dateLabelStyle: {
      fontSize: 10,
      color: colors.white,
      fontFamily: fonts.Effra_Regular,
      textAlign: 'left',
      lineHeight: 32,
    },
    temperatureLabelStyle: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: 70,
      color: colors.white,
      lineHeight: 85,
      alignSelf: AlignSelfTo.CENTER,
      paddingTop: 10
    },
    weatherLabelStyle: {
      fontFamily: fonts.Effra_Regular,
      fontSize: 18,
      lineHeight: 27,
      color: colors.white,
      textAlign: 'center',
    },
    sunStateDurationStyle: {
      fontSize: 8,
      color: colors.white,
      fontFamily: fonts.Effra_Regular,
      alignSelf: AlignSelfTo.FLEX_START
    },
    dayContainerNotSelected: {
      justifyContent: JustifyContentTo.SPACE_AROUND,
      alignItems: AlignItemsTo.CENTER,
      backgroundColor: colors.white,
      padding: normalize(10),
      marginHorizontal: normalize(5),
      borderRadius: normalize(5),
      borderColor: colors.borderGray,
      borderWidth: normalize(1),
    },
    tabDayContainerNotSelected: {
      width: isIOS ? normalize(95) : normalize(100),
    },
    tabLandscapeDayContainerNotSelected: {
      width: isIOS ? 148 : 168,
    },
    dayContainerSelected: {
      backgroundColor: colors.greenishBlue,
      borderColor: colors.borderGreen,
    },
    weatherLocationView: {
      padding: normalize(10)
    },
    weatherSunIcon: {
      marginRight: normalize(6)
    },
    temperatureViewStyle: {
      paddingHorizontal: normalize(10),
      flexDirection: FlexDirectionTo.ROW,
      justifyContent: JustifyContentTo.SPACE_BETWEEN
    },
    weatherDescriptionContainer: {
      marginHorizontal: normalize(20),
      marginTop: normalize(5),
      marginBottom: normalize(50),
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor,
      marginBottom: normalize(15)
    },
    labelsListContainer: {
      flexDirection: FlexDirectionTo.ROW
    },
    fieldTextStyle: {
      fontFamily: fonts.Effra_Regular,
      fontSize: 18,
      color: theme.primaryBlack,
      lineHeight: 32,
    },
    fieldDataStyle: {
      fontFamily: fonts.Effra_Regular,
      fontSize: 18,
      color: theme.primaryBlack,
      lineHeight: 32,
    },
    labelsListIcon: {
      marginTop: normalize(5)
    },
    timeZoneLabelStyle: {
      flexDirection: FlexDirectionTo.COLUMN
    },
    sunStateLabelStyle: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: 15,
      color: colors.white,
      lineHeight: 33,
      justifyContent: JustifyContentTo.CENTER,
      alignSelf: AlignSelfTo.FLEX_START
    },
    timeZoneStyle: {
      flexDirection: FlexDirectionTo.ROW,
      alignItems: AlignItemsTo.CENTER,
      paddingHorizontal: normalize(10),
      paddingBottom: normalize(10),
    },
    temperatureIconStyle: {
      flexDirection: FlexDirectionTo.COLUMN 
    }
  });
