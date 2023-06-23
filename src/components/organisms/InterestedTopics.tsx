import { View, StyleSheet, ScrollView, FlatList, Platform, ListRenderItem } from 'react-native';
import React from 'react';
import { BorderLabel } from 'src/components/atoms/BorderLabel/BorderLabel';
import { isAndroid, isTab, normalize, screenWidth } from 'src/shared/utils';
import { flatListUniqueKey } from 'src/constants/Constants';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { decode } from 'html-entities';

const InterestedTopics = (props:any) => {
  const data = props.allSiteCategoriesData 
  const style = useThemeAwareObject(customInterestStyle)
  let totalLengthOfElements = 0
  const arrayOfLengths = []
  const splicedArray = []
  let individualSpliceArray: any[] = []
  let lengthOfElementsInRow = 0
  let previousIndex = 0
  const dataLength = data ? data.length : []
  for (let i = 0; i < dataLength; i++) {
    totalLengthOfElements = totalLengthOfElements + data[i].name.length + 10
    arrayOfLengths.push(data[i].name.length + 10)
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
    } else if (lengthOfElementsInRow - (totalLengthOfElements / 9) > 50) {
      for (let j = previousIndex; j < i; j++) {
        individualSpliceArray.push(data[j])
      }
      splicedArray.push(individualSpliceArray)
      previousIndex = i + 1
      individualSpliceArray = []
      previousIndex = i
      lengthOfElementsInRow = 0
    } else if (i === arrayOfLengths.length - 1) {
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

  const renderItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <View key={flatListUniqueKey.INTERESTED_TOPICS + index}>
        <View style={style.interestedTopicsContainer} >
          <BorderLabel label={decode(item.name)}
            isSelected={item.isSelected}
            onPress={selected => props.onTopicsChanged(item, selected)}
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
          keyExtractor={(_, mobIndex) => mobIndex.toString()}
          listKey={flatListUniqueKey.INTERESTED_TOPICS + new Date().getTime().toString()}
          data={ isAndroid ? item.reverse() : item}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    )
  }

  return (
    isTab ? 
    <View style={style.tabContainer} >
        <FlatList
          scrollEnabled={false}
          numColumns={6}
          keyExtractor={(_, tabIndex) => tabIndex.toString()}
          listKey={flatListUniqueKey.INTERESTED_TOPICS + new Date().getTime().toString()}
          data={props.allSiteCategoriesData }
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          columnWrapperStyle={style.topicsStyle}
        />
      </View>
      :
    <ScrollView contentContainerStyle={style.containerStyle} style={style.container} horizontal={true} showsHorizontalScrollIndicator={false} 
      bounces={true}>
      <ScrollView style={style.innerContainerStyle} horizontal={false} scrollEnabled={false}>
        {splicedArray.map((items, index) => renderer(items, index))}
      </ScrollView>
    </ScrollView>

  );
};

export default InterestedTopics;
const customInterestStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.onBoardBackground,
      alignSelf: 'center',
    },
    containerStyle: {
      flexGrow: 1, 
      justifyContent: 'center'
    },
    tabContainer: {
      alignItems: 'flex-start',
      backgroundColor: theme.onBoardBackground,
      alignSelf: 'center',
      flexDirection:'row',
      flex: 1, 
      flexWrap: 'wrap'
    },
    interestedTopicsContainer: {
      marginVertical: normalize(7),
      marginLeft: normalize(10),
      alignSelf: 'flex-start',
    },
    rowContainer: {
      width: '100%',
      alignSelf: 'flex-end',
      marginEnd: normalize(7),
      marginStart: 0.04 * screenWidth,
    },
    innerContainerStyle: {
      marginLeft: normalize(15)
    },
    topicsStyle: {
      flexWrap: 'wrap', 
    }
})

