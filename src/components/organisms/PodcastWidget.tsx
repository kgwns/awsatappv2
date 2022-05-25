import React, { FunctionComponent } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ButtonImage, Image, Label } from '../atoms';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { ImagesName } from 'src/shared/styles';
import { isTab, normalize } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { decodeHTMLTags, getSecondsToHms, isNonEmptyArray } from 'src/shared/utils/utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { flatListUniqueKey } from 'src/constants';
import { fonts } from 'src/shared/styles/fonts';
import { useTranslation } from 'react-i18next'

export interface PodcastWidgetProps {
  onPress: () => void;
  data: any;
}

const PodcastWidget: FunctionComponent<PodcastWidgetProps> = ({
  data,
  onPress,
}) => {
  const [t] = useTranslation();
  const { themeData } = useTheme();
  const style = useThemeAwareObject(createStyles);
  const podcastData = data[0];
  /* const navigation = useNavigation<StackNavigationProp<any>>();

  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
      title: 'بودكاست',
      color: themeData.primaryDarkSlateGray,
      labelType: LabelTypeProp.title3,
      textStyle: { fontFamily: fonts.AwsatDigitalBetav10_Black }
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
      textStyle: { fontFamily: fonts.Effra_Arbc_Medium }
    },
  };

  const navigateToPodcast = () => {
    const params = { sectionId: null, title: "بودكاست", keyName: "podcast" }
    navigation.navigate(ScreensConstants.SectionArticlesParentScreen, params)
  } */

  const ListenToPodcast = () => (
    <View style={style.listenContainer}>
      <ButtonImage
        icon={() => {
          return getSvgImages({
            name: ImagesName.headPhoneIcon,
            size: 15,
          });
        }}
        onPress={onPress}
        style={style.headPhoneIconMargin}
      />
      <Label
        style={style.listenToPodcastTitle}
        color={themeData.primary}
        children={t('podcastHome.listen_to_podcast')}
      />
      <Label
        color={colors.spanishGray}
        children={getSecondsToHms(podcastData?.field_total_duration_export)}
        style={style.duration}
        numberOfLines={1}
      />
    </View>
  )

  /* const AllEpisodesCard = () => (
    <View style={style.allEpisodeContainer}>
      <Label
        numberOfLines={1}
        color={themeData.primaryBlack}
        style={style.allEpisodeTitle}
        children={t('podcastHome.allEpisodes')}
      />
      <View style={style.leftArrowContainer}>
        <ButtonImage
          icon={() => {
            return getSvgImages({
              name: ImagesName.arrowLeftFacedBlack,
              width: 7,
              height: 9,
            });
          }}
          onPress={onPress}
          style={style.leftArrow}
        />
      </View>
    </View>
  )*/

  const renderPodcastItem = () => (
    <View style={style.podcastContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={style.podcastItemContainer}>
          <View style={style.podcastContentContainer}>
            <Label
              numberOfLines={1}
              color={themeData.primary}
              style={style.title}
              children={podcastData?.title}
            />
            <Label
              color={themeData.secondaryDavyGrey}
              style={style.body}
              children={decodeHTMLTags(podcastData?.body_export)}
              numberOfLines={2}
            />
          </View>
          <View style={style.podcastImageContainer}>
            <View style={style.imageWrapper}>
              <Image
                fallback
                resizeMode="stretch"
                url={podcastData?.field_podcast_sect_export?.image}
                style={style.image}
              />
            </View>
          </View>
        </View>
        <View style={style.podcastBottomContainer}>
          <View style={style.listenCardContainer}>
            <ListenToPodcast />
          </View>
          <View style={style.labelContainer}>
            {/* <AllEpisodesCard/> enable when list of episodes available */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )

  const tabletData = isNonEmptyArray(data) && (data.length > 2) ? data.slice(0, 2) : data
  const renderTablet = () => (
    <View style={style.tabletContainer}>
      <FlatList
        data={tabletData}
        numColumns={2}
        style={style.flatList}
        listKey={flatListUniqueKey.TAB_PODCAST_HOME}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderPodcastItem}
      />
    </View>
  )

  return  isTab ?  renderTablet() : renderPodcastItem();

};

const createStyles = (theme: CustomThemeType) => {
  const podcastWidgetStyle = StyleSheet.create({
    title: {
      textAlign: 'left',
      fontSize: 16,
      lineHeight: 24,
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    body: {
      textAlign: 'left',
      fontSize: 13,
      lineHeight: 24,
      fontFamily: fonts.Effra_Regular,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    headPhoneIconMargin: {
      marginRight: 10,
    },
    listenContainer: {
      flexDirection: 'row',
      alignContent: 'center',
    },
    listenToPodcastTitle: {
      fontSize: 13,
      lineHeight: 19,
      fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    duration: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: fonts.IBMPlexSansArabic_Medium,
      marginLeft: 5
    },
    allEpisodeContainer: {
      flexDirection: 'row',
    },
    allEpisodeTitle: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily: fonts.Effra_Arbc_Medium
    },
    leftArrowContainer: {
      marginStart: 5,
      marginTop: 2,
    },
    leftArrow: {
      marginRight: 5
    },
    podcastContainer: {
      padding: 20,
      backgroundColor: theme.secondaryGreen,
      marginBottom: 25
    },
    podcastItemContainer: {
      flexDirection: 'row'
    },
    podcastContentContainer: {
      width: '70%',
      paddingEnd: normalize(5)
    },
    podcastImageContainer: {
      width: '30%',
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
    },
    imageWrapper: {
      height: isTab ? normalize(70) : 73,
      width: isTab ? normalize(90) : 92
    },
    podcastBottomContainer: {
      flexDirection: 'row',
      marginTop: normalize(15),
    },
    listenCardContainer: {
      width: '70%',
      paddingEnd: normalize(10)
    },
    labelContainer: {
      width: '30%',
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
    },
    tabletContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.mainBackground,
      paddingHorizontal: 20
    },
    flatList: {
      width: '50%'
    },
  });
  return podcastWidgetStyle;
};

export default PodcastWidget;
