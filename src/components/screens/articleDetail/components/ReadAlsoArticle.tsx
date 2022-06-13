import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp, TitleWithUnderLine } from 'src/components/atoms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors';
import { screenWidth } from 'src/shared/utils';
import { Styles } from 'src/shared/styles';

type ReadAlsoDataType = {
    title: string;
    nid: string;
}

type ReadAlsoArticleProps = {
    title: string;
    data: ReadAlsoDataType[];
}

export const ReadAlsoArticle = ({
    title,
    data,
}: ReadAlsoArticleProps) => {
    const style = useThemeAwareObject(customStyle)

    return (
        <View>
            <TitleWithUnderLine title={title} />
            <View style={style.bodyBackgroundContainer}>
                <View style={style.readAlsoListContainer}>
                    {
                        data.map((item, index) => {
                            const showDivider = data.length > index + 1
                            return (
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Label children={item.title} labelType={LabelTypeProp.p2} color={Styles.color.greenishBlue} />
                                    {showDivider && <View style={style.divider} />}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    bodyBackgroundContainer: {
        backgroundColor: theme.whiteSurface,
        paddingBottom: 15,
    },
    readAlsoListContainer: {
        padding: 0.04 * screenWidth,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: theme.dividerColor,
        marginVertical: 15,
    }
})