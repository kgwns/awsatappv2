import React, {useState, FunctionComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Styles } from 'src/shared/styles';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label';
import { ButtonOutline } from 'src/components/atoms/button-outline/ButtonOutline';
import { Image } from 'src/components/atoms/image/Image';
import { normalize, recordLogEvent } from 'src/shared/utils';
import { StoryContainer } from 'react-native-stories-view';
import CloseIcon from 'src/assets/images/icons/close.svg';
import {useNavigation} from '@react-navigation/native';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export interface StoryListItemProps {
  id?: string;
  imageUrl: string;
  thumbNail: string;
  title?: string;
  description?: string;
  buttonTitle: string;
}

export interface StoryListProps {
  id: string;
  data: StoryListItemProps[];
}

export interface StoryListDataProps {
  data: StoryListProps[];
  selectedIndex: number;
}

export const StoryListView: FunctionComponent<StoryListDataProps> = ({
  data,
  selectedIndex,
}) => {
  const navigation = useNavigation()
  const [selectedItemIndex, setSelectedItemIndex] = useState(selectedIndex);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const headerComponent = (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          testID='story_header'
          accessibilityLabel='story_header'
          onPress={() => navigation.goBack()}>
          <CloseIcon fill={Styles.color.white} />
        </TouchableOpacity>
      </View>
  )

  const onStoryPress = () => {
    recordLogEvent(AnalyticsEvents.PRESSED_ON_READ_STORY, {storyId: data[selectedItemIndex].data[selectedImageIndex].id});
  }

  const footerComponent = (
    <View style={styles.backgroundTransparent}>
        <View style={styles.footerContainer} />
        <View style={styles.foorterTitleStyle}>
          <Image url={data[selectedItemIndex].data[selectedImageIndex].thumbNail} type={'round'} size={normalize(40)} />
          <Label labelType={LabelTypeProp.caption3} children={data[selectedItemIndex].data[selectedImageIndex].title} color={Styles.color.white} style={styles.labelStyle}  />
        </View>
        <View style={styles.paddingStyle}>
          <Label labelType={LabelTypeProp.h1} numberOfLines={2} children={data[selectedItemIndex].data[selectedImageIndex].description} color={Styles.color.white} />
        </View>
        <ButtonOutline title={data[selectedItemIndex].data[selectedImageIndex].buttonTitle} style={styles.buttonStyle} titleType={LabelTypeProp.h1} onPress={onStoryPress} />
    </View>
  )

  const onComplete=()=>{
    navigation.goBack();
  }

  return (
    <View style={styles.containerStyle}>
      {data.map((item:StoryListProps,index:number)=>{
        const imagesList = item.data.map((list:StoryListItemProps)=>{
          return list.imageUrl
        })
        if(selectedItemIndex!==index) {
          return null;
        }
        return (
          <View key={`story_${index}`}>
            <StoryContainer
              visible={true}
              enableProgress={true}
              images={imagesList}
              duration={20}
              onChange={(changeIndex: number)=>setSelectedImageIndex(changeIndex)}
              onComplete={onComplete}
              headerComponent={headerComponent}
              footerComponent={footerComponent}
              containerStyle={styles.storyContainer}
            />
          </View>
        )
      })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex : 1,
    backgroundColor: Styles.color.black,
  },
  storyContainer: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    marginTop: normalize(40),
    height: normalize(55),
    justifyContent: 'center',
    padding: normalize(25),
    zIndex:11,
    flex:1,
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    opacity: 0.4,
    backgroundColor: Styles.color.black,
    height: '120%',
    flexWrap: 'wrap',
  },
  paddingStyle: {
    paddingVertical: normalize(25),
  },
  foorterTitleStyle: {
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor:Styles.color.white,
    borderWidth: 0
  },
  backgroundTransparent: {
    padding: normalize(25),
  },
  labelStyle: {
    marginLeft: normalize(10)
  },
});
