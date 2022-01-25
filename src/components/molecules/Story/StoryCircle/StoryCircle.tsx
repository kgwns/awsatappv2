import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { Image } from '../../../atoms';
import { colors } from '../../../../shared/styles/colors';

const StoryCircle = ({ storyImage }: any) => {
    return (
        <View style={StoryCircleStyle.container}>
            <View style={StoryCircleStyle.outerCircle} >
                <View style={StoryCircleStyle.innerCircle} >
                    <Image resizeMode='cover' url={storyImage} style={StoryCircleStyle.storyImage} />
                </View>
            </View>
        </View>
    )
}

const StoryCircleStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 177
    },
    outerCircle: {
        height: 74,
        width: 74,
        borderRadius: 74 / 2,
        borderWidth: 2,
        borderColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        height: 66,
        width: 66,
        borderRadius: 66 / 2,
        overflow: 'hidden'
    },
    storyImage: {
        height: '100%',
        width: '100%'
    }
})


export default StoryCircle;