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
import { calculateDateNumber, calculateMonth, calculateYear, getConvertedTime, getCountryNameFromCode, isNonEmptyArray, isObjectNonEmpty, isStringIncludes } from 'src/shared/utils/utilities';
import { arabic } from 'src/assets/locales/ar/common-ar';
import moment from 'moment';
import { useWeatherDetails } from 'src/hooks';
import SunImageIcon from 'src/assets/images/icons/weather/Images/Sun.svg'
import CloudImageIcon from 'src/assets/images/icons/weather/Images/Clouds.svg'
import FogImageIcon from 'src/assets/images/icons/weather/Images/Fog.svg'
import RainImageIcon from 'src/assets/images/icons/weather/Images/Rain.svg'
import SunCloudsImageIcon from 'src/assets/images/icons/weather/Images/SunClouds.svg'
import { TranslateConstants, TranslateKey } from 'src/constants';

interface weatherDate {
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

  const { fetchWeatherDetailsSuccessInfo, fetchWeatherDetailsVisibilitySuccessInfo } = useWeatherDetails();
  const styles = useThemeAwareObject(createStyles);

  var currentDate = new Date();
  var data: weatherDate[] = [];

  const [weatherDataDetails, setWeatherDataDetails] = React.useState(data);
  const [weatherListDetails, setWeatherListDetails] = React.useState<any>(fetchWeatherDetailsSuccessInfo?.list[0] ? fetchWeatherDetailsSuccessInfo?.list[0] : []);
  var [weatherDataVisibility, setWeatherDataVisibility] = React.useState(fetchWeatherDetailsVisibilitySuccessInfo?.visibility ? fetchWeatherDetailsVisibilitySuccessInfo.visibility : '');


  currentDate.setDate(currentDate.getDate());
  currentDate.setDate(currentDate.getDate());

  data.push({ date: (calculateDateNumber(currentDate).toString()), month: calculateMonth(currentDate), day: arabic.day[moment(currentDate).get('day')], year: calculateYear(currentDate), selected: true });
  for (let i = 1; i < 7; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    data.push({ date: (calculateDateNumber(currentDate)).toString(), month: calculateMonth(currentDate), day: arabic.day[moment(currentDate).get('day')], year: calculateYear(currentDate), selected: false });
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
      <Label style={styles.labels}>
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
    let width = 160;
    let height = 160;
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
    const timeZone = isObjectNonEmpty(fetchWeatherDetailsSuccessInfo?.city) ? fetchWeatherDetailsSuccessInfo?.city?.timezone : undefined

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
              <Label style={styles.imageLabel6} children={getConvertedTime(todayWeatherData.sunrise, timeZone!)} />
            </View>
          </View>
        }
        {(todayWeatherData.sunset && timeZone) &&
          <View style={styles.timeZoneStyle}>
            <WeatherNightIcon style={styles.weatherSunIcon} width={25} height={20} />
            <View style={styles.timeZoneLabelStyle}>
              <Label style={styles.sunStateLabelStyle} children={CONST_SUNSET} />
              <Label style={styles.imageLabel6} children={getConvertedTime(todayWeatherData.sunset, timeZone)} />
            </View>
          </View>
        }
      </>
    )
  }

  const weatherImage = () => (
    <ImageBackground source={getBackgroundImage()} style={styles.weatherImage}>
      <View style={styles.weatherImageView1}>
        <Text style={styles.imageLabel1}>{fetchWeatherDetailsSuccessInfo?.city.name}</Text>
        <Text style={styles.imageLabel2}>{data[0].date} {data[0].month} {data[0].year}</Text>
      </View>
      <View style={styles.weatherImageView2}>
        <Text style={styles.imageLabel3}>{Math.round(fetchWeatherDetailsSuccessInfo?.list[0].temp.day as number) + '°'}</Text>
        <View style={{ flexDirection: 'column' }}>
          {getImageIcon()}
          <Label style={styles.imageLabel4}>
            {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description}
          </Label>
        </View>
      </View>
      {isNonEmptyArray(weatherListData) && renderSunRiseAndSunSet()}
    </ImageBackground>
  );

  const updateOnPress = (index: number) => {
    const weatherUpdates = weatherDataDetails.map((item: weatherDate) => {
      item.selected = false;
      return item;
    });
    weatherDataDetails[index].selected = true;
    setWeatherDataDetails(weatherUpdates);
    setWeatherListDetails(fetchWeatherDetailsSuccessInfo?.list[index])
    if (index == 0 && fetchWeatherDetailsVisibilitySuccessInfo?.visibility) {
      setWeatherDataVisibility(fetchWeatherDetailsVisibilitySuccessInfo?.visibility)
    } else {
      setWeatherDataVisibility('')
    }
  };

  const renderItem = (item: weatherDate, index: number) => {
    return (
      <TouchableWithoutFeedback onPress={() => updateOnPress(index)}>
        <View style={[styles.dayContainerNotSelected, item.selected && styles.dayContainerSelected]}>
          <View>
            <Label numberOfLines={1}
              style={[styles.dayContainerLabel1, item.selected && { color: colors.white }]}
              children={item.day} />
          </View>
          <View>
            <Label numberOfLines={1} style={styles.dayContainerLabel2}>
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
          <Label style={styles.labelsList1}>
            {'    '}
            {CONST_MAX}
          </Label>
        </View>
        {(weatherListDetails?.temp.max && weatherListDetails?.temp.min) &&
          <Label style={styles.labelsList2}>{weatherListDetails?.temp.max}°/{weatherListDetails?.temp.min}°</Label>
        }
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherRainIcon width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.labelsList1}>
            {'    '}
            {CONST_HUMIDITY}
          </Label>
        </View>
        {weatherListDetails?.humidity &&
          <Label style={styles.labelsList2}>{weatherListDetails?.humidity}%</Label>
        }
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon3 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.labelsList1}>
            {'    '}
            {CONST_SPEED}
          </Label>
        </View>
        <Label style={styles.labelsList2}>{weatherListDetails?.speed} {CONST_KMH}</Label>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon4 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.labelsList1}>
            {'    '}
            {CONST_VISIBILITY}
          </Label>
        </View>
        <Label style={styles.labelsList2}>{weatherDataVisibility}  {CONST_KM}</Label>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon5 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.labelsList1}>
            {'    '}
            {CONST_PRESSURE}
          </Label>
        </View>
        <Label style={styles.labelsList2}>{weatherListDetails?.pressure} {CONST_MBAR}</Label>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon6 width={24} height={24} style={styles.labelsListIcon} />
          <Label style={styles.labelsList1}>
            {'    '}
            {CONST_SEA_CONDITION}
          </Label>
        </View>
        <Label style={styles.labelsList2}></Label>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weatherDetail()}
        <View style={styles.weatherDate}>
          <FlatList
            testID={'newsHorizontalListId'}
            horizontal
            data={weatherDataDetails}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)}
            bounces={false}
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
      backgroundColor: theme.mainBackground,
    },
    weatherDetail: {
      margin: normalize(20),
    },
    weatherDate: {
      margin: normalize(15),
      marginBottom: normalize(40)
    },
    weatherImage: {
      marginTop: normalize(20),
      paddingHorizontal: normalize(15),
      paddingRight: normalize(10)
    },
    weatherDescriptionView: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between'
    },
    labels: {
      fontFamily: fonts.AwsatDigital_Regular,
      textAlign: 'left',
      fontSize: normalize(17),
      color: theme.primaryBlack,
      lineHeight: normalize(27),
    },
    dayContainerLabel1: {
      fontFamily: fonts.AwsatDigital_Regular,
      textAlign: 'left',
      fontSize: normalize(15),
      color: colors.greenishBlue,
      lineHeight: normalize(28),
    },
    dayContainerLabel2: {
      fontFamily: fonts.Effra_Regular,
      textAlign: 'left',
      fontSize: normalize(11),
      lineHeight: normalize(18),
      color: colors.titleGrey,
    },
    imageLabel1: {
      fontSize: normalize(38),
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'left',
      lineHeight: normalize(48),
    },
    imageLabel2: {
      fontSize: normalize(10),
      color: colors.white,
      fontFamily: fonts.Effra_Regular,
      textAlign: 'left',
      lineHeight: normalize(32),
    },
    imageLabel3: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: 70,
      color: colors.white,
      lineHeight: 75,
      alignSelf: 'center',
      paddingTop: 10
    },
    imageLabel4: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(18),
      lineHeight: normalize(27),
      color: colors.white,
      textAlign: 'center',
    },
    imageLabel5: {
      fontFamily: fonts.AwsatDigital_Regular,
      alignSelf: 'flex-start',
      fontSize: normalize(15),
      color: colors.white,
      lineHeight: normalize(36),
    },
    imageLabel6: {
      fontSize: normalize(8),
      color: colors.white,
      fontFamily: fonts.Effra_Regular,
      alignSelf: 'flex-start'
    },
    dayContainerNotSelected: {
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.white,
      // height: normalize(50),
      // width: normalize(63),
      padding: normalize(10),
      marginHorizontal: normalize(5),
      borderRadius: normalize(5),
      borderColor: colors.borderGray,
      borderWidth: normalize(1),
    },
    dayContainerSelected: {
      backgroundColor: colors.greenishBlue,
      borderColor: colors.borderGreen,
    },
    weatherImageView1: {
      padding: normalize(10)
    },
    weatherSunIcon: {
      marginRight: normalize(6)
    },
    weatherImageView2: {
      paddingHorizontal: normalize(10),
      flexDirection: 'row',
      justifyContent: 'space-between'
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
      flexDirection: 'row'
    },
    labelsList1: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(18),
      color: theme.primaryBlack,
      lineHeight: normalize(32),
    },
    labelsList2: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(18),
      color: theme.primaryBlack,
      lineHeight: normalize(32),
    },
    labelsListIcon: {
      marginTop: normalize(5)
    },
    timeZoneLabelStyle: {
      flexDirection: 'column'
    },
    sunStateLabelStyle: {
      fontFamily: fonts.AwsatDigital_Regular,
      fontSize: normalize(15),
      color: colors.white,
      lineHeight: normalize(33),
      justifyContent: 'center',
      alignSelf: 'flex-start'
    },
    timeZoneStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: normalize(10),
      paddingBottom: normalize(10),
    },
  });