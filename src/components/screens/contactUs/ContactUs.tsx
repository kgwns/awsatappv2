import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AlertPayloadType, ScreenContainer } from '../ScreenContainer/ScreenContainer'
import { horizontalAndBottomEdge, isIOS, isNotEmpty, isObjectNonEmpty, isTab, normalize, recordLogEvent, screenWidth, testProps } from 'src/shared/utils'
import { StaticPageHeader } from 'src/components/molecules'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { Label, TextInputField } from 'src/components/atoms'
import { ImagesName, Styles } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useContactUs } from 'src/hooks'
import { emailValidation } from 'src/shared/validators'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FLEX_START } from 'src/shared/styles/item-alignment'
import { AnalyticsEvents } from 'src/shared/utils/analytics'

export type ContactUsModal = {
    name: string;
    email: string;
    message: string;
}

export enum FormField {
    NAME,
    EMAIL,
    MESSAGE,
}

export const ContactUs = () => {
    const navigation = useNavigation()

    const CONST_CALL_US = TranslateConstants({ key: TranslateKey.DRAWER_CALL_US })
    const CONST_NAME = TranslateConstants({ key: TranslateKey.CONTACT_US_NAME })
    const CONST_EMAIL = TranslateConstants({ key: TranslateKey.CONTACT_US_EMAIL })
    const CONST_YOUR_LETTER = TranslateConstants({ key: TranslateKey.CONTACT_US_LETTER })
    const CONST_SEND = TranslateConstants({ key: TranslateKey.CONTACT_US_SEND })
    const CONST_ALERT = TranslateConstants({ key: TranslateKey.TEXT_ALERT })
    const CONST_OK = TranslateConstants({ key: TranslateKey.COMMON_OK })
    const CONST_DO_YOU_HAVE_QUESTION = TranslateConstants({key:TranslateKey.CONTACT_US_DO_YOU_HAVE_QUESTIONS});
    const CONST_CONTACT_US_DESCRIPTION = TranslateConstants({key:TranslateKey.CONTACT_US_DESCRIPTION});
    const CONST_CONTACT_US_ADDRESS = TranslateConstants({key:TranslateKey.CONTACT_US_ADDRESS});

    //Hooks
    const style = useThemeAwareObject(customStyle)
    const { isLoading, sendSuccessInfo, sendContactUsInfo, emptyContactUsInfo } = useContactUs()

    //State
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [disableSend, setDisableSend] = useState(true)
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertPayload, setAlertPayload] = useState<AlertPayloadType>();

    useEffect(() => {
        return () => {
            emptyContactUsInfo()
        }
    }, [])

    useEffect(() => {
        validateSuccessInfo()
    }, [sendSuccessInfo])

    useEffect(() => {
        const canDisableSend = !validateFields()
        setDisableSend(canDisableSend)
    }, [name, email, message])

    const validateSuccessInfo = () => {
        if (isContactSuccessMessage()) {
            setAlertPayload({
                title: '',
                message: sendSuccessInfo.message ?? '',
                buttonTitle: CONST_OK
            })
            setIsAlertVisible(true)
        }
    }

    const isContactSuccessMessage = () => isObjectNonEmpty(sendSuccessInfo) && sendSuccessInfo.code === 200

    const onPressSend = () => {
        if (validateFields()) {
            const emailValidMessage = emailValidation(email)
            if (isNotEmpty(emailValidMessage)) {
                setAlertPayload({
                    title: CONST_ALERT,
                    message: emailValidMessage,
                    buttonTitle: CONST_OK,
                });
                setIsAlertVisible(true);
                return
            }
            Keyboard.dismiss();
            recordLogEvent(AnalyticsEvents.CONTACT_FORM_SUBMIT);
            sendContactUsInfo({
                name: name.trim(),
                email: email.trim(),
                msg: message.trim(),
            })
        }
    }

    const onPressAlert = () => {
        setIsAlertVisible(false)
        if (isContactSuccessMessage()) {
            navigation.goBack()
        }
    }

    const validateFields = () => (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(message))

    const onChangeText = (text: string, fieldName: FormField) => {
        switch (fieldName) {
            case FormField.NAME:
                setName(text);
                break;
            case FormField.EMAIL:
                setEmail(text);
                break;
            case FormField.MESSAGE:
                setMessage(text);
                break;
            default: return
        }
    }

    const renderAboutScreen = () => (
        <View style={style.aboutScreenStyle}>
            <Label children={CONST_DO_YOU_HAVE_QUESTION}
                style={style.title}
                color={Styles.color.greenishBlue}
            />
            <Label children={CONST_CONTACT_US_DESCRIPTION}
                style={style.description}
            />
        </View>
    )

    const sendButton = () => {
        return (
            <View style={style.sendMainContainer}>
                <TouchableOpacity 
                    {...testProps('sendButton')} 
                    disabled={disableSend} 
                    onPress={onPressSend}
                    testID='ContactUsTestId01'
                    style={[style.sendButton, { opacity: disableSend ? 0.7 : 1 }]}
                >
                    <Label children={CONST_SEND} style={style.sendButtonLabel} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderFormFields = () => {
        return (
            <View style={style.formContainer}>
                <TextInputField
                    placeholder={CONST_NAME}
                    onChangeText={(text: string) => onChangeText(text, FormField.NAME)}
                    value={name}
                    style={style.inputStyle}
                    isMandatory
                    maxLength={20}
                    leftIcon={() => getSvgImages({
                        name: ImagesName.profileNameIcon,
                        width: 19,
                        height: 19,
                    })}
                />
                <TextInputField
                    placeholder={CONST_EMAIL}
                    onChangeText={(text: string) => onChangeText(text, FormField.EMAIL)}
                    value={email}
                    style={style.inputStyle}
                    isMandatory
                    leftIcon={() => getSvgImages({
                        name: ImagesName.emailGrayIcon,
                        width: 18,
                        height: 14,
                    })}
                    keyboardType={'email-address'}
                />
                <TextInputField
                    placeholder={CONST_YOUR_LETTER}
                    onChangeText={(text: string) => onChangeText(text, FormField.MESSAGE)}
                    value={message}
                    style={[style.inputStyle, style.messageText]}
                    isMandatory
                    leftIcon={() => getSvgImages({
                        name: ImagesName.chatBubbleIcon,
                        width: 17,
                        height: 16,
                    })}
                    leftIconStyle={style.messageIcon}
                    maxLength={500} //Text limit as per AMAR-878
                    multiline={true}
                    textInputStyle={style.messageTextInput}
                />
                {sendButton()}
            </View>
        )
    }

    const renderContactAddress = () => {
        return (
            <View style={style.contactAddressContainer}>
                <Label
                    style={style.contactAddressText}
                    children={CONST_CONTACT_US_ADDRESS}
                />
            </View>
        )
    }

    return (
        <ScreenContainer edge={horizontalAndBottomEdge}
            isLoading={isLoading}
            isAlertVisible={isAlertVisible}
            setIsAlertVisible={setIsAlertVisible}
            alertOnPress={onPressAlert}
            alertPayload={alertPayload}
            backgroundColor={style.screenBackgroundColor?.backgroundColor}
        >
            <StaticPageHeader title={CONST_CALL_US} />
            <KeyboardAwareScrollView
                bounces={false}
                extraHeight={230}
                showsVerticalScrollIndicator={false}
                scrollEnabled>
                <View style={style.mainContainer}>
                    {renderAboutScreen()}
                    {renderFormFields()}
                    {renderContactAddress()}
                </View>
            </KeyboardAwareScrollView>
        </ScreenContainer>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 0.04 * screenWidth,
    },
    title: {
        fontSize: 18,
        lineHeight: 42,
        textAlign: 'left',
        fontFamily: fonts.AwsatDigital_Bold,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'left',
        fontFamily: fonts.Effra_Arbc_Regular,
        color: theme.secondaryMediumGrey,
    },
    aboutScreenStyle: {
        paddingTop: normalize(40),
        paddingBottom: normalize(25),
    },
    inputStyle: {
        width: '97%',
        color: theme.primaryLightGray,
    },
    messageText: {
        height: normalize(180),
        justifyContent: FLEX_START,
        paddingTop: isIOS ? 5 : 8,
    },
    sendMainContainer: {
        justifyContent: FLEX_START,
        flexDirection: 'row',
    },
    sendButton: {
        backgroundColor: Styles.color.greenishBlue,
        alignItems: 'center',
        minWidth: 110,
        borderRadius: 25,
    },
    sendButtonLabel: {
        fontSize: 16,
        lineHeight: 25,
        fontFamily: fonts.AwsatDigital_Bold,
        textAlign: 'left',
        color: Styles.color.white,
        paddingVertical: 10,
    },
    messageIcon: {
        justifyContent: FLEX_START,
        paddingTop: 15
    },
    messageTextInput: {
        height: '92%',
        textAlignVertical: 'top',
    },
    screenBackgroundColor: {
        backgroundColor: theme.termsBackground
    },
    formContainer: {
        width: '100%'
    },
    contactAddressContainer: {
        alignItems: 'flex-start',
        marginVertical: 50
    },
    contactAddressText: {
        fontSize: isTab ? 20 : 15,
        lineHeight: isTab ? 25 : 20,
        fontFamily: fonts.Effra_Regular,
        textAlign: 'left',
        color: theme.primaryBlack
    },
})
