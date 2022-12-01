import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import React from 'react'
import { Image, Label, LabelTypeProp } from 'src/components/atoms'
import { useTranslation } from 'react-i18next'
import { CustomThemeType } from 'src/shared/styles/colors'
import { normalize, screenWidth } from 'src/shared/utils'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ImageResize } from 'src/shared/styles/text-styles'
import { Styles } from 'src/shared/styles'
import { ArticleFooter } from 'src/components/molecules'

export interface PodcastForYouListType {
    name: string
    image: string
    title: string,
    created: string
    author: string
}

interface PodcastForYouProps {
    title: string,
    data: PodcastForYouListType[]
}

export const PodcastForYou = ({
    title,
    data
}: PodcastForYouProps) => {
    const [t] = useTranslation()

    const style = useThemeAwareObject(customStyle)
    const renderItem: ListRenderItem<PodcastForYouListType> = ({ item, index }) => {
        return (
            <View style={style.podcastItem}>
                <Image url={item.image} style={style.image} resizeMode={ImageResize.COVER} />
                <Label labelType={LabelTypeProp.p3}
                    children={item.name}
                    color={Styles.color.greenishBlue}
                    numberOfLines={3} />
                <Label labelType={LabelTypeProp.h3}
                    children={item.title}
                    numberOfLines={3} />
                <ArticleFooter
                    leftTitle={item.author} leftTitleColor={style.footerTitleColor.color}
                    rightTitle={item.created} rightTitleColor={style.footerTitleColor.color}
                    hideBookmark={true}
                />
            </View>
        )
    }

    return (
        <View style={style.container}>
            <Label children={t(title)} labelType={LabelTypeProp.h2} color={Styles.color.greenishBlue} />
            <FlatList
                style={style.containerStyle}
                keyExtractor={(_, index) => index.toString()}
                data={data}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                bounces={false}
            />
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        container: {
            flex: 1,
            marginLeft: 0.04 * screenWidth
        },
        podcastItem: {
            marginRight: normalize(20),
            marginBottom: normalize(30)
        },
        image: {
            width: normalize(162),
            height: normalize(97)
        },
        footerTitleColor: {
            color: theme.footerTextColor
        },
        containerStyle: {
            flex: 1 
        }
    })
)
