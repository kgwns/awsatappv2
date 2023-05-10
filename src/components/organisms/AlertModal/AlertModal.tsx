import { Label } from 'src/components/atoms/label/Label'
import React, { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { normalize, isDarkTheme } from 'src/shared/utils'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import CloseIcon from 'src/assets/images/icons/close.svg'
import { useAppCommon } from 'src/hooks';
import { fonts } from "src/shared/styles/fonts";

export const AlertModal = ({
    message,
    title,
    isVisible = false,
    buttonText,
    onClose,
    onPressSuccess,
    isCloseIconVisible = true
}: {
    title: string;
    message: string;
    buttonText: string;
    isVisible?: boolean;
    onClose: (isVisible: boolean) => void;
    onPressSuccess?: () => void;
    isCloseIconVisible?: boolean;
}) => {
    const [modalVisible, setModalVisibility] = useState(isVisible)
    const styles = useThemeAwareObject(customStyle)
    const { theme } = useAppCommon()
    const isDarkMode = isDarkTheme(theme)

    useEffect(() => {
        setModalVisibility(isVisible)
    }, [isVisible])


    if (!modalVisible) {
        return null
    } else {
        return (
            <>
                <Modal visible={modalVisible} transparent={true} >
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            {
                                isCloseIconVisible && <TouchableOpacity testID="AlertModalTO1" style={styles.iconStyle} onPress={() => {
                                    onClose(!modalVisible)
                                    setModalVisibility(!modalVisible)
                                }
                                }>
                                    <CloseIcon fill={isDarkMode ? colors.white : colors.darkSlateGray} />
                                </TouchableOpacity>
                            }
                            <Label
                                children={title}
                                style={styles.titleTextStyle}
                            />
                            <Label
                                children={message}
                                style={styles.instructionTextStyle}
                                numberOfLines={3}
                            />
                            <TouchableOpacity testID="AlertModalTO2" onPress={onPressSuccess}>
                                <View style={styles.buttonBackgroundStyle}>
                                    <Label style={styles.buttonLabelStyle}
                                        children={buttonText} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        )

    }

};
const customStyle = (theme: CustomThemeType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.alertBackground
        },
        innerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: normalize(324),
            width: normalize(349),
            backgroundColor: theme.secondaryWhite,
            borderRadius: normalize(30),
        },
        titleTextStyle: {
            fontSize: normalize(24),
            color: theme.primary,
            lineHeight: normalize(42),
            fontFamily: fonts.AwsatDigital_Bold,
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: normalize(20)
        },
        instructionTextStyle: {
            fontSize: normalize(16),
            color: theme.secondaryDavyGrey,
            lineHeight: normalize(28),
            textAlign: 'center',
            paddingBottom: normalize(50),
            width: normalize(278),
            fontFamily: fonts.IBMPlexSansArabic_Regular,
        },
        buttonBackgroundStyle: {
            height: normalize(46),
            backgroundColor: theme.primary,
            borderRadius: normalize(23),
            justifyContent: 'center',
            width: normalize(172),
            alignSelf: 'center'
        },
        buttonLabelStyle: {
            paddingHorizontal: normalize(10),
            fontSize: normalize(16),
            fontFamily: fonts.AwsatDigital_Bold,
            color: colors.white,
            lineHeight: normalize(26),
            textAlign: 'center',
        },
        iconStyle: {
            alignSelf: 'flex-start',
            bottom: normalize(20),
            marginLeft: normalize(30),
            paddingBottom: normalize(20)
        }
    })
