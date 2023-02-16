import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { isNonEmptyArray, isNotEmpty, normalize } from 'src/shared/utils';
import TextTicker from 'react-native-text-ticker';
import { Label, LabelTypeProp } from 'src/components/atoms';
import { LatestArticleDataType, NewsCategoriesType } from 'src/redux/latestNews/types';
import { ScreensConstants } from 'src/constants/Constants';
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
    const titleColor = headlineTitleColor ? headlineTitleColor : themeData.secondaryDarkSlate;
    const bodyColor = headlineDescriptionColor ? headlineDescriptionColor : themeData.secondaryDavyGrey;
    const separatorColor = barColor ? barColor : themeData.primary;
    let nextIndex = 0
    let stringWidth = 0
    useEffect(() => {
        const title = getTitle(tickerData, 0)
        setHeadNews(tickerData[0].title as any ?? '')
        setHeaderNews(title)
        setIndexValue(1)
    }, [])

    const getTitle = (data: LatestArticleDataType[], index: number): string => {
        if (isNonEmptyArray(data[index]?.news_categories)) {
            const newsInfo = data[index]?.news_categories as NewsCategoriesType[]
            return newsInfo[0]?.title ?? ''
        }
        return data[index]?.news_categories?.title ?? ''
    }

    const getNextData = () => {
        nextIndex = indexValue + 1
        if (nextIndex === tickerData.length) {
            { setIndexValue(0) }
        } else {
            setIndexValue(nextIndex)
        }
        const title = getTitle(tickerData, indexValue)
        return (
            <>
                {setHeadNews(tickerData[indexValue].title as any ?? '')}
                {setHeaderNews(title)}
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
        return null;
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
                    <Label testID='HeadlinesSectionLabel01'
                        color={titleColor}
                        children={headerNews}
                        labelType={LabelTypeProp.h5}
                        onLayout={e => { setTitleWidth(e.nativeEvent.layout.width) }}
                    />
                    {isNotEmpty(headerNews) && <View style={[HeadlinesSectionStyle.separator, { backgroundColor: separatorColor }]} />}
                    <View testID='HeadlinesSectionView01' onLayout={e => { setTextWidth(e.nativeEvent.layout.width) }}>
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
        width: '0.5%',
        height: '45%',
        marginHorizontal: normalize(8)
    },
    headlineDescription: {
        fontSize: normalize(12),
        textAlign: 'left',
    }
})

export default HeadlinesSection;
