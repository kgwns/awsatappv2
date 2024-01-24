import axios from 'axios';
import moment from 'moment';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, } from 'react-native'
import { ArticleDetailImage, Journalist } from 'src/components/molecules'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types'
import { SCRIBBLE_LIVE_EVENT_URL, SCRIBBLE_LIVE_JSON_PARAM, SCRIBBLE_LIVE_TOKEN_PARAM, SCRIBBLE_TOKEN } from 'src/services/apiUrls';
import { isAndroid, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, isTab } from 'src/shared/utils';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { Divider, Label } from '../atoms';
import { fonts } from 'src/shared/styles/fonts';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { formatGregorian, formatHijri } from 'src/shared/utils/utilities';
import { useTheme } from 'src/shared/styles/ThemeProvider';

interface ArticleDetailWidgetProps {
    articleData: ArticleDetailDataType,
    isRelatedArticle: boolean,
    isFirstItem: boolean,
    currentTime?: any,
    isFullScreen?: boolean,
    paused: boolean,
    playerVisible?: boolean,
    setPlayerDetails?: ( time:any, paused: any) => void;
    setMiniPlayerVisible?: (visible: boolean) => void; 
    onChangeFullScreen?: (isFullScreen: boolean) => void;
    setReset?: (show: boolean) => void;
    videoRefs?: any;
    showReplay?: boolean;
    displayType?: string;
}

const ArticleDetailWidget: FunctionComponent<ArticleDetailWidgetProps> = ({
    articleData, isRelatedArticle = false, isFirstItem, showReplay = false, displayType, ...props
}) => {
    const LAST_UPDATED = TranslateConstants({ key: TranslateKey.LAST_UPDATED });
    const PUBLISH_TO = TranslateConstants({ key: TranslateKey.PUBLISH_TO });
    const DATE_SEPARATOR = TranslateConstants({ key: TranslateKey.DATE_SEPARATOR });
    const style = useThemeAwareObject(customStyle);

    const {themeData} = useTheme();

    const UPDATED =  TranslateConstants({key:TranslateKey.ARTICLE_DETAIL_WIDGET_UPDATED})
    const [scribbleLiveData, setScribbleLiveData] = useState<any>({})
    moment.locale('ar')
    const timeAgo = isObjectNonEmpty(scribbleLiveData) ? `${UPDATED}  ${moment(scribbleLiveData.LastModified).fromNow()}` : '';


    useEffect(() => {
        isObjectNonEmpty(articleData) && isNotEmpty(articleData.scribbleLiveId) && fetchScribbleLive(articleData.scribbleLiveId)
    }, [articleData])

    const hasJournalist = useMemo(() => {
        return isNonEmptyArray(articleData.journalistId);
    }, [articleData]);

    const fetchScribbleLive = async (id: string) => {
        try {
            const response = await axios.get(
                `${SCRIBBLE_LIVE_EVENT_URL}${id}${SCRIBBLE_LIVE_TOKEN_PARAM}${SCRIBBLE_TOKEN}${SCRIBBLE_LIVE_JSON_PARAM}`,
            );
            setScribbleLiveData(response.data)
        } catch (error) {
            console.log('ArticleDetailWidget - fetchScribbleLive - error', error)
            throw error;
        }
    };

    const renderTabDate = () => (
        <View>
            {renderDate(LAST_UPDATED, articleData.created, { color: themeData.primaryBlack })}
            {renderDate(PUBLISH_TO, articleData.publishedDate)}
        </View>
    );

    const renderDate = (title: string, date: string, valueStyle?: StyleProp<TextStyle>) => {
        if(!isNotEmpty(date)) {
            return null;
        }
        const hijriDate = formatHijri(date);
        const gregorianDate = formatGregorian(date);
        const value = `${gregorianDate} ${DATE_SEPARATOR} ${hijriDate}`;

        return (
            <View style={style.dateContainer}>
                <Label children={title} style={style.dateTitle} />
                <Label children={value} style={[style.dateValue, valueStyle]} />
            </View>
        );
    };

    const renderTabFooter = () => (
        <View>
            <View style={[style.tabFooter, !hasJournalist && { justifyContent: 'flex-end' }]}>
                {renderJournalist()}
                {renderTabDate()}
            </View>
            <Divider style={style.divider} />
        </View>
    );

    const renderJournalist = () => {
        if (!hasJournalist) {
            return null;
        }
        return <Journalist {...articleData} />;
    };

    const renderFooterView = () => (
        isTab ? renderTabFooter() : renderJournalist()
    );

    return (
        <View>
            <ArticleDetailImage image={articleData.image} title={articleData.title}
                category={articleData.news_categories?.title} author={articleData.author}
                created={articleData.created}
                isRelatedArticle={isRelatedArticle}
                caption={articleData.caption}
                isFirstItem={isFirstItem}
                subtitle={articleData.subtitle}
                jwplayerId={articleData.jwplayerId}
                showReplay={showReplay}
                displayType={articleData.displayType}
                isAd={articleData.isAd}
                liveTimeAgo = {timeAgo}
                {...props}
            />
            {renderFooterView()}
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        tabFooter: {
            flexDirection: 'row',
            paddingTop: 20,
            justifyContent: 'space-between',
            flex:1 ,
        },
        dateContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
        },
        dateTitle: {
            fontSize: 14,
            lineHeight: 20,
            textAlign: 'right',
            color: theme.primary,
            fontFamily: fonts.AwsatDigital_Regular,
            fontWeight: '400',
            marginRight: 10,
        },
        dateValue: {
            fontSize: 14,
            lineHeight: isAndroid ? 26 : 20,
            textAlign: 'right',
            color: colors.paleGray,
            fontFamily: fonts.AwsatDigital_Regular,
            fontWeight: '400',
        },
        divider: {
            backgroundColor: theme.dividerColor,
        },
    }));

export default ArticleDetailWidget
