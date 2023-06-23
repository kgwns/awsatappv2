import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {isIOS, isTab, normalize, normalizeBy320, screenWidth,} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Image, Label} from 'src/components/atoms';
import {fonts} from 'src/shared/styles/fonts';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {getImageUrl} from 'src/shared/utils/utilities';
import {ImagesName, Styles} from 'src/shared/styles';
import {
  TranslateConstants,
  TranslateKey,
} from 'src/constants/Constants';

export interface AuthorsItemType {
  name: string;
  field_opinion_writer_photo_export: string;
  tid: string | number;
}

export interface AuthorsHorizontalSliderProps {
  authorsList: AuthorsItemType[];
  onPress?: (item: any, index: number) => void;
  style?: StyleProp<any>;
  showAll?: boolean;
  selectedIndex?: number;
}

export const AuthorsHorizontalSlider = ({
  authorsList,
  onPress,
  style,
  showAll = true,
  selectedIndex,
}: AuthorsHorizontalSliderProps) => {
  const {themeData} = useTheme();

  const styles = useThemeAwareObject(customStyle);
  
  const scrollRef = useRef<ScrollView>(null);
  const allTitle = TranslateConstants({key: TranslateKey.TAB_ALL_TITLE});

  const scrollToEnd = () => {
    if (isIOS) {
      return;
    }
    scrollRef.current?.scrollToEnd();
  };

  const onItemPress = (item: any, index: number) => {
    onPress && onPress(item, index);
  };

  const onAllPress = () => {
    onPress && onPress(null, -1);
  };
  const renderShowAll = () => (
    <View style={styles.showAllContainer}>
      <TouchableOpacity onPress={onAllPress}
        testID='onAllPress'
        style={[
          styles.filterItem,
          selectedIndex === -1 && styles.filterActive,
        ]}>
        <Label
          children={allTitle}
          style={styles.label}
          color={
            selectedIndex === -1
              ? colors.white
              : Styles.color.grayishGreen
          }
        />
      </TouchableOpacity>
    </View>
);

  const renderAuthorsList = () => {
    return authorsList.map((item: AuthorsItemType, index: number) => {
      const imageUrl = getImageUrl(item.field_opinion_writer_photo_export);
      const isLast = index === authorsList.length-1;
      return (
        <TouchableWithoutFeedback
          key={index}
          testID={`MyNewsAuthor_${index}`}
          accessibilityLabel={`MyNewsAuthor_${index}`}
          onPress={() => onItemPress(item, index)}>
          <View
            style={[
              styles.allContainerStyle,
              styles.borderStyle,
              isLast && styles.spaceEndStyle,
              selectedIndex === index
                ? styles.containerbackgroundStyle
                : {borderColor: colors.transparent},
            ]}>
            <Image
              url={imageUrl}
              fallbackName={ImagesName.authorDefaultName}
              style={styles.authorImageStyle}
              resizeMode={'cover'}
            />
            <Label
              children={item.name}
              style={styles.labelStyle}
              color={
                selectedIndex === index
                  ? colors.white
                  : themeData.secondarySpanishGray
              }
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        bounces={false}
        style={style}
        contentContainerStyle={styles.contentStyle}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        onContentSizeChange={() => scrollToEnd()}>
        {showAll && renderShowAll()}
        {renderAuthorsList()}
      </ScrollView>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      width: screenWidth,
      marginTop: normalize(10),
      paddingVertical: isTab ? 20 : 10,
    },
    contentStyle: {
      flexGrow: 1,
      paddingLeft: isTab ? 0.03 * screenWidth : 0,
    },
    tabBarBottomView: {
      width: '100%',
      height: 1.2,
      backgroundColor: theme.dividerColor,
      position: 'absolute',
      bottom: 0,
    },
    labelStyle: {
      fontFamily: fonts.Effra_Regular,
      fontSize: 12,
      lineHeight: 27,
      paddingHorizontal: 7,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 20,
    },
    allContainerStyle: {
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      height: 33,
    },
    containerbackgroundStyle: {
      backgroundColor: theme.filterBackgroundColor,
      borderColor: theme.filterBorderColor,
    },
    spaceEndStyle: {
      marginEnd: (isTab ? 0.02 : 0.04) * screenWidth,
    },
    filterItem: {
      marginRight: normalizeBy320(5),
      borderWidth: 1,
      borderColor: Styles.color.cyanGray,
      paddingLeft: normalize(15),
      paddingRight: normalize(15),
      paddingTop: normalize(7),
      paddingBottom: isIOS ? normalize(4) : normalize(7),
      borderRadius: normalize(20)
    },
    filterActive: {
      backgroundColor: theme.filterBackgroundColor,
      borderColor: theme.filterBorderColor,
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: fonts.AwsatDigital_Regular,
    },
    showAllContainer: {
      paddingLeft: normalize(10)
    },
    authorImageStyle: {
      height:33,
      width:33,
      borderRadius: 33/2
    }
  });
