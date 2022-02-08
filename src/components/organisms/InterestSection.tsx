import { View, StyleSheet, ScrollView, FlatList, Platform } from 'react-native';
import React from 'react';
import { BorderLabel } from '../atoms/BorderLabel/BorderLabel';
import { normalize, screenWidth } from 'src/shared/utils';
import { flatListUniqueKey } from 'src/constants';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
// import { platform } from 'os';


const data = [
  {
    key: 'الرياضة',
    id: 0,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 1,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 2,
    selected: false
  },
  {
    key: 'الرأي',
    id: 3,
    selected: false
  },
  {
    key: 'إيران',
    id: 4,
    selected: false
  },
  {
    key: 'الوتر السادس',
    id: 5,
    selected: false
  },
  {
    key: 'العالم',
    id: 6,
    selected: false
  },
  {
    key: 'العالم العربي',
    id: 7,
    selected: false
  },
  {
    key: 'أولى',
    id: 8,
    selected: false
  },

  {
    key: 'تحقيق',
    id: 9,
    selected: false
  },
  {
    key: 'لمسات',
    id: 10,
    selected: false
  },
  {
    key: 'مذاقات',
    id: 11,
    selected: false
  },
  {
    key: 'قضايا',
    id: 12,
    selected: false
  },
  {
    key: 'سينما',
    id: 13,
    selected: false
  },
  {
    key: 'سيارات',
    id: 14,
    selected: false
  },
  {
    key: 'ثقافة',
    id: 15,
    selected: false
  },
  {
    key: 'مذاقات',
    id: 16,
    selected: false
  },
  {
    key: 'قضايا',
    id: 17,
    selected: false
  },
  {
    key: 'سينما',
    id: 18,
    selected: false
  },
  {
    key: 'سيارات',
    id: 19,
    selected: false
  },
  {
    key: 'ثقافة',
    id: 20,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 21,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 22,
    selected: false
  },
  {
    key: 'الرأي',
    id: 23,
    selected: false
  },
  {
    key: 'إيران',
    id: 24,
    selected: false
  },
  {
    key: 'الوتر السادس',
    id: 25,
    selected: false
  },
  {
    key: 'العالم',
    id: 26,
    selected: false
  },
  {
    key: 'العالم العربي',
    id: 27,
    selected: false
  },
  {
    key: 'أولى',
    id: 28,
    selected: false
  },

  {
    key: 'تحقيق',
    id: 29,
    selected: false
  },
  {
    key: 'أولى',
    id: 30,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 31,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 32,
    selected: false
  },
  {
    key: 'الرأي',
    id: 33,
    selected: false
  },
  {
    key: 'إيران',
    id: 34,
    selected: false
  },
  {
    key: 'الوتر السادس',
    id: 35,
    selected: false
  },
  {
    key: 'العالم',
    id: 36,
    selected: false
  },
  {
    key: 'العالم العربي',
    id: 37,
    selected: false
  },
  {
    key: 'أولى',
    id: 38,
    selected: false
  },

  {
    key: 'تحقيق',
    id: 39,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 40,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 41,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 42,
    selected: false
  },
  {
    key: 'الرأي',
    id: 43,
    selected: false
  },
  {
    key: 'إيران',
    id: 44,
    selected: false
  },
  {
    key: 'الوتر السادس',
    id: 45,
    selected: false
  },
  {
    key: 'العالم',
    id: 46,
    selected: false
  },
  {
    key: 'العالم العربي',
    id: 47,
    selected: false
  },
  {
    key: 'أولى',
    id: 48,
    selected: false
  },

  {
    key: 'تحقيق',
    id: 49,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 50,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 51,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 52,
    selected: false
  },
  {
    key: 'الرأي',
    id: 53,
    selected: false
  },
  {
    key: 'إيران',
    id: 54,
    selected: false
  },
  {
    key: 'الوتر السادس',
    id: 55,
    selected: false
  },
  {
    key: 'العالم',
    id: 56,
    selected: false
  },
  {
    key: 'العالم العربي',
    id: 57,
    selected: false
  },
  {
    key: 'أولى',
    id: 58,
    selected: false
  },

  {
    key: 'تحقيق',
    id: 59,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 60,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 61,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 62,
    selected: false
  },
  {
    key: 'الرأي',
    id: 63,
    selected: false
  },
  {
    key: 'إيران',
    id: 64,
    selected: false
  },
  {
    key: 'الوتر السادس',
    id: 65,
    selected: false
  },
  {
    key: 'العالم',
    id: 66,
    selected: false
  },
  {
    key: 'العالم العربي',
    id: 67,
    selected: false
  },
  {
    key: 'أولى',
    id: 68,
    selected: false
  },

  {
    key: 'تحقيق',
    id: 69,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 70,
    selected: false
  },
  {
    key: 'الرياضة',
    id: 71,
    selected: false
  },
  {
    key: 'الاقتصاد',
    id: 72,
    selected: false
  },
  {
    key: 'الرأي',
    id: 73,
    selected: false
  },

]

const InterestSection = () => {
  const style = useThemeAwareObject(customInterestStyle)
  let totalLengthOfElements = 0
  let arrayOfLengths = []
  let splicedArray = []
  let individualSpliceArray: any[] = []
  let lengthOfElementsInRow = 0
  let previousIndex = 0
  for (let i = 0; i < data.length; i++) {
    totalLengthOfElements = totalLengthOfElements + data[i].key.length + 50
    arrayOfLengths.push(data[i].key.length + 50)
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
      if (item.id == data[i].id) {
        data[i].selected = isSelected
      }
    }
  }
  const renderItem = (item: string, index: number) => {
    return (
      <View key={flatListUniqueKey.INTEREST_SECTION + index}>
        <View style={style.interestContainer} >
          <BorderLabel label={item}
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
          inverted={Platform.OS==='ios'? false : true}
          scrollEnabled={false}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          listKey={flatListUniqueKey.INTEREST_SECTION + new Date().getTime().toString()}
          data={item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => renderItem(item.key, index)}
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
