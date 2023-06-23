import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {FunctionComponent} from 'react';
import {flatListUniqueKey} from 'src/constants/Constants';
import {ImageWithLabel} from 'src/components/atoms';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import {dateTimeAgo, isTab, screenWidth} from 'src/shared/utils';
import ArticleWithOutImage from 'src/components/molecules/ArticleWithOutImage';
import {fonts} from 'src/shared/styles/fonts';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {getImageUrl, TimeIcon} from 'src/shared/utils/utilities';
import {AlbumListItemType} from 'src/redux/photoGallery/types';
import {useLogin} from 'src/hooks';

export interface PhotoGalleryItemProps {
  index?: number;
  onPress?: (nid: string) => void;
  onUpdateBookmark?: (nid: string, isBookmarked: boolean) => void;
  item: AlbumListItemType;
  title: string;
  imageUrl: string;
  nid: string;
  created: Date;
  isBookmarked: boolean;
  showDivider?: boolean;
  isFavouriteTab?: boolean;
  bookMarkColorType?: string;
  addBodyContentStyle?: StyleProp<ViewStyle>;
}

export const PhotoGalleryItem: FunctionComponent<PhotoGalleryItemProps> = ({
  onPress,
  index,
  onUpdateBookmark,
  item,
  title,
  nid,
  created,
  imageUrl,
  isBookmarked,
  showDivider = false,
  isFavouriteTab = false,
  bookMarkColorType,
  addBodyContentStyle,
  ...props
}) => {
  const {isLoggedIn} = useLogin();
  const style = useThemeAwareObject(styles);
  const timeFormat = dateTimeAgo(created);

  const image = imageUrl ? getImageUrl(imageUrl) : undefined;
  const footerData = {
    rightTitle: timeFormat.time,
    rightTitleStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      lineHeight: 40,
      fontSize: 12,
    },
    rightIcon: () => TimeIcon(timeFormat.icon),
    rightTitleColor: style.footerTitleColor.color,
    bookMarkColorType,
  };

  const onPressBookmark = () => {
    const bookmarkStatus = !isBookmarked ?? true;
    onUpdateBookmark && onUpdateBookmark(nid, bookmarkStatus);
  };

  const checkAndUpdateBookmark = () => {
    if (isFavouriteTab) {
      onUpdateBookmark && onUpdateBookmark(nid, isBookmarked);
    } else {
      isLoggedIn
        ? onPressBookmark()
        : onUpdateBookmark && onUpdateBookmark('', false);
    }
  };

  const onItemPress = () => {
    onPress && onPress(nid);
  };

  return (
    <FixedTouchable onPress={onItemPress} style={style.mainContainer}>
      <View
        key={flatListUniqueKey.PHOTO_GALLERY_LIST + index}
        style={style.container}>
        <ImageWithLabel
          url={image}
          {...props}
          onPressImage={onItemPress}
          imageStyle={style.imageStyle}
          isAlbum
        />
        <View
          style={[
            style.contentContainer,
            !showDivider && style.containerStyle,
            addBodyContentStyle,
          ]}>
          <ArticleWithOutImage
            isBookmarked={isBookmarked}
            title={title}
            showFooterTitle={true}
            titleStyle={style.titleStyle}
            titleContainerStyle={style.titleContainerStyle}
            {...props}
            footerInfo={footerData}
            onPress={onItemPress}
            showDivider={showDivider}
            onPressBookmark={() => checkAndUpdateBookmark()}
          />
        </View>
      </View>
    </FixedTouchable>
  );
};

const styles = (theme: CustomThemeType) =>
  StyleSheet.create({
    contentContainer: {
      paddingTop: isTab ? 15 : 5,
    },
    containerStyle: {
      paddingHorizontal: isTab ? 0.02 * screenWidth : 0.04 * screenWidth,
    },
    container: {
      paddingBottom: 25,
      flex: 1,
      overflow: 'hidden',
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: isTab ? 20 : 16,
      lineHeight: isTab ? 32 : 28,
      textAlign: 'left',
      paddingVertical: 8,
      color: theme.primaryBlack,
    },
    titleContainerStyle: {
      marginTop: 10,
    },
    imageStyle: {
      width: '100%',
      height: 'auto',
      aspectRatio: 1.34,
    },
    footerTitleColor: {
      color: theme.footerTextColor
    },
    mainContainer: {
      flex: 1
    }
  });
