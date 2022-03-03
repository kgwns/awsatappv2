import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ButtonImage, Image, Label, LabelTypeProp } from '../atoms'
import { normalize } from '../../shared/utils'
import { ImagesName, Styles } from '../../shared/styles'
import { isTab } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

export interface AuthorItemProps {
    author: string,
    body: string,
    duration: string,
    image: string,
    index?: number,
    nid?: string
}

const AuthorItem = ({
    author,
    body,
    duration,
    image,
    index,
    nid
}: AuthorItemProps) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle);
    const navigation = useNavigation<StackNavigationProp<any>>()
    const onPress = () => {
        if (nid) {
            navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:nid})
        }
    }

    return (
        <TouchableOpacity key={index} style={[style.container, isTab && { paddingRight: 20 }]} onPress={()=>onPress()} >
            <View style={{ flex: 1 }}>
                <Label children={author} labelType={LabelTypeProp.p4}
                    color={themeData.primary} numberOfLines={1} />
                <Label children={body} labelType={LabelTypeProp.h3}
                    numberOfLines={1} style={style.body} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ButtonImage
                        icon={() => {
                            return getSvgImages({
                                name: ImagesName.playIconSVG,
                                size: normalize(14),
                            });
                        }}
                        onPress={() => console.log('Pressed :::::')} />
                    <Label children={'استمع الي المقالة'} style={style.articleLabelSyle}
                        labelType={LabelTypeProp.h3} color={themeData.primary} />
                    <Label children={duration} style={style.durationLabel} />
                </View>
            </View>
            <View>
                <Image url={image} backgroundColor={themeData.secondaryDavyGrey} size={normalize(80)} resizeMode={'cover'} type={'round'} />
            </View>
        </TouchableOpacity>
    )
}

export default AuthorItem

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {
        paddingVertical: normalize(10),
        paddingRight: normalize(5)
    },
    durationLabel: {
        paddingHorizontal: normalize(10),
        color: Styles.color.spanishGray
    },
    articleLabelSyle: {
        paddingHorizontal: normalize(10),
        color: theme.primary

    }
})
