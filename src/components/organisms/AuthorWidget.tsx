import { View, StyleSheet, FlatList, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { WidgetHeader, Divider, LabelTypeProp,WidgetHeaderProps } from '../atoms'
import { AuthorItem } from '../molecules'
import { isNonEmptyArray, isTab, normalize, screenWidth, isNotEmpty } from 'src/shared/utils'
import { flatListUniqueKey, TranslateConstants, TranslateKey } from '../../constants/Constants'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { getImageUrl, getSecondsToHms } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'


const AuthorWidget = ({
    data,
    listKey,
    widgetHeader,
    containerStyle,
    widgetHeaderStyle,
    widgetHeaderContainerStyle,
    togglePlayback,
    selectedTrack,
    lastIndexDivider = false,
    showHeader = true,
}: {
    data: any, listKey?: string,
    widgetHeader?: string,
    containerStyle?: StyleProp<ViewStyle>,
    widgetHeaderContainerStyle?: StyleProp<ViewStyle>,
    widgetHeaderStyle?: StyleProp<ViewStyle>,
    togglePlayback?: (nid: string, mediaData: any)=> void,
    selectedTrack?: string,
    lastIndexDivider?: boolean,
    showHeader?: boolean
}) => {
    const style = useThemeAwareObject(customStyle)
    const OPINION_COMBO_TITLE = TranslateConstants({key:TranslateKey.OPINION_COMBO_TITLE})
    const { themeData } = useTheme()
    

    const renderItem = (item: any, index: number) => (
        <AuthorItem body={item.title}  
        mediaVisibility={item.field_jwplayer_id_opinion_export ? isNotEmpty(item.field_jwplayer_id_opinion_export) : isNotEmpty(item.jwplayer)} 
        jwPlayerID={isNotEmpty(item.field_jwplayer_id_opinion_export) ? item.field_jwplayer_id_opinion_export : (isNotEmpty(item.jwplayer) ? item.jwplayer : null)}
        togglePlayback={togglePlayback}
        selectedTrack={selectedTrack}
        author={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? item.field_opinion_writer_node_export[0].name
              : item.field_opinion_writer_node_export.opinion_writer_photo
          }
        duration = {item.jwplayer_info ? getSecondsToHms(item.jwplayer_info.split('|')[1]) : null}
        authorId={
            isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].id
        }
        image={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? getImageUrl(
                  item.field_opinion_writer_node_export[0].opinion_writer_photo
                )
              : getImageUrl(
                  item.field_opinion_writer_node_export.opinion_writer_photo,
                )
          }
        index={index} 
        nid={item.nid}
        selectedType={'OPINION'}
        />
    )

    const widgetHeaderData: WidgetHeaderProps = {
        headerLeft: {
            title: widgetHeader ? widgetHeader : OPINION_COMBO_TITLE,
            color: themeData.primary,
            labelType: LabelTypeProp.h2,
            elementContainerStyle: style.headerLeftContainer,
            textStyle: { fontSize:16, lineHeight:32, fontFamily: fonts.AwsatDigital_Bold}
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
    if(!isNonEmptyArray(data)) {
        return null
    }
    return (
        <View style={StyleSheet.flatten([style.container,containerStyle])}>
            { showHeader && <View style={StyleSheet.flatten([style.headerContainer, widgetHeaderContainerStyle])}>
                <WidgetHeader {...widgetHeaderData} widgetHeaderStyle={widgetHeaderStyle} />
            </View>}
            <FlatList
                style={style.listContainer}
                keyExtractor={(_, index) => index.toString()}
                listKey={listKey ? listKey : flatListUniqueKey.AUTHOR_WIDGET}
                data={data}
                numColumns={numberOfColumn}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderItem(item, index)}
                ItemSeparatorComponent={() => <Divider style={style.divider} />}
                ListFooterComponent={() => lastIndexDivider ? <Divider style={style.footerDivider} /> : null}
                bounces={false}
            />
        </View>
    )
}

export default AuthorWidget

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            paddingVertical: normalize(20),
            backgroundColor: isTab ?  theme.backgroundColor : theme.secondaryWhite
        },
        headerContainer: {
            paddingHorizontal: isTab ? 0.02 * screenWidth : normalize(0.04 * screenWidth),
            backgroundColor: isTab ?  theme.backgroundColor : theme.secondaryWhite
        },
        headerLeftContainer: {
            paddingHorizontal: 0,
        },
        listContainer: {
            flex: 1,
            paddingTop: normalize(20),
            paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
            backgroundColor: theme.secondaryWhite,
            marginHorizontal: isTab ? normalize(0.02 * screenWidth) : 0,
            paddingBottom:isTab ? normalize(20) : 0
        },
        divider: {
            marginBottom: normalize(20),
            height: 1,
            backgroundColor: theme.dividerColor
        },
        footerDivider: {
            height: 1,
            backgroundColor: theme.dividerColor
        }
    })
}
