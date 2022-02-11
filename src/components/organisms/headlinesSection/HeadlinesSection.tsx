import React from 'react';
import { StyleSheet, View } from 'react-native';
import { normalize } from 'src/shared/utils';
import TextTicker from 'react-native-text-ticker';
import { Label, LabelTypeProp } from 'src/components/atoms';
import { colors } from 'src/shared/styles/colors';

interface TextTickerProps {
    duration?: number,
    loop?: boolean,
    repeatSpacer?: number,
    marqueeDelay?: number,
}

export interface HeadlinesSectionProps extends TextTickerProps {
    headlineTitle: string,
    headlineTitleColor?: string,
    barColor?: string,
    headlineDescription: string,
    headlineDescriptionColor?: string,
    duration?: number,
    loop?: boolean,
    repeatSpacer?: number,
    marqueeDelay?: number,
}

const HeadlinesSection = ({
    headlineTitle,
    headlineTitleColor,
    barColor,
    headlineDescription,
    headlineDescriptionColor,
    duration,
    loop,
    repeatSpacer,
    marqueeDelay,
}: HeadlinesSectionProps) => {
    const titleColor = headlineTitleColor ? headlineTitleColor : colors.davyGrey;
    const bodyColor = headlineDescriptionColor ? headlineDescriptionColor : colors.davyGrey;
    const separatorColor = barColor ? barColor : colors.greenishBlue;
    return (
        <View style={HeadlinesSectionStyle.contentContainer}>
            <Label color={titleColor} children={headlineTitle} labelType={LabelTypeProp.p5} />
            {headlineTitle && <View style={[HeadlinesSectionStyle.separator, { backgroundColor: separatorColor }]} />}
            <TextTicker
                style={[HeadlinesSectionStyle.headlineDescription, { color: bodyColor }]}
                duration={duration ? duration : TextTickerDefaultProps.duration}
                loop={loop ? loop : TextTickerDefaultProps.loop}
                repeatSpacer={repeatSpacer ? repeatSpacer : TextTickerDefaultProps.repeatSpacer}
                marqueeDelay={marqueeDelay ? marqueeDelay : TextTickerDefaultProps.repeatSpacer}
                isRTL
            >
                {headlineDescription}
            </TextTicker>
        </View>
    )
}

const TextTickerDefaultProps = {
    style: {},
    duration: 3000, // in milliseconds
    loop: false, 
    marqueeDelay: 1000, // in milliseconds
    repeatSpacer: 50, // The space between the end of the text string ticker and the beginning of it starting again
}

const HeadlinesSectionStyle = StyleSheet.create({
    contentContainer: {
        width: '100%',
        height: normalize(25),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: normalize(2),
        overflow: 'hidden',
    },
    separator: {
        width: '.3%',
        height: '45%',
        marginHorizontal: normalize(8)
    },
    headlineDescription: {
        fontSize: 12,
        textAlign: 'left',
    }
})

export default HeadlinesSection;