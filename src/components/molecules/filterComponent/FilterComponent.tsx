import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { isIOS, isNonEmptyArray, normalize, normalizeBy320 } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { moleculesTestID } from 'src/constants'
import { fonts } from 'src/shared/styles/fonts'

export type FilterDataType = {
    name: string,
    isSelected: boolean
    child?: FilterDataType[]
}

type FilterComponentType = {
    data: FilterDataType[],
    onPress: (index: number) => void
    onPressSubChild: (childIndex: number, subChildIndex: number) => void;
}

export const FilterComponent = ({
    data, onPress, onPressSubChild
}: FilterComponentType) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)

    const renderSubChild = (childIndex: number, childItem: FilterDataType[]) => {
        return (
            <>
                {childItem.map((item, index) => {
                    return <Label key={index} children={item.name} onPress={() => {
                        onPressSubChild(childIndex, index)
                    }}/>
                })}
            </>
        )
    }

    return (
        <ScrollView style={style.container} horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        >
            {
                data.map((item: FilterDataType, index: number) =>
                    <View style={{ paddingRight: 5 }} key={index}>
                        <TouchableOpacity testID={moleculesTestID.filterBtn} key={index} activeOpacity={0.8} onPress={() => onPress(index)}
                            style={[style.filterItem, item.isSelected && style.filterActive]}>
                            <Label children={item.name} style={style.label}
                                color={item.isSelected ? Styles.color.white : themeData.secondarySpanishGray}
                            />
                        </TouchableOpacity>
                        {item.isSelected && isNonEmptyArray(item.child) && renderSubChild(index, item.child!)}
                    </View>
                )
            }
        </ScrollView>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        container: {
            paddingVertical: normalize(10),
            alignSelf: 'flex-start'
        },
        filterItem: {
            marginRight: normalizeBy320(5),
            borderWidth: 1,
            borderColor: Styles.color.cyanGray,
            paddingLeft: normalize(15),
            paddingRight: normalize(15),
            paddingTop: normalize(7),
            paddingBottom: isIOS ? normalize(4) : normalize(7),
            borderRadius: normalize(20)
        },
        filterActive: {
            backgroundColor: theme.filterBackgroundColor,
            borderColor: theme.filterBorderColor,
        },
        label: {
            fontSize: 12,
            lineHeight: 16,
            fontFamily: fonts.AwsatDigital_Regular,
        }
    })
)
