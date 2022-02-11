import React from 'react'
import { View, StyleSheet } from 'react-native'
import { normalize, screenWidth } from 'src/shared/utils'
import { Image } from 'src/components/atoms'
import { Label, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles';
import { DetailPodCastFooter } from 'src/components/molecules'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useTheme } from 'src/shared/styles/ThemeProvider';


const podCastData =
{
    image: 'https://picsum.photos/200/300',
    title: 'استمع لملخص آخر أخبار اليوم',
    body: 'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين.وافتتح السويدي روبن كوايسون التسجيل لفريقه الاتفاق قبل نهاية الشوط الأول بلحظات قليلة، قبل أن ينجح فارس الدهناء في تعزيز تقدمه بهدفين حضرا في الدقائق الأخيرة من عمر المواجهة التي أقيمت على ملعب نادي الحزم بمدينة الرس، حيث حمل الهدفان توقيع الثنائي وليد أزارو وفيليب كيتش.',
    podCastHeader: 'استمع الي البودكاست ',
    allEpisodes: 'كل الحلقات',
    tagName: 'الحكومة',
    timeDuration: '3:22',
    rightTitle: 'كل الحلقات'

}

const ArticlePodCastWidget = () => {
    const style = useThemeAwareObject(customStyle)
    const { themeData } = useTheme()
    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ paddingRight: normalize(20) }}>
                    <Label labelType={LabelTypeProp.h1} children={podCastData.title} color={themeData.primary} style={style.titleContainer} />
                    <Label labelType={LabelTypeProp.h3} children={podCastData.body} color={themeData.secondaryDavyGrey} style={style.bodyContainer} numberOfLines={2} />
                </View>
                <Image style={style.imageContainer} url={podCastData.image} resizeMode={ImageResize.COVER} />
            </View>
            <DetailPodCastFooter leftTitle={podCastData.podCastHeader}
                leftTitleColor={themeData.primary}
                leftTimeLabel={podCastData.timeDuration}
                leftTimeLabelColor={Styles.color.spanishGray}
                rightTitle={podCastData.rightTitle}
                rightIconColor={themeData.primaryBlack}
                leftIconColor={themeData.primary}
                rightTitleColor={themeData.primaryBlack}
            />
        </View>
    )
}

export default ArticlePodCastWidget
const customStyle = (theme: CustomThemeType) => {
    const detailPodCastStyle = StyleSheet.create({
        container: {
            backgroundColor: theme.secondaryGreen,
            height: normalize(140),
            width: screenWidth,
            paddingHorizontal: normalize(10),
            paddingVertical: normalize(10)
        },
        imageContainer: {
            width: normalize(92),
            height: normalize(73),
            top: normalize(8)
        },
        titleContainer: {
            paddingHorizontal: normalize(10),
            fontSize: normalize(15),
            width: normalize(240)
        },
        bodyContainer: {
            paddingHorizontal: normalize(10),
            fontSize: normalize(13),
            width: normalize(240)
        }
    })
    return detailPodCastStyle
}
