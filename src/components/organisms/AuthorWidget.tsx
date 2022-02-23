import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { WidgetHeader, Divider, LabelTypeProp,WidgetHeaderProps } from '../atoms'
import { AuthorItem } from '../molecules'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { flatListUniqueKey } from '../../constants'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { LatestOpinionDataType } from 'src/redux/latestNews/types'
import { useTranslation } from 'react-i18next';
import { useTheme } from 'src/shared/styles/ThemeProvider'

const AuthorWidget = ({data}: { data: LatestOpinionDataType[] }) => {
    const style = useThemeAwareObject(customStyle)
    const [t] = useTranslation()
    const { themeData } = useTheme()
    const renderItem = (item: LatestOpinionDataType, index: number) => (
        <AuthorItem body={item.title} author={item.field_opinion_writer_node_export.name} duration={'3:30'} image={item.field_opinion_writer_node_export.opinion_writer_photo} index={index} />
    )

    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: t('latestNewsTab.sectionWriters.headerLeft'),
            color: themeData.primary,
            labelType: LabelTypeProp.h2,
        },
        // headerRight: {
        //     title: t('latestNewsTab.sectionComboOne.headerRight'),
        //     icon: () => {return getSvgImages({
        //         name: ImagesName.arrowLeftFaced,
        //         size: normalize(12),
        //         style: { marginLeft: normalize(10) }
        //     })},
        //     color: Styles.color.smokeyGrey,
        //     labelType: LabelTypeProp.h3,
        //     clickable: true,
        // },
    };
    const numberOfColumn = isTab ? 2 : 1
    if(!isNonEmptyArray(data)) return null
    return (
        <View style={style.container}>
            <WidgetHeader {...widgetHeaderData} />
            <FlatList
                style={style.listContainer}
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.AUTHOR_WIDGET}
                data={data}
                numColumns={numberOfColumn}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
                ItemSeparatorComponent={() => <Divider style={{ marginBottom: normalize(20) }} />}
                bounces={false}
            />
        </View>
    )
}

export default AuthorWidget

const customStyle = (theme: CustomThemeType) => {
    const authorWidgetStyle = StyleSheet.create({
        container: {
            paddingHorizontal: 0.04 * screenWidth,
            paddingVertical: normalize(20),
            backgroundColor: theme.secondaryWhite
        },
        listContainer: {
            flex: 1,
            paddingTop: normalize(20)
        }
    })
    return authorWidgetStyle
}
