import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import { ShortArticle } from 'src/components/organisms/index';
import { shortArticleWithTagProperties, TranslateConstants, TranslateKey, ScreensConstants } from 'src/constants/Constants';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { Image, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { ImagesName, Styles } from 'src/shared/styles';
import { ImageResize } from 'src/shared/styles/text-styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getSvgImages } from 'src/shared/styles/svgImages';

const SectionComboOne = ({
  data,
  onPress,
  sectionId,
  onUpdateBookmark,
  showSignUpPopUp
}: {
  data: LatestArticleDataType[];
  onPress: (nid: string) => void;
  sectionId: string;
  onUpdateBookmark: (nid: string,isBookmarked: boolean) => void,
  showSignUpPopUp: () => void
}) => {
  const { themeData } = useTheme();

  const SECTION_COMBO_ONE_HEADER_RIGHT = TranslateConstants({key:TranslateKey.SECTION_COMBO_ONE_HEADER_RIGHT})
  const navigation = useNavigation<StackNavigationProp<any>>();

  const sectionComboOneData = data.map((item: LatestArticleDataType) => {
    return {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
    };
  });

  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
      // title: t('latestNewsTab.sectionComboOne.headerLeft'),
      color: Styles.color.greenishBlue,
      labelType: LabelTypeProp.h2,
    },
    headerRight: {
      title: SECTION_COMBO_ONE_HEADER_RIGHT,
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

  const renderMainArticleImage = () => {
    return (
      <TouchableOpacity
        style={sectionComboOneStyle.container}
        activeOpacity={0.9}
        onPress={() => onPress(sectionComboOneData[0].nid)} testID = "mainArticleImageId">
        <Image
          url={sectionComboOneData[0].image}
          style={
            isTab
              ? sectionComboOneStyle.topImageTab
              : sectionComboOneStyle.topImage
          }
          resizeMode={ImageResize.COVER}
        />
      </TouchableOpacity>
    );
  };

  if (!isNonEmptyArray(sectionComboOneData)) {
    return null;
  }

  const onPressMore = () => {
    navigation.navigate(ScreensConstants.SectionArticlesScreen, { sectionId: sectionId, title: widgetHeaderData.headerLeft?.title });
  }
  return (
    <View>
      <View style={sectionComboOneStyle.widgetContainer}>
        <WidgetHeader {...widgetHeaderData} onPress={onPressMore} />
      </View>
      {isTab ? (
        <View style={sectionComboOneStyle.tabSplitter}>
          <View style={[sectionComboOneStyle.tabWidgetContainer]}>
            {renderMainArticleImage()}
          </View>
          <View style={sectionComboOneStyle.tabWidgetContainer}>
            <ShortArticle
              data={[...sectionComboOneData].splice(1, 3)}
              onPress={onPress}
              onUpdateBookmark={onUpdateBookmark}
              showSignUpPopUp={showSignUpPopUp}
            />
          </View>
        </View>
      ) : (
        <>
          {renderMainArticleImage()}
          <ShortArticle data={[...sectionComboOneData].splice(1, 3)} onPress={onPress}
            onUpdateBookmark={onUpdateBookmark}
            showSignUpPopUp={showSignUpPopUp}
          />
        </>
      )}
    </View>
  );
};

export default SectionComboOne;

const sectionComboOneStyle = StyleSheet.create({
  tabSplitter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: normalize(20),
    paddingHorizontal: normalize(0.02 * screenWidth)
  },
  tabWidgetContainer: {
    flex: 0.48,
  },
  widgetContainer: {
    paddingTop: isTab ? normalize(25) : normalize(15),
    paddingBottom: isTab ? 0 : normalize(15),
    paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
  },
  topImage: {
    width: 0.92 * screenWidth,
    height: 0.62 * screenWidth,
    marginBottom: normalize(30),
  },
  topImageTab: {
    flex: 1,
    width: 0.46 * screenWidth,
    height: '90%',
  },
  container: {
    alignItems: 'center' 
  }
});
