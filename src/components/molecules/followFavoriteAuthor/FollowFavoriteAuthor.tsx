import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'src/components/atoms';
import {Label} from 'src/components/atoms';
import {normalize, screenWidth} from 'src/shared/utils';
import {colors} from 'src/shared/styles/colors';
import {ImagesName} from 'src/shared/styles';

export interface FollowFavoriteAuthorProps {
  authorName: string;
  authorDescription: string;
  authorImage: string;
  isSelected: boolean;
  testId?: string;
  onPress: (isSelected: boolean) => void;
}

const FollowFavoriteAuthor = ({
  authorName,
  authorImage,
  authorDescription,
  isSelected,
  onPress,
  testId,
}: FollowFavoriteAuthorProps) => {
  const [isSelectedState, setIsSelectedState] = useState(isSelected);
  const changeStatus = () => {
    onPress(!isSelectedState);
    setIsSelectedState(!isSelectedState);
  };
  return (
    <View style={FollowFavoriteAuthorStyle.container}>
      <TouchableOpacity onPress={changeStatus} testID={testId}>
        <View style={FollowFavoriteAuthorStyle.imageContainer}>
          <View style={FollowFavoriteAuthorStyle.innerCircle}>
            <Image
              url={authorImage}
              style={[FollowFavoriteAuthorStyle.bookImage]}
            />
          </View>
          <View style={FollowFavoriteAuthorStyle.tickContainer}>
            <Image
              name={
                isSelectedState
                  ? ImagesName.authorItemActive
                  : ImagesName.authorItem
              }
              style={FollowFavoriteAuthorStyle.tickImage}
            />
          </View>
        </View>

        <View style={FollowFavoriteAuthorStyle.titleContainer}>
          <Label
            style={[
              FollowFavoriteAuthorStyle.titleStyle,
              {color: isSelectedState ? colors.black : colors.spanishGray},
            ]}
          >
            {authorName}
          </Label>
          <Label
            style={[
              FollowFavoriteAuthorStyle.descriptionStyle,
              {color: isSelectedState ? colors.davyGrey : colors.spanishGray},
            ]}
          >
            {authorDescription}
          </Label>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FollowFavoriteAuthorStyle = StyleSheet.create({
  bookImage: {
    height: '100%',
    width: '100%',
  },
  container: {
    width: 0.29 * screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(10),
  },
  imageContainer: {
    width: normalize(99),
    height: normalize(99),
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: normalize(99),
    width: normalize(99),
    borderRadius: normalize(99 / 2),
    overflow: 'hidden',
  },
  tickContainer: {
    position: 'absolute',
    bottom: normalize(-15),
  },
  tickImage: {
    width: normalize(22),
    height: normalize(22),
  },
  titleContainer: {
    width: normalize(99),
    marginTop: normalize(20),
  },
  titleStyle: {
    fontSize: normalize(14),
    lineHeight: normalize(19),
    textAlign: 'center',
  },
  descriptionStyle: {
    fontSize: normalize(10),
    lineHeight: normalize(14),
    textAlign: 'center',
  },
});

export default FollowFavoriteAuthor;
