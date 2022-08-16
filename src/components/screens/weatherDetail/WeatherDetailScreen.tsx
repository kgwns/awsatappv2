import React, { FunctionComponent } from 'react';
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
import { calculateDateNumber, calculateMonth, calculateYear, isNonEmptyArray, isStringIncludes } from 'src/shared/utils/utilities';
import { arabic } from 'src/assets/locales/ar/common-ar';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useWeatherDetails } from 'src/hooks';
import SunImageIcom from 'src/assets/images/icons/weather/Images/Sun.svg'
import CloudImageIcom from 'src/assets/images/icons/weather/Images/Clouds.svg'
import FogImageIcom from 'src/assets/images/icons/weather/Images/Fog.svg'
import RainImageIcom from 'src/assets/images/icons/weather/Images/Rain.svg'
import SunCloudsImageIcon from 'src/assets/images/icons/weather/Images/SunClouds.svg'

interface weatherDate {
  date: string,
  month: string,
  day: string,
  year: number,
  selected: boolean,
}

export const WeatherDetailScreen: FunctionComponent = () => {
  const { fetchWeatherDetailsSuccessInfo, fetchWeatherDetailsVisibilitySuccessInfo } = useWeatherDetails();

  var moments = require('moment-timezone');
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  var currentDate = new Date();
  var data: weatherDate[] = [];

  const [weatherDataDetails, setWeatherDataDetails] = React.useState(data);
  const [weatherListDetails, setweatherListDetails] = React.useState(fetchWeatherDetailsSuccessInfo?.list[0]);
  var [weatherDataVisibility, setWeatherDataVisibility] = React.useState(fetchWeatherDetailsVisibilitySuccessInfo?.visibility ? fetchWeatherDetailsVisibilitySuccessInfo.visibility : '');

  currentDate.setDate(currentDate.getDate());
  currentDate.setDate(currentDate.getDate());

  data.push({ date: (calculateDateNumber(currentDate).toString()), month: calculateMonth(currentDate), day: arabic.day[moment(currentDate).get('day')], year: calculateYear(currentDate), selected: true });
  for (let i = 1; i < 7; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    data.push({ date: (calculateDateNumber(currentDate)).toString(), month: calculateMonth(currentDate), day: arabic.day[moment(currentDate).get('day')], year: calculateYear(currentDate), selected: false });
  }

  let weatherSunrise = fetchWeatherDetailsSuccessInfo?.list[0].sunrise ? fetchWeatherDetailsSuccessInfo?.list[0].sunrise : 0;
  let weatherSunset = fetchWeatherDetailsSuccessInfo?.list[0].sunset ? fetchWeatherDetailsSuccessInfo?.list[0].sunset : 0;

  var offsetTimezone = fetchWeatherDetailsSuccessInfo?.city.timezone ? (fetchWeatherDetailsSuccessInfo?.city.timezone).toString() : 0;
  const timeWeatherSunriseData = new Date(weatherSunrise * 1000);
  var countrySpecificTimeSunrise = moments(timeWeatherSunriseData).utcOffset(offsetTimezone).format('ddd MMM D Y hh:mm:ss A ')
  const timeWeatherSunSetData = new Date(weatherSunset * 1000);
  var countrySpecificTimeSunSet = moments(timeWeatherSunSetData).utcOffset(offsetTimezone).format('ddd MMM D Y hh:mm:ss A ')

  var convertedcountrySpecificTimeSunSet = moments(countrySpecificTimeSunSet).format('HH:mm:ss')
  var convertedcountrySpecificTimeSunrise = moments(countrySpecificTimeSunrise).format('HH:mm:ss')


  const weatherDetail = () => (
    <View style={styles.weatherDetail}>
      <Label style={styles.labels}>{fetchWeatherDetailsSuccessInfo?.city.name}</Label>
      {weatherImage()}
    </View>
  );

  const getBackgroundImage = () => {
    if(isNonEmptyArray(fetchWeatherDetailsSuccessInfo?.list[0].weather)) {
      const mainData = fetchWeatherDetailsSuccessInfo?.list[0].weather[0].main.toLowerCase();
      if (isStringIncludes(mainData,'rain')) {
        return images.rainyImg
      } else if (isStringIncludes(mainData, 'clouds')) {
        return images.cloudyImg
      } else if (isStringIncludes(mainData, 'clear')) {
        return images.clearSkyImg
      } else if (isStringIncludes(mainData, 'sun')) {
        return images.sunnyImg
      } else if (isStringIncludes(mainData, 'sand')) {
        return images.sandImg
      } else {
        return images.clearSkyImg
      }
    }else{
      return images.clearSkyImg
    }
  };

  const getImageIcon = () => {
    if(isNonEmptyArray(fetchWeatherDetailsSuccessInfo?.list[0].weather)) {
      const mainData = fetchWeatherDetailsSuccessInfo?.list[0].weather[0].main.toLowerCase();
      if (isStringIncludes(mainData, 'rain')) {
        return <RainImageIcom height={160} width={160} />
      } else if (isStringIncludes(mainData, 'clouds')) {
        return <CloudImageIcom height={160} width={160} />
      } else if (isStringIncludes(mainData, 'clear')) {
        return <SunCloudsImageIcon height={160} width={160} />
      } else if (isStringIncludes(mainData, 'sun')) {
        return <SunImageIcom height={160} width={160} />
      } else if (isStringIncludes(mainData, 'fog')) {
        return <FogImageIcom height={160} width={160} />
      } else {
        return <SunCloudsImageIcon height={160} width={160} />
      }
    }else{
      return <SunCloudsImageIcon height={160} width={160} />
    }
  };

  const weatherImage = () => (
    <ImageBackground source={getBackgroundImage()} style={styles.weatherImage}>
      <View style={styles.weatherImageView1}>
        <Text style={styles.imageLabel1}>{fetchWeatherDetailsSuccessInfo?.city.name}</Text>
        <Text style={styles.imageLabel2}>{data[0].date} {data[0].month} {data[0].year}</Text>
      </View>
      <View style={styles.weatherImageView2}>
        <Text style={styles.imageLabel3}>{fetchWeatherDetailsSuccessInfo?.list[0].temp.day}</Text>
        <View style={{ flexDirection: 'column' }}>
          {getImageIcon()}
          <Label style={styles.imageLabel4}>
            {fetchWeatherDetailsSuccessInfo?.list[0].weather[0].description}
          </Label>
        </View>
      </View>
      {(fetchWeatherDetailsSuccessInfo?.list[0].sunrise && fetchWeatherDetailsSuccessInfo?.city.timezone) &&
        <View style={styles.weatherImageView1}>
          <Label style={styles.imageLabel5}>
            <WeatherDayIcon style={styles.weatherSunIcon} width={25} height={20} />
            {'  '}
            {t('weatherDetail.sunrise')}
          </Label>
          <Text style={styles.imageLabel6}>{convertedcountrySpecificTimeSunrise}</Text>
        </View>
      }
      {(fetchWeatherDetailsSuccessInfo?.list[0].sunset && fetchWeatherDetailsSuccessInfo?.city.timezone) &&
        <View style={styles.weatherImageView1}>
          <Label style={styles.imageLabel5}>
            <WeatherNightIcon style={styles.weatherSunIcon} width={25} height={20} />
            {'  '}
            {t('weatherDetail.sunset')}
          </Label>
          <Text style={styles.imageLabel6}>{convertedcountrySpecificTimeSunSet}</Text>
        </View>
      }
    </ImageBackground>
  );

  const updateOnPress = (index: number) => {
    const weatherUpdates = weatherDataDetails.map((item) => {
      item.selected = false;
      return item;
    });
    weatherDataDetails[index].selected = true;
    setWeatherDataDetails(weatherUpdates);
    setweatherListDetails(fetchWeatherDetailsSuccessInfo?.list[index])
    if (index == 0 && fetchWeatherDetailsVisibilitySuccessInfo?.visibility) {
      setWeatherDataVisibility(fetchWeatherDetailsVisibilitySuccessInfo?.visibility)
    } else {
      setWeatherDataVisibility('')
    }
  };

  const renderItem = (item: weatherDate, index: number) => {
    return (
      <TouchableWithoutFeedback onPress={() => updateOnPress(index)}>
        <View style={item.selected ? styles.dayContainerSelected : styles.dayContainerNotSelected}>
          <View>
            <Label numberOfLines={1} style={item.selected ? styles.dayContainerSelectedLabel1 : styles.dayContainerNotSelectedLabel1} >
              {item.month}
            </Label>
          </View>
          <View>
            <Label numberOfLines={1} style={styles.dayContainerLabel2}>
              {item.date}
              {' '}
              {item.day}
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
          <WeatherThermometerIcon width={24} height={24} style={styles.labelsListIcom}/>
          <Label style={styles.labelsList1}>
            {'    '}
            {t('weatherDetail.max')}
          </Label>
        </View>
        {(weatherListDetails?.temp.max && weatherListDetails?.temp.min) &&
          <Label style={styles.labelsList2}>{weatherListDetails?.temp.max}°/{weatherListDetails?.temp.min}°</Label>
        }
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherRainIcon width={24} height={24} style={styles.labelsListIcom}/>
          <Label style={styles.labelsList1}>
            {'    '}
            {t('weatherDetail.humidity')}
          </Label>
        </View>
        {weatherListDetails?.humidity &&
          <Label style={styles.labelsList2}>{weatherListDetails?.humidity}%</Label>
        }
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon3 width={24} height={24} style={styles.labelsListIcom}/>
          <Label style={styles.labelsList1}>
            {'    '}
            {t('weatherDetail.speed')}
          </Label>
        </View>
        <Label style={styles.labelsList2}>{weatherListDetails?.speed} {t('weatherDetail.kmh')}</Label>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon4 width={24} height={24} style={styles.labelsListIcom}/>
          <Label style={styles.labelsList1}>
            {'    '}
            {t('weatherDetail.visibility')}
          </Label>
        </View>
        <Label style={styles.labelsList2}>{weatherDataVisibility}  {t('weatherDetail.km')}</Label>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon5 width={24} height={24} style={styles.labelsListIcom}/>
          <Label style={styles.labelsList1}>
            {'    '}
            {t('weatherDetail.pressure')}
          </Label>
        </View>
        <Label style={styles.labelsList2}>{weatherListDetails?.pressure} {t('weatherDetail.mbar')}</Label>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.weatherDescriptionView}>
        <View style={styles.labelsListContainer}>
          <WeatherIcon6 width={24} height={24} style={styles.labelsListIcom}/>
          <Label style={styles.labelsList1}>
            {'    '}
            {t('weatherDetail.seacondition')}
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
    },
    weatherImage: {
      marginVertical: normalize(20),
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
      color: colors.black,
      lineHeight: normalize(27),
    },
    dayContainerSelectedLabel1: {
      fontFamily: fonts.AwsatDigital_Regular,
      textAlign: 'left',
      fontSize: normalize(15),
      color: colors.white,
      lineHeight: normalize(36),
    },
    dayContainerNotSelectedLabel1: {
      fontFamily: fonts.AwsatDigital_Regular,
      textAlign: 'left',
      fontSize: normalize(15),
      color: colors.greenishBlue,
      lineHeight: normalize(36),
    },
    dayContainerLabel2: {
      fontFamily: fonts.Effra_Regular,
      textAlign: 'left',
      fontSize: normalize(11),
      color: colors.titleGrey,
    },
    imageLabel1: {
      fontSize: normalize(38),
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'left',
    },
    imageLabel2: {
      fontSize: normalize(10),
      color: colors.white,
      fontFamily: fonts.Effra_Regular,
      textAlign: 'left',
    },
    imageLabel3: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(40),
      color: colors.white,
      lineHeight: normalize(42),
      alignSelf: 'center',
    },
    imageLabel4: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(18),
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
      textAlign: 'left',
      paddingLeft: normalize(20)
    },
    dayContainerNotSelected: {
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.white,
      height: normalize(50),
      // width: normalize(63),
      padding: normalize(10),
      marginHorizontal: normalize(5),
      borderRadius: normalize(5),
      borderColor: colors.borderGray,
      borderWidth: normalize(1),
    },
    dayContainerSelected: {
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.greenishBlue,
      height: normalize(50),
      // width: normalize(63),
      padding: normalize(10),
      marginHorizontal: normalize(5),
      borderRadius: normalize(5),
      borderColor: colors.borderGreen,
      borderWidth: normalize(1),
    },
    weatherImageView1: {
      padding: normalize(10)
    },
    weatherSunIcon: {
      marginBottom: normalize(6)
    },
    weatherImageView2: {
      paddingHorizontal: normalize(10),
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    weatherDescriptionContainer: {
      marginHorizontal: normalize(20),
      marginTop: normalize(5),
      marginBottom: normalize(20),
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor,
      marginBottom: normalize(15)
    },
    labelsListContainer: {
      flexDirection:'row'
    },
    labelsList1: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(18),
      color: colors.black,
      lineHeight: normalize(32),
    },
    labelsList2: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(18),
      color: colors.black,
      lineHeight: normalize(32),
    },
    labelsListIcom: {
      marginTop: normalize(5)
    },
  });