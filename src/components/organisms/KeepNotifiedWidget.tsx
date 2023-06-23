import React from 'react';
import {FlatList, StyleSheet, View, ListRenderItem} from 'react-native';
import {flatListUniqueKey} from 'src/constants/Constants';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Divider} from '../atoms';
import {KeepNotifiedCard} from '../molecules';
import { NotificationDataType } from 'src/redux/keepNotified/types';

export interface KeepNotifiedDataProps {
  nid: number,
  label: string,
  selected: boolean
}

interface KeepNotifiedWidgetProps {
  data: NotificationDataType[],
  onPress: (item: any, selected: boolean) => void
}

const KeepNotifiedWidget = ({
  data,
  onPress
}: KeepNotifiedWidgetProps) => {
  const style = useThemeAwareObject(customStyle);
  const renderItem:ListRenderItem<NotificationDataType> = ({item,index}) => {
    return (
      <View>
        <KeepNotifiedCard
          key={item.id}
          label={item.name}
          selected={item.selected}
          onPress={selected => onPress(item, selected)}
        />
        {data.length !== index+1 &&  <Divider style={style.divider}/>}
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
        contentContainerStyle={ isTab && style.tabletContainerStyle}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
      backgroundColor: theme.profileBackground,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
    tabletContainerStyle:{
      paddingBottom:120
    }
  });
};

export default KeepNotifiedWidget;
