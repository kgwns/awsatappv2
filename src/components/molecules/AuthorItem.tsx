import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ButtonImage, Image, Label, LabelTypeProp } from '../atoms'
import { normalize } from '../../shared/utils'
import { ImagesName, Styles } from '../../shared/styles'
import { isTab } from 'src/shared/utils'

export interface AuthorItemProps {
    author: string,
    body: string,
    duration: string,
    image: string,
    index?: number
}

const AuthorItem = ({
    author,
    body,
    duration,
    image,
    index
}: AuthorItemProps) => {
    return (
        <View key={index} style={[authorItemStyle.container, isTab && {paddingRight: 20}]}>
            <View style={{ flex: 1 }}>
                <Label children={author} labelType={LabelTypeProp.p4}
                    color={Styles.color.greenishBlue} numberOfLines={1} />
                <Label children={body} labelType={LabelTypeProp.h3}
                    numberOfLines={1} style={authorItemStyle.body} />
                <View style={{ flexDirection: 'row',alignItems: 'center' }}>
                    <ButtonImage image={ImagesName.greenPlayIcon} size={normalize(14)}
                        onPress={() => console.log('Pressed :::::')} />
                    <Label children={'استمع الي المقالة'} style={authorItemStyle.durationLabel} 
                      labelType={LabelTypeProp.h3} color={Styles.color.greenishBlue}/>
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
        paddingHorizontal: normalize(10)
    }
})
