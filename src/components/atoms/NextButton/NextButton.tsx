import React, { FunctionComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ImagesName } from '../../../shared/styles';
import { Label } from '../../atoms';
import { getSvgImages } from '../../../shared/styles/svgImages';

interface NextButtonProps {
    title: string;
    onPress: () => void;
    style: {
        nextButtonContainer: {},
        nextButtonIconContainer: {},
        nextButtonTextContainer: {},
        nextButtonText: {}
    };
    testID?: string
}

export const NextButton: FunctionComponent<NextButtonProps> = ({
    title,
    onPress,
    style,
    testID
}) => {
    const iconWidth = 20;
    const iconHeight = 20;
    return (
        <TouchableOpacity
            testID={testID}
            onPress={onPress}
            style={style.nextButtonContainer}>
            <View style={style.nextButtonIconContainer}>
                {getSvgImages({ name: ImagesName.arrowNext, width: iconWidth, height: iconHeight })}
            </View>

            <View style={style.nextButtonTextContainer}>
                <Label style={style.nextButtonText}>
                    {title}
                </Label>
            </View>
        </TouchableOpacity>
    );
};