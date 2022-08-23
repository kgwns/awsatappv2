import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize, screenWidth } from 'src/shared/utils'
import { Label, LabelTypeProp, ButtonImage, Image } from 'src/components/atoms'
import { ImageResize } from 'src/shared/styles/text-styles';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { ImagesName, Styles } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'


const archivesPodCastData =
{
    image: 'https://picsum.photos/200/300',
    title: 'استمع لملخص آخر أخبار اليوم',
    body: 'استعاد فريق الاتفاق نغمة انتصاراته وحقق فوزاً ثميناً خارج أرضه أمام نظيره فريق الحزم بثلاثة أهداف دون رد ضمن منافسات الجولة الثانية عشرة من الدوري السعودي للمحترفين.',
    allEpisodes: 'استمع الي البودكاست ',
    timeDuration: '3:22'
}

export const ArchivesPodcast = () => {
    const style = useThemeAwareObject(customStyle)
    const { themeData } = useTheme()

    const footer = () => (
        <View style={style.footerContainer}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity testID='ArchivesPodcastTO1' style={{ flexDirection: 'row' }}
                    activeOpacity={0.8} onPress={() => { console.log('play podcasts') }}>
                    <ButtonImage icon={() => {
                        return getSvgImages({
                            name: ImagesName.playIconSVG,
                            size: normalize(16),
                            fill: themeData.primaryBlack
                        });
                    }} onPress={() => { }}
                    />
                    <Label children={archivesPodCastData.allEpisodes}
                        color={Styles.color.greenishBlue}
                        style={style.leftTitleStyle} />
                </TouchableOpacity>
                <Label children={archivesPodCastData.timeDuration} labelType={LabelTypeProp.p5} />
            </View>
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: ImagesName.bookMarkBlackBdrSVG,
                    size: normalize(14),
                    fill: themeData.primaryBlack
                });
            }} onPress={() => { }}
            />
        </View>
    )

    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ paddingRight: normalize(20) }}>
                    <Label labelType={LabelTypeProp.h1}
                        children={archivesPodCastData.title}
                        color={themeData.primary}
                        style={style.titleContainer} />
                    <Label
                        labelType={LabelTypeProp.h3}
                        children={archivesPodCastData.body}
                        color={themeData.secondaryDavyGrey}
                        style={style.bodyContainer}
                        numberOfLines={2} />
                </View>
                <Image style={style.imageContainer} url={archivesPodCastData.image} resizeMode={ImageResize.COVER} />
            </View>
            {footer()}
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        container: {
            backgroundColor: theme.secondaryWhite,
            height: normalize(140),
            width: screenWidth,
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
        },
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(10),
        },
        leftTitleStyle: {
            paddingRight: normalize(10),
            paddingLeft: normalize(20)
        },
        rightTitleStyle: {
            paddingHorizontal: normalize(10),
        }
    })
)
