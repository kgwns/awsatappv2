import React, { useRef, useState } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { AuthorItem } from 'src/components/molecules';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils';
import { getImageUrl, isNonEmptyArray, isNotEmpty } from 'src/shared/utils/utilities';
import { Divider, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { ImagesName } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';

const AuthorSlider = ({
  data,
  widgetHeader,
  containerStyle,
  widgetHeaderStyle,
  widgetHeaderContainerStyle,
  getSelectedTrack,
  selectedType,
  onClose,
  tid
}: {
  data: any, listKey?: string,
  widgetHeader?: string,
  containerStyle?: StyleProp<ViewStyle>,
  widgetHeaderContainerStyle?: StyleProp<ViewStyle>,
  widgetHeaderStyle?: StyleProp<ViewStyle>
  getSelectedTrack?: (id: any, type: 'OPINION' | 'PODCAST') => void,
  selectedType?: string,
  onClose?: () => void,
  tid?: string
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const CONST_OPINION_COMBO_TITLE = TranslateConstants({ key: TranslateKey.OPINION_SLIDER_TITLE })
  const SECTION_COMBO_ONE_HEADER_RIGHT = TranslateConstants({ key: TranslateKey.SECTION_COMBO_ONE_HEADER_RIGHT })
  const TAB_OPINION_TITLE = TranslateConstants({key: TranslateKey.TABLET_OPINION_SLIDER_LEFT_HEADER})


  const { themeData } = useTheme()
  const style = useThemeAwareObject(customStyle);

  const scrollRef = useRef<ScrollView>(null);

  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<any>(isIOS ? 0 : data.length - 1);

  const renderSeparator = () => {
    if (isTab) {
      return null
    }
    return(
      <Divider style={style.divider} />
    )
  }

  const renderItem = (item: any, index: number) => {
    return (
      <FlatList
        data={item}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        listKey={`AuthorSlider${index}${new Date().getTime().toString()}`}
        renderItem={({ item, index }) => renderAuthorList(item, index)}
        style={[!isTab && style.itemListContainer, isTab && index === 2 && { marginLeft: 0 }]}
        ItemSeparatorComponent={() => renderSeparator()}
      />
    );
  };
  

  const renderAuthorList = (item: any, index: number) => {
    return (
      <View style = {isTab && style.tabAuthorContainer}>
        <AuthorItem body={item.title}
          mediaVisibility={isNotEmpty(item.field_jwplayer_id_opinion_export)}
          jwPlayerID={isNotEmpty(item.field_jwplayer_id_opinion_export) ? item.field_jwplayer_id_opinion_export : null}
          selectedTrack={selectedTrack}
          selectedType={selectedType}
          author={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? item.field_opinion_writer_node_export[0].name
              : item.field_opinion_writer_node_export?.opinion_writer_photo
          }
          authorId={
            isNonEmptyArray(item.field_opinion_writer_node_export) && item?.field_opinion_writer_node_export[0].id
          }
          duration={''}
          image={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? getImageUrl(
                item.field_opinion_writer_node_export[0]?.opinion_writer_photo
              )
              : getImageUrl(
                item.field_opinion_writer_node_export?.opinion_writer_photo,
              )
          }
          index={index}
          nid={item.nid}
          showDivider = {(isTab && index < 6) ? true : false}
          showInMainScreen = {isTab ? true : false}
        />
      </View>
    );
  };

  const scrollToStart = () => {
    if (isIOS) {
      return
    }
    scrollRef.current?.scrollToEnd();
  }

  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
      title: widgetHeader ? widgetHeader : isTab ? TAB_OPINION_TITLE : CONST_OPINION_COMBO_TITLE,
      color: isTab ? themeData.primaryBlack : themeData.primary,
      labelType: LabelTypeProp.title3,
      elementContainerStyle: style.headerLeftContainer,
      textStyle: isTab && style.opinionHeader
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
      labelType: LabelTypeProp.caption2,
      clickable: true,
    },
  };

  const onPressMore = () => {
    const params = { sectionId: tid, title: CONST_OPINION_COMBO_TITLE, keyName: "opinion" }
    navigation.navigate(ScreensConstants.SectionArticlesParentScreen, params)
  }

  const onMomentumScrollEnd = (event: any) => {
    if (!event) {
      return
    }

    const xOffset = event.nativeEvent.contentOffset.x + 10;
    const currentIndex = Math.floor(xOffset / screenWidth);
    currentIndex !== activeIndex && setActiveIndex(currentIndex);
  }

  const renderIndicator = () => {
    const renderItemIndicator = (index: number) => {
      return (
        <View key={`indicator-${index}`} style={[style.indicatorStyle, activeIndex === index && style.activeIndicatorStyle]} >
        </View>
      )
    }

    return (
      <View style={style.containerStyle}>
        {isIOS ? data.map((_: any, index: number) => {
          return renderItemIndicator(index);
        }) :
          data.map((_: any, index: number) => {
            return renderItemIndicator(index);
          }).reverse()
        }
      </View>
    )
  }

  return (
    <View>
      {
        isTab ?
        <View style={StyleSheet.flatten([style.container, containerStyle])}>
          <View style={StyleSheet.flatten([style.headerContainer, widgetHeaderContainerStyle])}>
            <WidgetHeader {...widgetHeaderData} widgetHeaderStyle={widgetHeaderStyle} onPress={onPressMore} />
          </View>
          {/* Enable ScrollView in Tab when required */}
          {/* <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            scrollEventThrottle={32}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() => scrollToStart()}
            bounces={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
            style={style.container}> */}
            <FlatList
              listKey={'AuthorSlider' + new Date().getTime().toString()}
              keyExtractor={(_, index) => index.toString()}
              numColumns={3}
              data={data}
              renderItem={({ item, index }) => renderAuthorList(item, index)}
            />
          {/* </ScrollView> */}
          {/* {isNonEmptyArray(data) && <View style={style.indicatorContainer}>
            {renderIndicator()}
          </View>} */}
        </View>
        : <View style={StyleSheet.flatten([style.container, containerStyle])}>
          <View style={StyleSheet.flatten([style.headerContainer, widgetHeaderContainerStyle])}>
            <WidgetHeader {...widgetHeaderData} widgetHeaderStyle={widgetHeaderStyle} onPress={onPressMore} />
          </View>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            scrollEventThrottle={32}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() => scrollToStart()}
            bounces={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
            style={style.container}>
            <FlatList
              listKey={'AuthorSlider' + new Date().getTime().toString()}
              keyExtractor={(_, index) => index.toString()}
              numColumns={4}
              data={data}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => renderItem(item, index)}
              style={style.listContainer}
              bounces={false}
            />
          </ScrollView>
          {isNonEmptyArray(data) && <View style={style.indicatorContainer}>
            {renderIndicator()}
          </View>}
        </View>
      }
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.secondaryWhite,
      alignContent: 'center',
      flex: 1,
      paddingHorizontal: isTab ? 25 : 0,
      paddingBottom: isTab ? 20 : 0
    },
    headerContainer: {
      paddingHorizontal: isTab ? 0 : 0.04 * screenWidth,
      backgroundColor: theme.secondaryWhite,
      paddingTop: normalize(30),
      paddingBottom: normalize(10),
    },
    headerLeftContainer: {
      paddingHorizontal: 0,
    },
    listContainer: {
      flex: 1,
      paddingTop: normalize(20),
      backgroundColor: theme.secondaryWhite,
    },
    itemListContainer: {
      width: screenWidth * 1,
      paddingHorizontal: 0.04 * screenWidth,
    },
    itemStyle: {
      flex: 1,
      flexWrap: 'wrap'
    },
    divider: {
      marginBottom: normalize(20),
      height: 1,
      backgroundColor: theme.dividerColor
    },
    indicatorContainer: {
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: normalize(10),
    },
    indicatorStyle: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: colors.altoGray,
      margin: 4,
    },
    activeIndicatorStyle: {
      backgroundColor: colors.greenishBlue,
    },
    containerStyle: {
      flexDirection: 'row'
    },
    tabAuthorContainer: {
      flex: 1,
      margin:10,
    },
    opinionHeader: {
      fontFamily: fonts.AwsatDigital_Black,
      fontSize: 25,
      lineHeight: 36,
      fontWeight: '900'
    }
  });
};
export default AuthorSlider;
