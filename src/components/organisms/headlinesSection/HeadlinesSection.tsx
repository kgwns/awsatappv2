import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { normalize } from 'src/shared/utils';
import TextTicker from 'react-native-text-ticker';
import { Label, LabelTypeProp } from 'src/components/atoms';
import { LatestArticleDataType } from '~/redux/latestNews/types';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'src/shared/styles/ThemeProvider';

interface TextTickerProps {
    duration?: number,
    loop?: boolean,
    repeatSpacer?: number,
    marqueeDelay?: number,
    tickerData?: LatestArticleDataType[]
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
    tickerData: LatestArticleDataType[]
}

const HeadlinesSection = ({
    headlineTitleColor,
    barColor,
    headlineDescriptionColor,
    duration,
    loop,
    repeatSpacer,
    marqueeDelay,
    tickerData
}: HeadlinesSectionProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [headNews, setHeadNews] = React.useState('');
    const [headerNews, setHeaderNews] = React.useState('');
    const [indexValue, setIndexValue] = React.useState(0)
    const [textWidth, setTextWidth] = React.useState(0);
    const [titleWidth, setTitleWidth] = React.useState(0);
    const { themeData } = useTheme()
    const titleColor = headlineTitleColor ? headlineTitleColor : themeData.secondaryDavyGrey;
    const bodyColor = headlineDescriptionColor ? headlineDescriptionColor : themeData.secondaryDarkSlate;
    const separatorColor = barColor ? barColor : themeData.primary;
    useEffect(() => {
        setHeadNews(tickerData[0].title as any ?? '')
        setHeaderNews(tickerData[0].news_categories.title as any ?? '')
        setIndexValue(1)
        return () => { }
    }, [])

    const getNextData = () => {
        if (indexValue + 1 === tickerData.length) {
            { setIndexValue(indexValue - indexValue) }
        }
        else {
            setIndexValue(indexValue + 1)
        }
        return (
            <>
                {setHeadNews(tickerData[indexValue].title as any ?? '')}
                {setHeaderNews(tickerData[indexValue].news_categories.title as any ?? '')}
            </>
        )
    }
    const isOverLapped = () => {
        if (textWidth + titleWidth + 20 < Dimensions.get('window').width) {
            setTimeout(function () {
                { getNextData() }
            }, duration);
        }
    }
    const onPress = () => {
        if (tickerData[indexValue].nid) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: tickerData[indexValue].nid })
        }
    }
    const renderData = () => {
        return (
            <View style={HeadlinesSectionStyle.contentContainer}>
                <Label color={titleColor} children={headerNews} labelType={LabelTypeProp.p5} onLayout={e => { setTitleWidth(e.nativeEvent.layout.width) }} />
                {tickerData[indexValue].news_categories.title as any && <View style={[HeadlinesSectionStyle.separator, { backgroundColor: separatorColor }]} />}
                <TextTicker
                    style={[HeadlinesSectionStyle.headlineDescription, { color: bodyColor }]}
                    duration={duration ? duration : TextTickerDefaultProps.duration}
                    loop={loop ? loop : TextTickerDefaultProps.loop}
                    repeatSpacer={repeatSpacer ? repeatSpacer : TextTickerDefaultProps.repeatSpacer}
                    marqueeDelay={marqueeDelay ? marqueeDelay : TextTickerDefaultProps.repeatSpacer}
                    isRTL
                    onMarqueeComplete={() => getNextData()}
                >
                    <Text
                        onPress={onPress}>
                        {headNews}
                    </Text>

                </TextTicker>
                <View
                    style={{ height: 0, alignSelf: 'flex-start' }}
                    onLayout={e => {
                        setTextWidth(e.nativeEvent.layout.width);
                    }}>
                    <Text style={HeadlinesSectionStyle.headlineDescription}>{headNews}</Text>
                </View>
                {isOverLapped()}
            </View>
        )
    }

    return (
        <View style={HeadlinesSectionStyle.contentContainer}>
            {renderData()}
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