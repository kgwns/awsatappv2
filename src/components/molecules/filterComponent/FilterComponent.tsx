import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms/label/Label'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { isIOS, isNonEmptyArray, isNotEmpty, isTab, normalize, normalizeBy320 } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { moleculesTestID } from 'src/constants/Constants'
import { fonts } from 'src/shared/styles/fonts'

export type FilterDataType = {
    name: string,
    isSelected: boolean
    child?: FilterDataType[]
    count?: number;
    isVisible?: boolean;
}

type FilterComponentType = {
    data: FilterDataType[],
    onPress: (index: number) => void
    onPressSubChild?: (childIndex: number, subChildIndex: number) => void;
    selectedColor?: string;
    showSelectedBorder?: boolean;
}

export const FilterComponent = ({
    data, 
    onPress, 
    onPressSubChild, 
    selectedColor,
    showSelectedBorder = true,
}: FilterComponentType) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)
    const renderSubChild = (childIndex: number, childItem: FilterDataType[]) => {
        return (
            <>
                {childItem.map((item, index) => {
                    return (
                        <View style={style.childLabelContainer} key={index}>
                            <TouchableOpacity testID='renderSubChild' onPress={() => onPressSubChild && onPressSubChild(childIndex, index)}>
                                <Label children={item.name} style={style.childLabel}
                                    color={item.isSelected ? Styles.color.greenishBlue : themeData.secondarySpanishGray}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </>
        )
    }

    const renderItemCount = (item: FilterDataType) => (
        <Label style={[style.label, { marginLeft: 3 }]}
            color={item.isSelected ? Styles.color.white : themeData.secondarySpanishGray}
            children={`(${item.count?.toString()})`}
        />
    );

    return (
        <ScrollView style={style.container} horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        >
            {
                data.map((item: FilterDataType, index: number) => {
                    if (item.isVisible === false) {
                        return null
                    }

                    return <>
                        <View style={style.labelContainer} key={index}>
                            <TouchableOpacity testID={moleculesTestID.filterBtn} activeOpacity={0.8} onPress={() => onPress(index)}
                                style={[style.filterItem, item.isSelected && style.filterActive,
                                item.isSelected && isNotEmpty(selectedColor) && { backgroundColor: selectedColor },
                                item.isSelected && !showSelectedBorder && { borderWidth: 0 }]}>
                                <Label children={item.name} style={style.label}
                                    color={item.isSelected ? Styles.color.white : themeData.secondarySpanishGray}
                                />
                                {isTab && typeof item.count == 'number' && renderItemCount(item)}
                            </TouchableOpacity>
                        </View>
                        {item.isSelected && isNonEmptyArray(item.child) && renderSubChild(index, item.child!)}
                    </>
                })
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
            borderRadius: normalize(20),
            flexDirection: 'row',
        },
        filterActive: {
            backgroundColor: theme.filterBackgroundColor,
            borderColor: theme.filterBackgroundColor,
        },
        labelContainer: {
            paddingRight: 5,
        },
        label: {
            fontSize: 12,
            lineHeight: 16,
            fontFamily: fonts.AwsatDigital_Regular,
        },
        childLabelContainer: {
            paddingRight: 15,
            justifyContent: 'center'
        },
        childLabel: {
            fontSize: 12,
            lineHeight: 16,
            fontFamily: fonts.Effra_Arbc_Regular,
        }

    })
)
