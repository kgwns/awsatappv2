import React, { FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonImage, Divider, Image, Label, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { ImagesName, Styles } from 'src/shared/styles';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { decodeHTMLTags, getSecondsToHms } from 'src/shared/utils/utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants';

export interface PodcastWidgetProps {
  onPress: () => void;
  data: any;
}

const PodcastWidget: FunctionComponent<PodcastWidgetProps> = ({
  data,
  onPress,
}) => {
  const { themeData } = useTheme();
  const style = useThemeAwareObject(createStyles);
  const podcastData = data[0];
  const navigation = useNavigation<StackNavigationProp<any>>();


  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
      title: 'بودكاست',
      color: themeData.primaryDarkSlateGray,
      labelType: LabelTypeProp.h2,
    },
    headerRight: {
      title: 'المزيد',
      icon: () => {
        return getSvgImages({
          name: ImagesName.arrowLeftFaced,
          size: normalize(12),
          style: { marginLeft: normalize(10) }
        })
      },
      color: Styles.color.smokeyGrey,
      labelType: LabelTypeProp.h3,
      clickable: true,
    },
  };

  const navigateToPodcast = () =>{
    const params = {sectionId: null, title: "بودكاست", keyName: "podcast"}
    navigation.navigate(ScreensConstants.SectionArticlesParentScreen,params)
  }

  return (
    <View>
      <View style={style.spacing}>
        <WidgetHeader {...widgetHeaderData} onPress={navigateToPodcast} />
      </View>
      <TouchableOpacity style={style.container} onPress={onPress}>
        <View style={style.topContainer}>
          <Label
            children={podcastData.field_announcer_name_export}
            style={style.announcer}
            color={colors.greenishBlue}
            numberOfLines={1}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: normalize(10) }}>
            <Label
              color={colors.greenishBlue}
              children={getSecondsToHms(podcastData?.field_total_duration_export)}
              style={{ marginEnd: normalize(10) }}
              numberOfLines={1}
            />
            <View style={style.playView}>
              <ButtonImage
                icon={() => {
                  return getSvgImages({
                    name: ImagesName.playIconSVG,
                    size: normalize(13),
                  });
                }}
                onPress={onPress}
                style={{ marginRight: 4 }}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ width: isTab ? '88%' : '75%', paddingEnd: normalize(10) }}>
            <Label
              color={themeData.primaryBlack}
              style={style.title}
              children={podcastData?.title}
              numberOfLines={1}
            />
            <Label
              color={themeData.secondaryDavyGrey}
              style={style.body}
              children={decodeHTMLTags(podcastData?.body_export)}
              numberOfLines={2}
            />
          </View>
          <View style={style.imageView}>
            <View style={{ height: normalize(70), width: normalize(79) }}>
              <Image
                fallback
                resizeMode="stretch"
                url={podcastData?.field_podcast_sect_export?.img_podcast_mobile}
                style={style.image}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Divider style={style.divider} />
    </View>
  );
};

const createStyles = (theme: CustomThemeType) => {
  const podcastWidgetStyle = StyleSheet.create({
    spacing: {
      paddingHorizontal: 0.04 * screenWidth,
      paddingTop: normalize(12)
    },
    container: {
      backgroundColor: theme.secondaryWhite,
      padding: normalize(12),
      marginHorizontal: 0.04 * screenWidth,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: normalize(5)
    },
    announcer: {
      fontSize: normalize(15),
      lineHeight: normalize(24),
      maxWidth: '70%'
    },
    playView: {
      width: normalize(29),
      height: normalize(29),
      borderRadius: normalize(29),
      backgroundColor: colors.aliceBlue,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      textAlign: 'left',
      fontSize: normalize(16),
      lineHeight: normalize(24),
      fontWeight: 'bold'
    },
    body: {
      textAlign: 'left',
      fontSize: normalize(13),
      lineHeight: normalize(24)
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageView: {
      width: isTab ? '12%' : '25%',
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor,
    }
  });
  return podcastWidgetStyle;
};

export default PodcastWidget;
