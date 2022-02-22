import React from 'react';
import {View, StyleSheet} from 'react-native';

import {ButtonImage, Image, Label} from '../atoms';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {ImagesName} from 'src/shared/styles';
import {normalize, screenWidth} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {getSvgImages} from 'src/shared/styles/svgImages';

const PodcastWidget = () => {
  const {themeData} = useTheme();
  const style = useThemeAwareObject(createStyles);

  return (
    <View style={style.container}>
      <View style={style.podcastImageContainer}>
        <Image
          resizeMode="stretch"
          url={'https://picsum.photos/200'}
          style={style.podcastImage}
        />
      </View>
      <View style={style.bodyContainer}>
        <Label
          color={themeData.primaryBlack}
          style={style.podcastTitle}
          children={'استمع لبودكاست آخر أخبار اليوم'}
          numberOfLines={1}
        />
        <View style={style.durationContainer}>
          <Label
            color={colors.greenishBlue}
            children={'استمع الي البودكاست '}
            style={style.authorTitle}
            numberOfLines={1}
          />
          <ButtonImage
            icon={() => {
              return getSvgImages({
                name: ImagesName.playIconSVG,
                size: normalize(13),
              });
            }}
            onPress={() => {}}
            style={style.playIcon}
          />
          <Label
            color={colors.spanishGray}
            children={'3:22'}
            style={style.duration}
          />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: CustomThemeType) => {
  const podcastWidgetStyle = StyleSheet.create({
    container: {
      marginHorizontal: 0.04 * screenWidth,
      marginVertical: normalize(15),
      backgroundColor: theme.secondaryGreen,
      flexDirection: 'row',
      height: normalize(71),
      alignContent: 'center',
    },
    podcastImageContainer: {
      width: '22%',
    },
    podcastImage: {
      width: '100%',
      height: '100%',
    },
    bodyContainer: {
      overflow: 'hidden',
      width: '78%',
    },
    podcastTitle: {
      marginTop: normalize(10),
      marginBottom: normalize(8),
      alignSelf: 'flex-start',
      marginLeft: normalize(10),
      fontSize: normalize(15),
      lineHeight: normalize(25),
      fontWeight: 'bold',
    },
    durationContainer: {
      width: '75%',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginTop: normalize(5),
    },
    authorTitle: {
      marginLeft: normalize(10),
      fontSize: normalize(12),
      fontWeight: 'bold',
    },
    playIcon: {
      width: normalize(13),
      height: normalize(13),
      marginLeft: normalize(19),
    },
    duration: {
      marginLeft: normalize(19),
      fontSize: normalize(12),
      lineHeight: normalize(14),
    },
  });
  return podcastWidgetStyle;
};

export default PodcastWidget;
