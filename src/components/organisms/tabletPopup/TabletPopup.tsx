import { Label } from 'src/components/atoms/label/Label'
import React, { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { normalize, screenHeight } from 'src/shared/utils'
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
                                numberOfLines={3}
                            />
                            <TouchableOpacity testID="AlertModalTO2" onPress={onButtonPress}>
                                <View style={styles.buttonBackgroundStyle}>
                                    <Label style={styles.buttonLabelStyle}
                                        children={'الدخول'} />
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
            height: normalize(558),
            width: 548,
            backgroundColor: theme.bottomSheetBackground,
            borderRadius: normalize(30),
        },
        titleContainer: {
            marginTop: normalize(35)
        },
        titleTextStyle: {
            fontSize: normalize(38),
            color: colors.white,
            lineHeight: normalize(44),
            fontFamily: fonts.AwsatDigital_Bold,
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: normalize(20)
        },
        descriptionTextStyle: {
            fontSize: normalize(18),
            color: colors.aliceDimBlue,
            lineHeight: normalize(28),
            textAlign: 'center',
            paddingTop: normalize(25),
            paddingBottom: normalize(50),
            width: "80%",
            fontFamily: fonts.IBMPlexSansArabic_Regular,
        },
        buttonBackgroundStyle: {
            height: normalize(65),
            backgroundColor: colors.white,
            borderRadius: normalize(100),
            justifyContent: 'center',
            width: normalize(236),
            alignSelf: 'center'
        },
        buttonLabelStyle: {
            paddingHorizontal: normalize(10),
            fontSize: normalize(25),
            fontFamily: fonts.AwsatDigital_Bold,
            color: colors.black,
            lineHeight: normalize(40),
            textAlign: 'center',
        },
        iconStyle: {
            position: 'absolute',
            top: 30,
            right: 25
        },
        logoContainer: {
            alignSelf: 'center',
            marginTop: normalize(100)
        },
        logo: {
            width: normalize(284),
            height: 0.065 * screenHeight,
        },
        divider: {
            backgroundColor: colors.lightAlterGray,
            height: 1,
            width: normalize(100),
            alignSelf: 'center',
            marginTop: normalize(10)
        },
    })
