import React from "react"
import { ScreenContainer } from "../ScreenContainer/ScreenContainer"
import { horizontalEdge } from "src/shared/utils/utilities"
import { CustomThemeType } from "src/shared/styles/colors"
import { StyleSheet, Text, View } from "react-native"
import { useThemeAwareObject } from "src/shared/styles/useThemeAware"
import { Styles } from "src/shared/styles"
import { ButtonOutline } from "src/components/atoms"
import { useNavigation } from "@react-navigation/native"
import { ScreensConstants } from "src/constants/Constants"
import { Image } from 'src/components/atoms/image/Image'
import { ImageResize } from "src/shared/styles/text-styles"

export const DMAHomeScreen = () => {
    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const handleOnPress = () => {
        navigation.navigate(ScreensConstants.DMA_DELETE_ACCOUNT_LIST)
    }
    return (
        <ScreenContainer
        edge={horizontalEdge}
        backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
           <View style = {styles.deleteContainer}>
           <View style = {styles.imageContainer}>
                <Image fallback url={''} 
                    resizeMode={ImageResize.COVER}
                />
                <Text style = {styles.textStyle}>It's hard to see you go!</Text>
                <Text style = {styles.descriptionStyle}>
                    Your account will be deactivated for 30 days, after this period, all data associated with your account including your profile, songs and streaming history will be permanently deleted. If you'd like to reactivate your account, just login to anghami during the 30 days period.
                </Text>
                <Text style = {styles.descriptionStyle}>After your account gets permanently deleted, your information cannot be recovered, and/or cannot be restored using a mobile number.
                </Text>

                
            </View>
            <View style = {styles.buttonContainer}>
                <ButtonOutline title = {'Proceed to delete'} 
                    onPress={handleOnPress} 
                    style = {styles.buttonStyle}
                    color = {Styles.color.white}
                />
            </View>
           </View>
        </ScreenContainer>
    )
}

const createStyles = (theme: CustomThemeType) => (
    StyleSheet.create({
        screenBackgroundColor: {
            backgroundColor: theme.profileBackground
        },
        deleteContainer:{
            flex: 1, 
            justifyContent: 'space-between'
        },
        imageContainer: { 
            alignItems: 'center',
            margin: 30
        },
        buttonContainer: {
            margin: 30
        },
        containerStyle: {
            marginHorizontal: 20,
            marginVertical: 6,
        },
        titleStyle: {
            color: theme.primaryBlack,
            width: '75%'
        },
        textStyle: {
           color: Styles.color.greenishBlue,
           marginTop: 5,
        },
        descriptionStyle: {
            marginTop: 50
        },
        buttonStyle: {
            backgroundColor: Styles.color.greyLight,
            borderColor: Styles.color.greyLight,
        },
    })
)
    