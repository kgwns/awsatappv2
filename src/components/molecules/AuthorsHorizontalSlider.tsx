import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {isIOS, isTab, normalize, screenWidth} from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {Label, Image} from 'src/components/atoms';
import {fonts} from 'src/shared/styles/fonts';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {getImageUrl} from 'src/shared/utils/utilities';
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';
import {ImagesName} from 'src/shared/styles';

export interface AuthorsHorizontalSliderProps {
  authorsList: any[];
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
  const scrollToEnd = () => {
    if (isIOS) return;
    scrollRef.current?.scrollToEnd();
  };
  const onItemPress = (item: any, index: number) => {
    onPress && onPress(item, index);
  };
  const onAllPress = () => {
    onPress && onPress(null, -1);
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
        {showAll && (
          <TouchableWithoutFeedback onPress={onAllPress}>
            <View
              style={[
                styles.allContainerStyle,
                styles.borderStyle,
                selectedIndex == -1 && styles.containerbackgroundStyle,
              ]}>
              <Label
                children={'الكل'}
                style={[styles.labelStyle, styles.labelSpace]}
                color={
                  selectedIndex == -1
                    ? colors.white
                    : themeData.secondarySpanishGray
                }
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        {authorsList.map((item: any, index: number) => {
          const imageUrl = getImageUrl(item.field_opinion_writer_photo_export);
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
                  selectedIndex == index
                    ? styles.containerbackgroundStyle
                    : {borderColor: colors.transparent},
                ]}>
                <Image
                  url={imageUrl}
                  size={33}
                  resizeMode={'cover'}
                  type={'round'}
                  fallback={true}
                  fallbackContent={
                    <AuthorDefault
                      style={{backgroundColor: colors.cyanGreen}}
                      width={33}
                      height={33}
                    />
                  }
                  fallbackName={ImagesName.authorDefault}
                />
                <Label
                  children={item.name}
                  style={styles.labelStyle}
                  color={
                    selectedIndex == index
                      ? colors.white
                      : themeData.secondarySpanishGray
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
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
    labelSpace: {
      paddingHorizontal: 15,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 20,
    },
    allContainerStyle: {
      marginLeft: (isTab ? 0.02 : 0.04) * screenWidth,
      flexDirection: 'row',
      alignItems: 'center',
      height: 33,
    },
    containerbackgroundStyle: {
      backgroundColor: colors.black,
    },
  });