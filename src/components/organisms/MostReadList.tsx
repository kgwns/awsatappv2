import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {flatListUniqueKey} from 'src/constants';
import {ArticleItem, ArticleWithOutImageProps} from 'src/components/molecules';
import {ImageLabelProps} from 'src/components/atoms/imageWithLabel/ImageWithLabel';
import {screenWidth} from 'src/shared/utils';
import {Label, LabelTypeProp} from 'src/components/atoms';
import {MOST_READ} from 'src/constants/SharedConstants';
import {Styles, ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {getImageUrl} from 'src/shared/utils/utilities';
import {timeAgo} from 'src/shared/utils/utilities';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'src/shared/styles/ThemeProvider';

export interface articleProps
  extends ImageLabelProps,
    ArticleWithOutImageProps {
  image?: string;
  body: string;
}

export interface ArticleSectionProps {
  data: any;
  onScroll?: () => void;
  isLoading?: boolean;
}

const MostReadList = ({
  data,
  onScroll,
  isLoading = false,
}: ArticleSectionProps) => {
  const [t] = useTranslation();
  const theme = useTheme();

  const renderItem = (item: any, index: number) => {
    const footerData = {
      leftTitle: item.author_resource,
      leftTitleColor: Styles.color.greenishBlue,
      rightTitle: t(timeAgo(item.created_export)),
      rightIcon: ImagesName.clock,
      rightTitleColor: Styles.color.silverChalice,
    };
    item.tagName = (index + 1).toString();
    item.tagStyle = {marginLeft: normalize(16)};
    item.tagLabelType = LabelTypeProp.p3;
    item.image = item.image ? item.image : getImageUrl(item.field_image);
    return (
      <View>
        <ArticleItem
          {...item}
          showDivider={false}
          index={index}
          contentStyle={mostReadListStyle.contentStyle}
          footerInfo={footerData}
        />
        {isLoading && (data.length - 1 == index) && (
          <View style={{margin: normalize(28)}}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };

  const listHeader = () => (
    <View style={{paddingLeft: normalize(20), paddingVertical: normalize(5)}}>
      <Label
        children={MOST_READ}
        labelType={LabelTypeProp.h2}
        color={Styles.color.greenishBlue}
      />
    </View>
  );

  return (
    <View style={mostReadListStyle.container}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.MOST_READ_LIST}
        ListHeaderComponent={listHeader}
        data={data.rows}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={onScroll ? onScroll : () => {}}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default MostReadList;

const mostReadListStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    paddingHorizontal: 0.04 * screenWidth,
  },
});
