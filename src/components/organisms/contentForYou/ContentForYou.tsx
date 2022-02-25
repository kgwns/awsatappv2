import { View, FlatList } from 'react-native'
import React from 'react'
import { AuthorWidget, PodcastForYou, ShortArticle, PodcastForYouListType } from 'src/components/organisms';
import { LatestOpinionDataType } from 'src/redux/latestNews/types'
import { shortArticleWithTagData, shortArticleWithTagProperties, videoArchiveData } from 'src/constants/SampleData';
import { DUMMY_IMAGE_URL } from 'src/services/apiUrls';
import { useTranslation } from 'react-i18next';
import { ShortArticleProps } from '../ShortArticle';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { FavoriteVideo } from '../favoriteVideo/favoriteVideo';
import { isTab, screenWidth } from 'src/shared/utils';

const authorData: LatestOpinionDataType = {
    title: "دبلوماسية العزلة والعداوات",
    field_opinion_writer_node_export: {
        bundle: "writer",
        id: "92602",
        langcode: "Arabic",
        name: "سمير عطا الله",
        opinion_writer_photo: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/styles/304x292/public/2018/01/04/samir-Attallah-04012018.jpg?itok=oX9jg4DL",
        title: "سمير عطا الله",
        url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/92602"
    },
    nid: "2982216",
    body: "<p>تنظم العلاقات بين الدول مج ا.</p>\n",
}

const podcastForYouData: PodcastForYouListType = {
    image: DUMMY_IMAGE_URL,
    name: 'إسم البودكاست',
    title: 'عنوان حلثه البودكاست',
    author: 'الخميس',
    created: '45 دقيقه'
}

export const ContentForYou = () => {
    const { themeData } = useTheme()
    const [t] = useTranslation()

    const podcastForYouTitle = t('favorite.podcast_for_you')

    const shortArticleInfo = shortArticleWithTagData.map((item: ShortArticleProps) => (
        {
          ...item,
          ...shortArticleWithTagProperties,
          titleColor: themeData.primaryBlack
        }
      ))

      const numberOfAuthorItem = isTab ? 4 : 3
    const renderContentForYou = () => (
        <View style={{ flex: 1 }}>
            <PodcastForYou title={podcastForYouTitle} data={Array(5).fill(podcastForYouData)} />
            <AuthorWidget data={Array(numberOfAuthorItem).fill(authorData)} />
            <View style={{paddingHorizontal: 0.04 * screenWidth}}>
                <FavoriteVideo data={videoArchiveData} />
            </View>
            <ShortArticle data={shortArticleInfo} onPress={() => { }} />
        </View>
    )


    return (
        <View style={{ flex: 1, height: '100%' }}>
            <FlatList
                style={{ flex: 1, height: '100%' }}
                data={[{}]}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderContentForYou}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}