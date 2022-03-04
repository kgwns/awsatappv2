import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import { ShortArticle } from 'src/components/organisms/index';
import { shortArticleWithTagProperties } from 'src/constants/SampleData';
import { LatestArticleDataType } from 'src/redux/latestNews/types';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { Image, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTranslation } from 'react-i18next';
import { ImagesName, Styles } from 'src/shared/styles';
import { ImageResize } from 'src/shared/styles/text-styles';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getSvgImages } from 'src/shared/styles/svgImages';

const SectionComboOne = ({
  data,
  onPress,
  sectionId,
  onUpdateBookmark
}: {
  data: LatestArticleDataType[];
  onPress: (nid: string) => void;
  sectionId: string;
  onUpdateBookmark: (nid: string,isBookmarked: boolean) => void
}) => {
  const { themeData } = useTheme();

  const [t] = useTranslation();

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
      title: t('latestNewsTab.sectionComboOne.headerLeft'),
      color: Styles.color.greenishBlue,
      labelType: LabelTypeProp.h2,
    },
    headerRight: {
      title: t('latestNewsTab.sectionComboOne.headerRight'),
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
        style={{ alignItems: 'center' }}
        activeOpacity={0.9}
        onPress={() => onPress(sectionComboOneData[0].nid)}>
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

  if (!isNonEmptyArray(sectionComboOneData)) return null;

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
            />
          </View>
        </View>
      ) : (
        <>
          {renderMainArticleImage()}
          <ShortArticle data={sectionComboOneData} onPress={onPress}
            onUpdateBookmark={onUpdateBookmark}
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
    paddingTop: normalize(40),
  },
  tabWidgetContainer: {
    flex: 0.5,
  },
  widgetContainer: {
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(10),
  },
  topImage: {
    width: 0.92 * screenWidth,
    height: 0.62 * screenWidth,
    marginBottom: normalize(30),
  },
  topImageTab: {
    flex: 1,
    width: 0.44 * screenWidth,
    height: '94%',
  },
});
