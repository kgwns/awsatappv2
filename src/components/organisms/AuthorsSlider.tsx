import React, { useRef } from 'react';
import {FlatList, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {AuthorItem} from 'src/components/molecules';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils';
import { getImageUrl, isNonEmptyArray, isNotEmpty } from 'src/shared/utils/utilities';
import { Divider, LabelTypeProp, WidgetHeader, WidgetHeaderProps } from '../atoms';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { t } from 'i18next';
import { ImagesName, Styles } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants';

const AuthorSlider = ({
    data,
    widgetHeader,
    containerStyle,
    widgetHeaderStyle,
    widgetHeaderContainerStyle
}: {
    data: any, listKey?: string,
    widgetHeader?: string,
    containerStyle?: StyleProp<ViewStyle>,
    widgetHeaderContainerStyle?: StyleProp<ViewStyle>,
    widgetHeaderStyle?: StyleProp<ViewStyle>
}) => {
  const style = useThemeAwareObject(customStyle);
  const scrollRef = useRef<ScrollView>(null);
  const { themeData } = useTheme()
  const navigation = useNavigation<StackNavigationProp<any>>();

  const renderItem = (item: any, index: number) => {
    return (
        <FlatList
            data={item}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            listKey={'AuthorSlider'+ index + new Date().getTime().toString()}
            renderItem={({ item, index }) => renderAuthorList(item, index)}
            style={[style.itemListContainer, isTab && index === 2 && {marginLeft: 0}]}
            ItemSeparatorComponent={() => <Divider style={style.divider} />}
        />
    );
  };

  const renderAuthorList = (item: any, index: number) => {
    return (
        <View style={{}}>
            <AuthorItem body={item.title}  
            mediaVisibility={isNotEmpty(item.field_jwplayer_id_opinion_export)} 
            author={
                isNonEmptyArray(item.field_opinion_writer_node_export)
                ? item.field_opinion_writer_node_export[0].name
                : item.field_opinion_writer_node_export.opinion_writer_photo
            }
            duration={''} 
            image={
                isNonEmptyArray(item.field_opinion_writer_node_export)
                ? getImageUrl(
                    item.field_opinion_writer_node_export[0].opinion_writer_photo
                    )
                : getImageUrl(
                    item.field_opinion_writer_node_export.opinion_writer_photo,
                    )
            }
            index={index} 
            nid={item.nid}
            />
        </View>
    );
  };

  const scrollToStart = () => {
    if (isIOS) return
    scrollRef.current?.scrollToEnd();
  }
  const widgetHeaderData: WidgetHeaderProps = {
    headerLeft: {
        title: widgetHeader ? widgetHeader : t('latestNewsTab.sectionWriters.headerLeft'),
        color: themeData.primary,
        labelType: LabelTypeProp.h2,
        elementContainerStyle: style.headerLeftContainer
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

  const onPressMore = () => {
    const params = { sectionId: null, title: "الرأي", keyName: "opinion" }
    navigation.navigate(ScreensConstants.SectionArticlesParentScreen, params)
  }

  return (
    <View style={StyleSheet.flatten([style.container,containerStyle])}>
        <View style={StyleSheet.flatten([style.headerContainer, widgetHeaderContainerStyle])}>
            <WidgetHeader {...widgetHeaderData} widgetHeaderStyle={widgetHeaderStyle} onPress={onPressMore} />
        </View>
        <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={()=> scrollToStart()}
        bounces={false}
        style={style.container}>
            <FlatList
            listKey={'AuthorSlider' + new Date().getTime().toString()}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => renderItem(item, index)}
            style={style.listContainer}
            bounces={false}
        />
    </ScrollView>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const AuthorSliderStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      alignContent: 'center',
      flex: 1
    },
    headerContainer: {
        paddingHorizontal:0.04 * screenWidth,
        backgroundColor: theme.secondaryWhite,
        paddingTop:normalize(10)
    },
    headerLeftContainer: {
        paddingHorizontal: 0,
    },
    listContainer: {
        flex: 1,
        paddingTop: normalize(20),
        backgroundColor: theme.secondaryWhite,
        paddingBottom:normalize(20),
        paddingEnd: (isTab ? 0.02 : 0.04) * screenWidth
    },
    itemListContainer: {
        width: screenWidth * (isTab ? 0.43 : 0.84),
        marginStart: 0.04 * screenWidth,
        marginEnd: isTab ? 0 : 0.04 * screenWidth,
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
  });
  return AuthorSliderStyle;
};
export default AuthorSlider;
