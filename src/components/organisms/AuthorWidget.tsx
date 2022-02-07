import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { WidgetHeader, Divider } from '../atoms'
import { authorHeaderData, authorWidgetData } from '../../constants/SampleData'
import { AuthorItem } from '../molecules'
import { AuthorItemProps } from '../molecules/AuthorItem'
import { normalize, screenWidth } from '../../shared/utils'
import { flatListUniqueKey } from '../../constants'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

const AuthorWidget = () => {
    const style = useThemeAwareObject(customStyle)

    const renderItem = (item: AuthorItemProps, index: number) => (
        <AuthorItem {...item} index={index} />
    )

    return (
        <View style={style.container}>
            <WidgetHeader {...authorHeaderData} />
            <FlatList
                style={style.listContainer}
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.AUTHOR_WIDGET}
                data={authorWidgetData}
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
