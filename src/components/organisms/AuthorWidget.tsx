import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { WidgetHeader, Divider } from '../atoms'
import { authorHeaderData, authorWidgetData } from '../../constants/SampleData'
import { AuthorItem } from '../molecules'
import { AuthorItemProps } from '../molecules/AuthorItem'
import { normalize, screenWidth } from '../../shared/utils'
import { Styles } from '../../shared/styles'
import { flatListUniqueKey } from '../../constants'

const AuthorWidget = () => {
    const renderItem = (item: AuthorItemProps, index: number) => (
        <AuthorItem {...item} index={index} />
    )

    return (
        <View style={authorWidgetStyle.container}>
            <WidgetHeader {...authorHeaderData} />
            <FlatList
                style={authorWidgetStyle.listContainer}
                keyExtractor={(_, index) => index.toString()}
                listKey={flatListUniqueKey.AUTHOR_WIDGET}
                data={authorWidgetData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
                ItemSeparatorComponent={() => <Divider />}
                bounces={false}
            />
        </View>
    )
}

export default AuthorWidget

const authorWidgetStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingVertical: normalize(20),
        backgroundColor: Styles.color.white
    },
    listContainer: {
        flex: 1,
        paddingTop: normalize(20)
    }
})
