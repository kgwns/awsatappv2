import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {screenWidth} from 'src/shared/utils';
import {Divider} from '../atoms';
import {KeepNotifiedCard} from '../molecules';

const data = [
  {
    id: 1,
    label: 'أخبار عاجلة',
    selected: false,
  },
  {
    id: 2,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 2,
    label: 'أهم الأخبار',
    selected: false,
  },
  {
    id: 3,
    label: 'أخبار فيروس كورونا',
    selected: false,
  },
  {
    id: 4,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 5,
    label: 'أخبار عاجلة',
    selected: false,
  },
  {
    id: 6,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 7,
    label: 'أهم الأخبار',
    selected: false,
  },
  {
    id: 8,
    label: 'أخبار فيروس كورونا',
    selected: false,
  },
  {
    id: 9,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 10,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 11,
    label: 'أخبار عاجلة',
    selected: false,
  },
  {
    id: 12,
    label: 'إحاطة الصباح',
    selected: false,
  },
  {
    id: 13,
    label: 'أهم الأخبار',
    selected: false,
  },
  {
    id: 14,
    label: 'أخبار فيروس كورونا',
    selected: false,
  },
  {
    id: 15,
    label: 'إحاطة الصباح',
    selected: false,
  },
];

const KeepNotifiedWidget = () => {
  const changeStatus = (isSelected: boolean, item: any) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == item.id) {
        data[i].selected = isSelected;
      }
    }
  };
  const renderItem = ({item}: any) => {
    return (
      <View>
        <KeepNotifiedCard
          label={item.label}
          selected={item.selected}
          onPress={(isSelected: boolean) => changeStatus(isSelected, item)}
        />
        <Divider />
      </View>
    );
  };
  return (
    <View style={KeepNotifiedWidgetStyle.container}>
      <FlatList
        listKey={flatListUniqueKey.KEEP_NOTIFIED_WIDGET}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const KeepNotifiedWidgetStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 0.05 * screenWidth,
  },
});

export default KeepNotifiedWidget;
