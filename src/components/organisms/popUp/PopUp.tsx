import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BottomSheetView } from 'src/components/molecules';
import { isTab, normalize, screenHeight, screenWidth } from 'src/shared/utils';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { AlertModal } from '../AlertModal/AlertModal';
import { SIGN_UP, NOT_SUBSCRIBED, SAVE_ARTICLE_TO_YOUR_FAVOURITES, CREATE_ACCOUNT_DESCRIPTION, LOG_IN } from 'src/constants/SharedConstants'


export enum PopUpType {
    alertModal = 'alertModal',
    rbSheet = 'rbSheet',
}

export interface PopUpProp {
    type: PopUpType,
    onPressButton: () => void,
    showPopUp: boolean,
    onClosePopUp: () => void,
    title?: string,
    subTitle?: string,
    description?: string,
    buttonLabel?: string,
    signUpLabel?: string,
    logInLabel?: string,
}


export const PopUp = ({
    type,
    onPressButton,
    showPopUp,
    onClosePopUp,
    title = NOT_SUBSCRIBED,
    subTitle = SAVE_ARTICLE_TO_YOUR_FAVOURITES,
    description = CREATE_ACCOUNT_DESCRIPTION,
    buttonLabel = SIGN_UP,
    signUpLabel = SIGN_UP,
    logInLabel = LOG_IN
}: PopUpProp) => {
    let refRBSheet: RBSheet = useRef();
    const style = useThemeAwareObject(customStyle);
    const [height, setheight] = useState(0.85 * screenHeight)

    useEffect(() => {
        if (type === PopUpType.rbSheet) { (showPopUp) ? refRBSheet.open() : refRBSheet.close() }
    }, [showPopUp])

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    const [currentOrientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
        isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
    );

    useEffect(() => {
        const callback = () => {
            setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE')
        };
        const subscription = Dimensions.addEventListener('change', callback);
        return () => subscription?.remove();
    }, []);

    useEffect(() => {
        if (currentOrientation === 'PORTRAIT') {
            setheight(0.85 * screenHeight)
        }
        else {
            setheight(0.85 * screenWidth)
        }
    }, [currentOrientation]);

    const onPressSuccessButton = () => {
        if (type === PopUpType.rbSheet) {
            refRBSheet.close()
        }
        onPressButton()
    }

    const renderAlertModal = () => (<AlertModal
        title={title}
        message={subTitle}
        buttonText={buttonLabel}
        isVisible={showPopUp}
        onPressSuccess={onPressSuccessButton}
        onClose={() => onClosePopUp()}
    />)

    const renderRBSheet = () => (
        <RBSheet
            ref={ref => refRBSheet = ref}
            animationType={'none'}
            height={height}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnDragAboveSheet={true}
            onClose={onClosePopUp}
            customStyles={{
                container: StyleSheet.flatten([style.rbSheetContainer, {height: height}]),
                wrapper: style.popupBackground,
                draggableIcon: style.rbDraggableIcon
            }}
            openDuration={50}
        >
            <BottomSheetView
                onPressSignUp={onPressSuccessButton}
                title={title}
                subTitle={subTitle}
                description={description}
                signUpLabel={signUpLabel}
                logInLabel={logInLabel} />
        </RBSheet>
    )

    const renderPopUp = () => {
        switch (type) {
            case PopUpType.alertModal:
                return renderAlertModal()
            case PopUpType.rbSheet:
                return renderRBSheet()
            default:
                return renderRBSheet()
        }
    }

    return (renderPopUp())
}

const customStyle = (theme: CustomThemeType) => {
    const popUpStyle = StyleSheet.create({
        container: {
            flex: 1,
        },
        contentStyle: {
            paddingHorizontal: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
        },
        rbSheetContainer: {
            alignItems: "center",
            borderRadius: normalize(20),
            backgroundColor: theme.bottomSheetBackground
        },
        rbDraggableIcon: {
            width: normalize(122),
            height: 4,
            backgroundColor: theme.primaryBlack
        },
        popupBackground: {
            backgroundColor: theme.popupBackground
        }
    });
    return popUpStyle
}

export default PopUp;
