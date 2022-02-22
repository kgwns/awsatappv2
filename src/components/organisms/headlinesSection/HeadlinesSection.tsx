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
import { TouchableWithoutFeedback } from 'react-native';

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
    const titleColor = headlineTitleColor ? headlineTitleColor : themeData.secondaryDarkSlate;
    const bodyColor = headlineDescriptionColor ? headlineDescriptionColor : themeData.secondaryDavyGrey;
    const separatorColor = barColor ? barColor : themeData.primary;
    let nextIndex = 0
    let stringWidth = 0
    useEffect(() => {
        setHeadNews(tickerData[0].title as any ?? '')
        setHeaderNews(tickerData[0].news_categories.title as any ?? '')
        setIndexValue(1)
        return () => { }
    }, [])

    const getNextData = () => {
        nextIndex = indexValue + 1
        if (nextIndex === tickerData.length) {
            { setIndexValue(0) }
        }
        else {
            setIndexValue(nextIndex)
        }
        return (
            <>
                {setHeadNews(tickerData[indexValue].title as any ?? '')}
                {setHeaderNews(tickerData[indexValue].news_categories.title as any ?? '')}
            </>
        )
    }
    const isOverLapped = () => {
        stringWidth = textWidth + titleWidth + 20
        if (stringWidth < Dimensions.get('window').width) {
            setTimeout(function () {
                { getNextData() }
            }, duration);
            return <View/>;
        }
    }
    const onPress = () => {
        if (tickerData[indexValue].nid) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: tickerData[indexValue].nid })
        }
    }
    const renderData = () => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={HeadlinesSectionStyle.contentContainer}>
                    <Label color={titleColor} children={headerNews} labelType={LabelTypeProp.p5} onLayout={e => { setTitleWidth(e.nativeEvent.layout.width) }} />
                    {tickerData[indexValue].news_categories.title as any && <View style={[HeadlinesSectionStyle.separator, { backgroundColor: separatorColor }]} />}
                    <View onLayout={e => { setTextWidth(e.nativeEvent.layout.width) }}>
                        <TextTicker
                            style={[HeadlinesSectionStyle.headlineDescription, { color: bodyColor }]}
                            duration={duration ? duration : TextTickerDefaultProps.duration}
                            loop={loop ? loop : TextTickerDefaultProps.loop}
                            repeatSpacer={repeatSpacer ? repeatSpacer : TextTickerDefaultProps.repeatSpacer}
                            marqueeDelay={marqueeDelay ? marqueeDelay : TextTickerDefaultProps.repeatSpacer}
                            isRTL
                            onMarqueeComplete={() => getNextData()}
                        >
                            <Text>
                                {headNews}
                            </Text>
                        </TextTicker>
                    </View>
                    {isOverLapped()}
                </View>
            </TouchableWithoutFeedback>
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