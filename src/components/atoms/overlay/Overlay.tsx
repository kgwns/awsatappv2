import { View,StyleSheet } from 'react-native'
import React from 'react'
import { Styles } from '../../../shared/styles'

export const Overlay = () => <View style={overlayStyle.container} />

const overlayStyle = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.4,
        backgroundColor: Styles.color.black,
        width: '100%',
        height: '100%'
      }  
})
