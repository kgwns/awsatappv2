import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { normalize } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { useTheme } from 'src/shared/styles/ThemeProvider'

export type FilterDataType = {
    name: string,
    isSelected: boolean
}

type FilterComponentType = {
    data: FilterDataType[],
    onPress: (index: number) => void
}

export const FilterComponent = ({
    data,onPress
}: FilterComponentType) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)
    return (
        <ScrollView style={style.container} horizontal={true}
            showsHorizontalScrollIndicator={false}
            bounces={false}
        >
            {
                data.map((item: FilterDataType, index: number) =>
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => onPress(index)}
                        style={[style.filterItem, item.isSelected && style.filterActive]}
                    >
                        <Label children={item.name} style={style.label}
                            color={item.isSelected ? Styles.color.white : themeData.secondarySpanishGray}
                        />
                    </TouchableOpacity>
                )
            }
        </ScrollView>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        container: {
            paddingVertical: normalize(10)
        },
        filterItem: {
            marginRight: normalize(20),
            borderWidth: 1,
            borderColor: Styles.color.cyanGray,
            paddingHorizontal: normalize(15),
            paddingVertical: normalize(10),
            borderRadius: normalize(20)
        },
        filterActive: {
            backgroundColor: Styles.color.black
        },
        label: {
            fontSize: normalize(13)
        }
    })
)