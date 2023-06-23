import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {flatListUniqueKey, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {Divider, Image, Label} from '../atoms';
import {
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {OpinionWriterItemType} from 'src/redux/writers/types';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import { ImagesName } from 'src/shared/styles';
import { getImageUrl, isNotEmpty, isObjectNonEmpty } from 'src/shared/utils/utilities';
import { fonts } from 'src/shared/styles/fonts';
import { decode } from 'html-entities';

interface OpinionWritersWidgetProps {
  data: OpinionWriterItemType[];
  onPressWriter: (tid: string) => void;
}

const OpinionWritersSection = ({data, onPressWriter}: OpinionWritersWidgetProps) => {
  const style = useThemeAwareObject(customStyle);

  const OPINION_WRITERS = TranslateConstants({key:TranslateKey.OPINION_WRITERS})

  const renderItem = (item: OpinionWriterItemType, index: number) => {
    return (
      <TouchableWithoutFeedback
        testID='opinionWriterId'
        onPress={() => isObjectNonEmpty(item) && item.tid && onPressWriter(item.tid)}
        style={[style.writerContainer, { paddingEnd: (data.length - 1 === index) ? 
          normalize(isTab ? 0.02 * screenWidth : 0.04 * screenWidth) : 0 }, 
          { paddingStart: index === 0 ? normalize(isTab ? 0.02 * screenWidth : 0.04 * screenWidth) : 0 }]}
        key={flatListUniqueKey.OPINION_WRITER_SECTION + index}>
        <View style={style.itemContainer}>
          <View style={style.imageContainer}>
            <Grayscale>
              <Image
                url={getImageUrl(item.field_opinion_writer_photo_export)}
                size={normalize(54)}
                type="round"
                resizeMode="cover"
                fallback={true}
                fallbackName={ImagesName.authorDefaultName}
              />
            </Grayscale>
          </View>
          <Label children={isNotEmpty(item.name) ? decode(item.name) : ''}
            style={style.labelStyle} numberOfLines={2}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={[style.container, isTab && style.containerLeftMargin]}>
      <Label style={[style.headerStyle, isTab && style.headerTablet]} children={OPINION_WRITERS} />
      {/* seted initialNumToRender = data.length to fix auto scrolling issue - this is open bug, added link below */}
      {/* https://github.com/facebook/react-native/issues/26436 */}
      <FlatList
        initialNumToRender={data.length}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.OPINION_WRITER_SECTION +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <View style={style.dividerContainer}>
        <Divider style={style.divider}/>
      </View>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.mainBackground,
    },
    headerStyle: {
      fontSize: 20,
      lineHeight: 42,
      color: theme.primary,
      textAlign: 'left',
      marginLeft: normalize(0.04 * screenWidth),
      marginTop: normalize(16),
      marginBottom: normalize(8),
      fontFamily: fonts.AwsatDigital_Bold,
    },
    headerTablet: {
      marginLeft: normalize(0.02 * screenWidth),
      color: theme.primaryBlack,
    },
    writerContainer: {
      marginRight: normalize(20),
    },
    itemContainer: {
      alignItems: 'center',
      width: normalize(54),
      marginBottom : normalize(10)
    },
    labelStyle: {
      textAlign: 'center',
      marginTop: normalize(10),
      fontSize: isTab ? 12 : 10,
      color: theme.secondaryDavyGrey,
      lineHeight: 14,
      fontFamily: fonts.IBMPlexSansArabic_Medium,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
    dividerContainer: {
      paddingHorizontal: 0.04 * screenWidth
    },
    imageContainer: {
      overflow: 'hidden'
    },
    containerLeftMargin: {
      marginLeft: 0.02 * screenWidth
    }
  });
};
export default OpinionWritersSection;
