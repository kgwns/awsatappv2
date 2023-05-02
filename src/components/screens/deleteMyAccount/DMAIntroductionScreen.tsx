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
import { screenWidth } from "src/shared/utils"
import { fonts } from "src/shared/styles/fonts"
import { useDeleteMyAccount } from "src/hooks/useDeleteMyAccount"
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

    const handleOnPress = () => {
        navigation.navigate(ScreensConstants.DMA_OPTIONS_LIST_SCREEN)
    }
    return (
        <ScreenContainer
            edge={horizontalEdge}
            backgroundColor={styles.screenBackgroundColor?.backgroundColor}
            isLoading={isLoading}
        >
            {!isLoading && <View style={styles.proceedContainer}>
                <DeleteMyAccountLabel title={TITLE}/>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        name={ImagesName.deleteAccountImage}
                        resizeMode={ImageResize.COVER}
                    />
                </View>
                <Label style={styles.descriptionStyle} children={decodeHTMLTags(DESCRIPTION)} />
                <View style={styles.buttonContainer}>
                    <ButtonOutline title={BUTTON_TITLE}
                        onPress={handleOnPress}
                        labelStyle={styles.buttonText}
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
            marginHorizontal: 0.06 * screenWidth
        },
        imageContainer: {
            marginTop: 30,
            width: 140,
            height: 116,
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
        buttonContainer: {
            alignItems: 'center',
            margin: 60
        },
        buttonStyle: {
            backgroundColor: theme.primary,
            borderColor: Styles.color.transparent,
        },
        buttonText: {
            fontFamily: fonts.AwsatDigitalV2_Bold,
            fontSize: 18,
            lineHeight: 28,
            fontWeight: 'bold',
            color: colors.white
        }
    })
)
