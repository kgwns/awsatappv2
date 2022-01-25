import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, Label, LabelTypeProp } from '../atoms'
import { normalize, CustomAlert } from '../../shared/utils'
import { ImagesName, Styles } from '../../shared/styles'

export interface AuthorItemProps {
    author: string,
    description: string,
    duration: string,
    image: string,
    index?: number
}

const AuthorItem = ({
    author,
    description,
    duration,
    image,
    index
}: AuthorItemProps) => {
    return (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Label children={author} labelType={LabelTypeProp.p4}
                    color={Styles.color.greenishBlue} numberOfLines={1} />
                <Label children={description} labelType={LabelTypeProp.h3}
                    numberOfLines={1} style={authorItemStyle.description} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => CustomAlert({})}>
                        <Image name={ImagesName.greenPlayIcon} size={normalize(14)} />
                    </TouchableOpacity>
                    <Label children={'استمع الي المقالة'} style={authorItemStyle.durationLabel} />
                    <Label children={duration} style={authorItemStyle.durationLabel} />
                </View>
            </View>
            <View>
                <Image url={image} size={normalize(80)} resizeMode={'cover'} type={'round'} />
            </View>
        </View>
    )
}

export default AuthorItem

const authorItemStyle = StyleSheet.create({
    description: {
        paddingVertical: normalize(10)
    },
    durationLabel: {
        paddingHorizontal: normalize(10)
    }
})
