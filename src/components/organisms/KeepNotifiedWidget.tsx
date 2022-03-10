import React from 'react';
import {FlatList, StyleSheet, View, ListRenderItem} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {screenWidth} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Divider} from '../atoms';
import {KeepNotifiedCard} from '../molecules';

export interface KeepNotifiedDataProps {
  nid: number,
  label: string,
  selected: boolean
}

interface KeepNotifiedWidgetProps {
  data: KeepNotifiedDataProps[],
  onPress: (index: number) => void
}

const KeepNotifiedWidget = ({
  data,
  onPress
}: KeepNotifiedWidgetProps) => {
  const style = useThemeAwareObject(customStyle);
  const renderItem:ListRenderItem<KeepNotifiedDataProps> = ({item,index}) => {
    return (
      <View>
        <KeepNotifiedCard
          key={item.nid}
          label={item.label}
          selected={item.selected}
          onPress={() => onPress(index)}
        />
        <Divider style={style.divider}/>
      </View>
    );
  };
  return (
    <View style={style.container}>
      <FlatList
        listKey={flatListUniqueKey.KEEP_NOTIFIED_WIDGET}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        bounces={false}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const KeepNotifiedWidgetStyle = StyleSheet.create({
    container: {
      paddingHorizontal: 0.05 * screenWidth,
      backgroundColor: theme.backgroundColor,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    }
  });
  return KeepNotifiedWidgetStyle;
};

export default KeepNotifiedWidget;
