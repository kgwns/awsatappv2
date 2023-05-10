import { Label } from 'src/components/atoms/label/Label'
import React, { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import CloseIcon from 'src/assets/images/icons/close.svg'
import { fonts } from "src/shared/styles/fonts";
import { ImagesName } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';

export const TabletPopup = ({
    isVisible = false,
    title = TranslateConstants({ key: TranslateKey.TABLET_NOT_SUBSCRIBED_POP_UP }),
    description = TranslateConstants({ key: TranslateKey.TABLET_CREATE_ACCOUNT_DESCRIPTION }),
    onClose,
    onButtonPress,
}: {
    isVisible?: boolean;
    title?: string;
    description?: string;
    onClose: (isVisible: boolean) => void;
    onButtonPress?: () => void
}) => {
    const [modalVisible, setModalVisibility] = useState(isVisible)
    const styles = useThemeAwareObject(customStyle)
    const Logo = () => getSvgImages({ name: ImagesName.tabPopupLogo, width: styles.logo.width, height: styles.logo.height });
    const TABLET_POPUP_BUTTON_TEXT = TranslateConstants({ key: TranslateKey.TABLET_POPUP_BUTTON_TEXT });

    useEffect(() => {
        setModalVisibility(isVisible)
    }, [isVisible])


    if (!modalVisible) {
        return null
    } else {
        return (
            <>
                <Modal visible={modalVisible} transparent={true} testID={'modalId'}>
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <TouchableOpacity testID="AlertModalTO1" style={styles.iconStyle} onPress={() => {
                                onClose(!modalVisible)
                                setModalVisibility(!modalVisible)
                            }
                            }>
                                <CloseIcon fill={colors.white} width={23} height={23} />
                            </TouchableOpacity>
                            <View style={styles.logoContainer}>
                                <Logo />
                            </View>
                            <View style={styles.titleContainer}>
                                <Label
                                    children={title}
                                    style={styles.titleTextStyle}
                                />
                                <View style={styles.divider} />
                            </View>
                            <Label
                                children={description}
                                style={styles.descriptionTextStyle}
                            />
                            <TouchableOpacity testID="AlertModalTO2" onPress={onButtonPress}>
                                <View style={styles.buttonBackgroundStyle}>
                                    <Label style={styles.buttonLabelStyle}
                                        children={TABLET_POPUP_BUTTON_TEXT} />
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
            backgroundColor: colors.blackOpacity60
        },
        innerContainer: {
            alignItems: 'center',
            height: 'auto',
            width: 380,
            backgroundColor: theme.bottomSheetBackground,
            borderRadius: 30,
        },
        titleContainer: {
            marginTop: 20
        },
        titleTextStyle: {
            fontSize: 23,
            color: colors.white,
            lineHeight: 44,
            fontFamily: fonts.AwsatDigital_Bold,
            justifyContent: 'center',
            textAlign: 'center',
        },
        descriptionTextStyle: {
            fontSize: 14,
            color: colors.aliceDimBlue,
            lineHeight: 28,
            textAlign: 'center',
            paddingTop: 30,
            paddingBottom: 30,
            fontFamily: fonts.IBMPlexSansArabic_Regular,
            width: '90%'
        },
        buttonBackgroundStyle: {
            height: 50,
            backgroundColor: colors.white,
            borderRadius: 100,
            justifyContent: 'center',
            width: 200,
            alignSelf: 'center',
            marginBottom: 40
        },
        buttonLabelStyle: {
            paddingHorizontal: 10,
            fontSize: 20,
            fontFamily: fonts.AwsatDigital_Bold,
            color: colors.black,
            lineHeight: 40,
            textAlign: 'center',
        },
        iconStyle: {
            position: 'absolute',
            top: 30,
            right: 25
        },
        logoContainer: {
            alignSelf: 'center',
            marginTop: 60
        },
        logo: {
            width: 150,
            height: 50,
        },
        divider: {
            backgroundColor: colors.lightAlterGray,
            height: 1,
            width: 50,
            alignSelf: 'center',
            marginTop: 10
        },
    })
