import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { normalize, screenWidth } from 'src/shared/utils'
import { Label } from 'src/components/atoms'
import { ArticleDetailImage } from 'src/components/molecules'
import { Styles } from 'src/shared/styles'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

const sampleArticleDetailData = {
    articleBase: 'حقوق مليكة الصوره توضع هنا'
}

interface ArticleDetailImageProps {
   image: string,
   title: string,
   category: string
}

const ArticleDetailWidget: FunctionComponent<ArticleDetailImageProps> = ({
    image,
    title,
    category
}) => {
    const style = useThemeAwareObject(customStyle)
    return (
        <View>
            <ArticleDetailImage image={image} title={title}
                category={category}
            />
            <Label
                children={sampleArticleDetailData.articleBase}
                style={style.articleBaseStyle}
            />
        </View>
    )
}

export default ArticleDetailWidget

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        headNewsContainer: {
            paddingHorizontal: 0.04 * screenWidth,
            paddingVertical: normalize(10)
        },
        imageStyle: {
            height: 1.05 * screenWidth
        },
        tabletImageStyle: {
            height: 0.5 * screenWidth
        },
        articleBaseStyle: {
            width: screenWidth,
            backgroundColor: theme.primaryLightGray,
            color: Styles.color.whiteSmoke,
            paddingHorizontal: normalize(25),
            paddingVertical: normalize(5),
            textAlign: 'left'
        }
    })
}
