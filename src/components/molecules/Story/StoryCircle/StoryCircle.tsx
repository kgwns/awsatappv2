import React, { FunctionComponent } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { Image } from '../../../atoms';
import { colors } from '../../../../shared/styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageResize } from '../../../../shared/styles/text-styles';

interface StoryCircleProps {
    storyImageUrl: string;
    onPress: () => void;
}

const StoryCircle: FunctionComponent<StoryCircleProps> = ({
    storyImageUrl,
    onPress
}) => {
    return (
        <View style={StoryCircleStyle.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={StoryCircleStyle.outerCircle} >
                    <View style={StoryCircleStyle.innerCircle} >
                        <Image resizeMode={ImageResize.COVER} url={storyImageUrl} style={StoryCircleStyle.storyImage} />
                    </View>
                </View>
            </TouchableOpacity>
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