import Share from 'react-native-share';
import { AlbumDetailType } from 'src/redux/photoGallery/types';
import { OpinionArticleDetailItemType } from 'src/redux/opinionArticleDetail/types';
import { getShareUrl } from './utilities';

export const onPressShare = async (data: AlbumDetailType | OpinionArticleDetailItemType) => {
  const { title, link_node, field_shorturl } = data;
  await Share.open({
    title,
    url: getShareUrl(field_shorturl, link_node),
    failOnCancel: true,
    subject: title,
  })
    .then(response => {
      console.log('Shared successfully :::', response);
    })
    .catch(error => {
      console.log('Cancelled share request :::', error);
    });
};
