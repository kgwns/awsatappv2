import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {
  horizontalEdge,
  normalize,
  screenHeight,
  screenWidth,
} from 'src/shared/utils';
import {BorderLabel, Divider, Label} from 'src/components/atoms';
import {ScreenContainer} from '..';
import {useTranslation} from 'react-i18next';
import {FollowFavoriteAuthor} from 'src/components/molecules';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {flatListUniqueKey} from 'src/constants';
import {AUTHOR_DESCRIPTION, AUTHOR_TITLE} from 'src/constants/SharedConstants';

export const interestData = [
  {
    label: 'ثقافة',
  },
  {
    label: 'سيارات',
  },
  {
    label: 'سينما',
  },
  {
    label: 'قضايا',
  },
  {
    label: 'سينما',
  },
  {
    label: 'إيران',
  },
  {
    label: 'الاقتصاد',
  },
  {
    label: 'حصاد الأسبوع',
  },
  {
    label: 'سينما',
  },
  {
    label: 'إيران',
  },
  {
    label: 'الاقتصاد',
  },
  {
    label: 'حصاد الأسبوع',
  },
  {
    label: 'ملفات الشرق',
  },
  {
    label: 'ملفات الشرق',
  },
  {
    label: 'إيران',
  },
  {
    label: 'ثقافة',
  },
  {
    label: 'سيارات',
  },
  {
    label: 'سينما',
  },
  {
    label: 'قضايا',
  },
  {
    label: 'سينما',
  },
  {
    label: 'إيران',
  },
  {
    label: 'الاقتصاد',
  },
  {
    label: 'حصاد الأسبوع',
  },
];

export const ManageMyNewsScreen = () => {
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();

  const renderItemBooks = () => (
    <FollowFavoriteAuthor
      authorName={AUTHOR_TITLE}
      authorDescription={AUTHOR_DESCRIPTION}
      authorImage={'https://picsum.photos/200/300'}
      isSelected={true}
      onPress={() => {}}
    />
  );

  const renderItemTopics = ({item}: any) => (
    <View style={style.renderItemTopics}>
      <BorderLabel label={item.label} onPress={() => {}} isSelected={true} />
    </View>
  );

  const ContinueLabel = ({label}: any) => (
    <TouchableWithoutFeedback style={style.continueLabelView}>
      {getSvgImages({
        name: ImagesName.plusSvg,
        size: normalize(9),
      })}
      <Label style={style.continueLabel}>{label}</Label>
    </TouchableWithoutFeedback>
  );

  const MyFavoriteBooks = () => (
    <View style={style.favBooksView}>
      <Label style={style.titleLabel}>
        {t('manageMyNews.myFavoriteBooks')}
      </Label>
      <FlatList
        horizontal
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={renderItemBooks}
        showsHorizontalScrollIndicator={false}
      />
      <View style={style.booksContinue}>
        <ContinueLabel label={t('manageMyNews.continueReadingMoreBooks')} />
      </View>
      <View style={style.booksDivider}>
        <Divider />
      </View>
    </View>
  );

  const MyFavoriteTopics = ({data}: any) => (
    <View>
      <Label style={style.titleLabel}>
        {t('manageMyNews.myFavoriteTopics')}
      </Label>
      <View style={style.favTopicsView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={style.favTopicsScrollView}>
          <FlatList
            listKey={flatListUniqueKey.INTEREST_SECTION}
            keyExtractor={(_, index) => index.toString()}
            numColumns={data ? Math.ceil(data.length / 3) : 3}
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={item => renderItemTopics(item)}
          />
        </ScrollView>
      </View>
      <View style={style.topicsContinue}>
        <ContinueLabel label={t('manageMyNews.followMoreTopics')} />
      </View>
    </View>
  );

  return (
    <ScreenContainer edge={horizontalEdge}>
      <View style={style.container}>
        <View style={style.favBooks}>
          <MyFavoriteBooks />
        </View>
        <View style={style.favTopics}>
          <MyFavoriteTopics data={interestData} />
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const ManageMyNewsScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
    },
    favBooks: {
      flex: 0.5,
      paddingTop: 0.01 * screenHeight,
    },
    favTopics: {
      flex: 0.5,
      paddingVertical: 0.02 * screenHeight,
    },
    favBooksView: {
      paddingTop: 0.05 * screenWidth,
    },
    favTopicsScrollView: {
      paddingVertical: 0.04 * screenWidth,
    },
    favTopicsView: {
      width: '100%',
      alignItems: 'flex-start',
    },
    titleLabel: {
      fontSize: normalize(18),
      lineHeight: normalize(42),
      color: theme.primary,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingHorizontal: 0.04 * screenWidth,
    },
    booksContinue: {
      paddingTop: 0.02 * screenWidth,
      paddingStart: 0.04 * screenWidth,
    },
    topicsContinue: {
      paddingStart: 0.04 * screenWidth,
    },
    booksDivider: {
      paddingTop: 0.05 * screenWidth,
    },
    continueLabelView: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      borderRadius: normalize(50 / 2),
      paddingHorizontal: 0.06 * screenWidth,
    },
    continueLabel: {
      fontSize: normalize(12),
      lineHeight: normalize(42),
      fontWeight: 'bold',
      color: theme.secondaryDavyGrey,
      marginStart: normalize(10),
    },
    renderItemTopics: {
      paddingBottom: 0.03 * screenWidth,
      paddingStart: 0.02 * screenWidth,
    },
  });
  return ManageMyNewsScreenStyle;
};
