import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {flatListUniqueKey} from 'src/constants';
import {normalize, screenWidth} from 'src/shared/utils';
import {Divider, Image, Label} from '../atoms';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface opinionWriterProps {
  imageUrl: string;
  label: string;
}

interface OpinionWritersWidgetProps {
  data: opinionWriterProps[];
}

const OpinionWritersSection = ({data}: OpinionWritersWidgetProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const renderItem = (item: opinionWriterProps, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => console.log('pressed' + item.label)}
        style={style.writerContainer}
        key={flatListUniqueKey.OPINION_WRITER_SECTION + index}>
        <View style={style.itemContainer}>
          <View style={[{overflow: 'hidden'}]}>
            <Image url={item.imageUrl} size={54} type="round" />
          </View>
          <Label style={style.labelStyle} numberOfLines={2}>
            {item.label}
          </Label>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.container}>
      <Label style={style.headerStyle}>كتاّاب الرأي</Label>
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
        <Divider />
      </View>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionWritersSectionStyle = StyleSheet.create({
    container: {
      width: '100%',
    },
    headerStyle: {
      fontSize: normalize(15),
      fontWeight: 'bold',
      lineHeight: normalize(42),
      color: theme.primary,
      textAlign: 'left',
      marginLeft: normalize(14),
    },
    writerContainer: {
      marginVertical: normalize(10),
      marginLeft: normalize(14),
    },
    itemContainer: {alignItems: 'center', width: normalize(54)},
    labelStyle: {
      textAlign: 'center',
      marginTop: normalize(10),
      fontSize: normalize(10),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(14),
    },
  });
  return OpinionWritersSectionStyle;
};
export default OpinionWritersSection;
