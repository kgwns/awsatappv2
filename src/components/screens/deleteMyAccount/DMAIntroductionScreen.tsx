import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { ScreenContainer } from "../ScreenContainer/ScreenContainer"
import { decodeHTMLTags, horizontalEdge, isNonEmptyArray } from "src/shared/utils/utilities"
import { CustomThemeType, colors } from "src/shared/styles/colors"
import { useThemeAwareObject } from "src/shared/styles/useThemeAware"
import { ImagesName, Styles } from "src/shared/styles"
import { ButtonOutline, Label } from "src/components/atoms"
import { useNavigation } from "@react-navigation/native"
import { ScreensConstants, TranslateConstants, TranslateKey } from "src/constants/Constants"
import { Image } from 'src/components/atoms/image/Image'
import { ImageResize } from "src/shared/styles/text-styles"
import { isTab, screenWidth } from "src/shared/utils"
import { fonts } from "src/shared/styles/fonts"
import { useDeleteMyAccount } from "src/hooks"
import { DeleteMyAccountLabel } from "src/components/molecules"

export const DMAIntroductionScreen = () => {

    const {
        isLoading,
        dmaIntroductionData,
        fetchDMAIntroductionRequest
    } = useDeleteMyAccount();

    useEffect(() => {
        fetchDMAIntroductionRequest();
    }, []);

    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const TITLE = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_INTRODUCTION_TITLE });
    const DESCRIPTION = isNonEmptyArray(dmaIntroductionData) ? dmaIntroductionData[0].body_export : "";
    const BUTTON_TITLE = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_PROCEED_BUTTON_TITLE });
    const imageContainerStyle = isTab ? styles.imageContainerTab : styles.imageContainer;
    const descriptionStyle = isTab ? styles.descriptionStyleTab : styles.descriptionStyle;
    const ButtonTitleStyle = isTab ? styles.buttonTextTab : styles.buttonText;

    const handleOnPress = () => {
        navigation.navigate(ScreensConstants.DMA_OPTIONS_LIST_SCREEN)
    }
    return (
        <ScreenContainer
            edge={horizontalEdge}
            backgroundColor={styles.screenBackgroundColor?.backgroundColor}
            isLoading={isLoading}
        >
            {!isLoading && <View style={styles.proceedContainer} testID={"containerId"}>
                <DeleteMyAccountLabel title={TITLE}/>
                <View style={imageContainerStyle}>
                    <Image
                        style={styles.image}
                        name={ImagesName.deleteAccountImageName}
                        resizeMode={ImageResize.COVER}
                    />
                </View>
                <Label style={descriptionStyle} children={decodeHTMLTags(DESCRIPTION)} testID={"descriptionId"} />
                <View style={styles.buttonContainer}>
                    <ButtonOutline title={BUTTON_TITLE}
                        onPress={handleOnPress}
                        labelStyle={ButtonTitleStyle}
                        style={styles.buttonStyle}
                        color={Styles.color.white}
                    />
                </View>
            </View>}
        </ScreenContainer>
    )
}

const createStyles = (theme: CustomThemeType) => (
    StyleSheet.create({
        screenBackgroundColor: {
            backgroundColor: theme.profileBackground
        },
        proceedContainer: {
            flex: 1,
            marginHorizontal: isTab ? '6%' : 0.06 * screenWidth
        },
        imageContainer: {
            marginTop: 30,
            width: 140,
            height: 116,
            alignSelf: 'center',
        },
        imageContainerTab: {
            marginTop: 50,
            width: 200,
            height: 176,
            alignSelf: 'center',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        descriptionStyle: {
            fontSize: 16,
            fontFamily: fonts.Effra_Arbc_Regular,
            lineHeight: 28,
            textAlign: 'left',
            color: theme.secondaryDavyGrey,
            marginTop: 50
        },
        descriptionStyleTab: {
            fontSize: 20,
            fontFamily: fonts.Effra_Arbc_Regular,
            lineHeight: 38,
            textAlign: 'left',
            color: theme.secondaryDavyGrey,
            marginTop: 50
        },
        buttonContainer: {
            alignItems: 'center',
            margin: isTab ? 100 : 60
        },
        buttonStyle: {
            backgroundColor: theme.primary,
            borderColor: Styles.color.transparent,
        },
        buttonText: {
            fontFamily: fonts.AwsatDigitalV2_Bold,
            fontSize: 18,
            lineHeight: 32,
            fontWeight: 'bold',
            color: colors.white
        },
        buttonTextTab: {
            fontFamily: fonts.AwsatDigitalV2_Bold,
            fontSize: 24,
            lineHeight: 34,
            fontWeight: 'bold',
            color: colors.white
        }
    })
)
