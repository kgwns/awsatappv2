import { View, StyleSheet, ScrollView, FlatList, Platform } from 'react-native';
import React from 'react';
import { BorderLabel } from '../atoms/BorderLabel/BorderLabel';
import { normalize, screenWidth } from 'src/shared/utils';
import { flatListUniqueKey } from 'src/constants';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { decode } from 'html-entities';

const InterestSection = (props:any) => {
  const data = props.allSiteCategoriesData
  const style = useThemeAwareObject(customInterestStyle)
  let totalLengthOfElements = 0
  let arrayOfLengths = []
  let splicedArray = []
  let individualSpliceArray: any[] = []
  let lengthOfElementsInRow = 0
  let previousIndex = 0
  let dataLength = data ? data.length : []
  for (let i = 0; i < dataLength; i++) {
    totalLengthOfElements = totalLengthOfElements + data[i].name.length + 50
    arrayOfLengths.push(data[i].name.length + 50)
  }
  for (let i = 0; i < arrayOfLengths.length; i++) {
    lengthOfElementsInRow = lengthOfElementsInRow + arrayOfLengths[i]
    if ((lengthOfElementsInRow >= (totalLengthOfElements / 9)) && (lengthOfElementsInRow - (totalLengthOfElements / 9) <= 50)) {
      for (let j = previousIndex; j <= i; j++) {
        individualSpliceArray.push(data[j])
      }
      splicedArray.push(individualSpliceArray)
      previousIndex = i + 1
      individualSpliceArray = []
      lengthOfElementsInRow = 0
    }
    else if (lengthOfElementsInRow - (totalLengthOfElements / 9) > 50) {
      for (let j = previousIndex; j < i; j++) {
        individualSpliceArray.push(data[j])
      }
      splicedArray.push(individualSpliceArray)
      previousIndex = i + 1
      individualSpliceArray = []
      previousIndex = i
      lengthOfElementsInRow = 0
    }
    else if (i == arrayOfLengths.length - 1) {
      for (let j = previousIndex; j <= i; j++) {
        individualSpliceArray.push(data[j])
      }
      splicedArray.push(individualSpliceArray)
      previousIndex = i + 1
      individualSpliceArray = []
      previousIndex = i + 1
      lengthOfElementsInRow = 0
    }
  }

  const isSetSelected = (item: any, isSelected: boolean) => {
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        data[i].selected = isSelected
      }
    }
  }
  const renderItem = (item: string, index: number) => {
    return (
      <View key={flatListUniqueKey.INTEREST_SECTION + index}>
        <View style={style.interestContainer} >
          <BorderLabel label={decode(item)}
            onPress={(isSelected) => { isSetSelected(item, isSelected) }}
          />
        </View>
      </View>
    )
  }
  const renderer = (item: any, index: number) => {
    return (
      <View style={style.rowContainer} key={index}>
        <FlatList
          inverted={Platform.OS==='android'}
          scrollEnabled={false}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          listKey={flatListUniqueKey.INTEREST_SECTION + new Date().getTime().toString()}
          data={item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => renderItem(item.name, index)}
        />
      </View>
    )
  }
  return (
    <ScrollView style={style.container} horizontal={true} showsHorizontalScrollIndicator={false}>
      <ScrollView style={style.container} horizontal={false} scrollEnabled={false}>
        {splicedArray.map((items, index) => renderer(items, index))}
      </ScrollView>
    </ScrollView>

  );
};;

export default InterestSection;
const customInterestStyle = (theme: CustomThemeType) => {
  const interestSectionStyle = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.backgroundColor,
      alignSelf: 'flex-end',
    },
    interestContainer: {
      marginVertical: normalize(7),
      marginLeft: normalize(10),
      alignSelf: 'flex-start',
    },
    rowContainer: {
      width: '100%',
      alignSelf: 'flex-end',
      marginEnd: normalize(5),
      marginStart: 0.04 * screenWidth,

    },
  })
  return interestSectionStyle
}
