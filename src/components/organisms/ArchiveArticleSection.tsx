import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ArchiveArticle, ArticleFooterProps } from 'src/components/molecules'
import { ArchivedArticleDataType } from 'src/redux/latestNews/types'
import { ImagesName, Styles } from 'src/shared/styles'
import { Label, Image } from '../atoms';
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import { dateTimeAgo, isDarkTheme, isTypeAlbum, TimeIcon } from 'src/shared/utils/utilities'
import { useAppCommon } from 'src/hooks'

export const archiveArticleFooter: ArticleFooterProps = {
    leftTitleColor: Styles.color.silverChalice,
    rightTitleColor: Styles.color.silverChalice,
    leftTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight: 20 }
}

interface ArchiveArticleSectionProps {
    data: ArchivedArticleDataType[],
    title: string,
    onPress: (nid: string) => void,
    isDivider?: boolean;
    dividerStyle?: StyleProp<ViewStyle>
    containerStyle?: StyleProp<ViewStyle>
    hideMore?: boolean;
}

const ArchiveArticleSection = (props: ArchiveArticleSectionProps) => {
    const { data } = props;

    const { theme } = useAppCommon()
    const isDarkMode = isDarkTheme(theme)

    const archiveData = isNonEmptyArray(data) ? data[0] : {} as ArchivedArticleDataType
    const style = useThemeAwareObject(createStyles);
    const timeFormat = dateTimeAgo(archiveData.created)
    archiveArticleFooter.leftTitle = timeFormat.time
    archiveArticleFooter.leftIcon = () => TimeIcon(timeFormat.icon)

    const renderArchiveSection = () => (
        <View style={isTab && style.listHeaderStyle}>
            <ArchiveArticle
                {...archiveData}
                containerStyle={isTab ? style.tabletImageStyle : {}}
                titleStyle={style.titleStyle}
                leftTitleColor={ isTab ? Styles.color.black900 : Styles.color.silverChalice}
                showDivider={false}
                isAlbum={isTypeAlbum(archiveData.type)}
                rightTitleStyle = {style.rightTitleStyle}
            />
        </View>
    )

    if (!isNonEmptyArray(data)) {
        return null
    }

    const ArchiveHeader = () => (
        <View style={style.headerView}>
            <View style={style.headerLogoContainer}>
                {!isTab && <Image name={isDarkMode ? ImagesName.archiveIconDarkImage : ImagesName.archiveIconLightImage} style={style.headerLogo} />}
            </View>
            <Label children={props.title} style={style.headerTitle} />
        </View>
    )

    return (
        <View style={[style.container, props.containerStyle]}>
            <View style={!isTab ? style.headerContainer : style.tabHeaderContainer}>
                <ArchiveHeader />
            </View>
            {renderArchiveSection()}
        </View>
    )
}

export default ArchiveArticleSection

const createStyles = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingTop: normalize(5),
    },
    headerContainer: {
        paddingHorizontal: 0.04 * screenWidth,
        paddingBottom: normalize(10),
        paddingTop: normalize(15)
    },
    tabHeaderContainer: {
        paddingHorizontal: 0.04 * screenWidth,
    },
    tabletImageStyle: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
        padding: normalize(30)
    },
    divider: {
        height: 1,
        backgroundColor: theme.dividerColor
    },
    spacingStyle: {
        paddingBottom: normalize(10),
        paddingTop: normalize(5),
        paddingHorizontal: isTab ? 0 : 0.04 * screenWidth,
    },
    contentStyleFirst: {
        marginTop: isTab ? 0 : 5,
    },
    titleStyle: {
        fontSize: isTab ? 25 : 20,
        lineHeight: isTab ? 35 : 32,
        fontFamily: isTab ? fonts.AwsatDigital_Bold : fonts.AwsatDigital_Black,
        fontWeight: isTab ? '700' : 'normal'
    },
    listArticleTitle: {
        fontSize: normalize(17),
        lineHeight: normalize(28),
        fontFamily: fonts.AwsatDigital_Bold,
    },
    articleTitleStyle: {
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: 17,
        lineHeight: 28,
        textAlign: 'left',
        paddingVertical: normalize(8),
        color: theme.primaryBlack
    },
    bodyStyle: {
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left'
    },
    listHeaderStyle: {
        width: '100%'
    },
    image: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
    },
    headerView: {
        flexDirection: 'row'
    },
    headerLogoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    headerLogo: {
        width: 22,
        height: 22
    },
    headerTitle: {
        fontSize: isTab ? 25 : 20,
        fontFamily: isTab ? fonts.AwsatDigital_Black : fonts.AwsatDigitalV2_Regular,
        lineHeight: isTab ? 36 : 38,
        color: theme.primaryBlack,
    },
    rightTitleStyle: {
        fontFamily:fonts.Effra_Arbc_Regular,
        fontSize:13,
        lineHeight:16,
        fontWeight:'400',
    }

})
