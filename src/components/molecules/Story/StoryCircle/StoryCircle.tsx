import React, { FunctionComponent } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { Image } from '../../../atoms';
import { colors } from '../../../../shared/styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageResize } from '../../../../shared/styles/text-styles';
import { normalize } from '../../../../shared/utils/dimensions';

interface StoryCircleProps {
    storyImageUrl: string;
    onPress: () => void;
}

const StoryCircle: FunctionComponent<StoryCircleProps> = ({
    storyImageUrl,
    onPress
}) => {
    return (
        <View>
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
    outerCircle: {
        height: normalize(71),
        width: normalize(71),
        borderRadius: normalize(71) / 2,
        borderWidth: 2,
        borderColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        height: normalize(63),
        width: normalize(63),
        borderRadius: normalize(63) / 2,
        overflow: 'hidden'
    },
    storyImage: {
        height: '100%',
        width: '100%'
    }
})


export default StoryCircle;