import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {flatListUniqueKey} from 'src/constants';
import {normalize, screenWidth} from 'src/shared/utils';
import {Divider, Image, Label} from '../atoms';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {OpinionWriterItemType} from 'src/redux/writers/types';
import {useTranslation} from 'react-i18next';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import { Styles } from 'src/shared/styles';
import AuthorDefaultGrey from 'src/assets/images/icons/authorDefaultGrey.svg';
import { getImageUrl } from 'src/shared/utils/utilities';

interface OpinionWritersWidgetProps {
  data: OpinionWriterItemType[];
  onPressWriter: (tid: string) => void;
}

const OpinionWritersSection = ({data, onPressWriter}: OpinionWritersWidgetProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const [t] = useTranslation();
  const renderItem = (item: OpinionWriterItemType, index: number) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => onPressWriter(item.tid)}
        style={[style.writerContainer, { paddingEnd: (data.length - 1 === index) ? normalize(0.04 * screenWidth) : 0 }, { paddingStart: index === 0 ? normalize(0.04 * screenWidth) : 0 }]}
        key={flatListUniqueKey.OPINION_WRITER_SECTION + index}>
        <View style={style.itemContainer}>
          <View style={[{overflow: 'hidden'}]}>
            <Grayscale>
              <Image
                url={getImageUrl(item.field_opinion_writer_photo_export)}
                size={normalize(54)}
                type="round"
                resizeMode="cover"
                fallback={true}
                fallbackContent={<AuthorDefaultGrey
                style={{ backgroundColor:Styles.color.silverChalice }}
                width={normalize(54)} 
                height={normalize(54)}/>}
              />
            </Grayscale>
          </View>
          <Label style={style.labelStyle} numberOfLines={2}>
            {item.name}
          </Label>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={style.container}>
      <Label style={style.headerStyle}>{t('opinion.opinionWriters')}</Label>
      <FlatList
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
      <View style={{paddingHorizontal: 0.04 * screenWidth}}>
        <Divider style={style.divider}/>
      </View>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionWritersSectionStyle = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.backgroundColor,
    },
    headerStyle: {
      fontSize: normalize(15),
      fontWeight: 'bold',
      lineHeight: normalize(42),
      color: theme.primary,
      textAlign: 'left',
      marginLeft: normalize(0.04 * screenWidth),
      marginTop: normalize(16),
      marginBottom: normalize(8)
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
      fontSize: normalize(10),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(14),
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
  });
  return OpinionWritersSectionStyle;
};
export default OpinionWritersSection;
