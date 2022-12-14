import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { AlertPayloadType, ScreenContainer } from '../ScreenContainer'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { AlertModal, PopUp } from 'src/components/organisms'
import { useAppPlayer } from 'src/hooks';
import { PodCastMiniPlayer } from 'src/components/molecules'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { colors } from 'src/shared/styles/colors'

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

jest.mock("src/hooks/useAppCommon", () => ({
    useAppCommon: () => {
        return {
            theme: {
                LIGHT: 'light',
                DARK: 'dark'
            },
        }
    },
}));

jest.mock('src/hooks/useAppPlayer', () => ({ useAppPlayer: jest.fn() }));

const payloadAlert: AlertPayloadType = {
    title: 'Example',
    message: 'Example',
    buttonTitle: 'Example',
}

describe('<Screen Container>', () => {
    let instance: RenderAPI;
    const screenComponent = <></>
    const mockFunction = jest.fn();
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayer = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrack = jest.fn();

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: true,
            isPlaying: false,
            selectedTrack: { id: 1 },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayer,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrack,
        });
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        const component =
            <Provider store={storeSampleData}>
                <ScreenContainer children={screenComponent} edge={['right', 'top']} headerTitle={'Example'} isLoading={false} showPlayer={true} isSignUpAlertVisible={true} isAlertVisible={true} isOverlayLoading={true} showHeader={true} onCloseSignUpAlert={mockFunction} alertOnPress={mockFunction} barStyle={'default'} backgroundColor={colors.aquaHaze}/>
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })


    test('Should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should render component', () => {
        expect(render(<ScreenContainer children={screenComponent} isAlertVisible={true} onCloseSignUpAlert={mockFunction} alertOnPress={mockFunction} />)).toBeDefined()
    })

    test('Should render component', () => {
        expect(render(<ScreenContainer children={screenComponent} edge={['right', 'top']} alertPayload={payloadAlert} headerTitle={'Example'} isLoading={true} showPlayer={true} isSignUpAlertVisible={true} isAlertVisible={true} isOverlayLoading={true} showHeader={true} onCloseSignUpAlert={mockFunction} alertOnPress={mockFunction} barStyle={'default'} />)).toBeDefined()
    })

    it('when AlertModal only When onPressSuccess', () => {
        const testID = instance.container.findAllByType(AlertModal)[0];
        fireEvent(testID, 'onPressSuccess');
        expect(mockFunction).toBeTruthy();
    });

    it('when AlertModal only When onClose', () => {
        const testID = instance.container.findAllByType(AlertModal)[0];
        fireEvent(testID, 'onClose');
        expect(mockFunction).toBeTruthy();
    });

    it('when AlertModal only When onClosePopUp', () => {
        const testID = instance.container.findAllByType(PopUp)[0];
        fireEvent(testID, 'onClosePopUp');
        expect(mockFunction).toBeTruthy();
        expect(navigation.reset).toBeTruthy();
    });

    it('when AlertModal only When onPressButton', () => {
        const testID = instance.container.findAllByType(PopUp)[0];
        fireEvent(testID, 'onPressButton');
        expect(mockFunction).toBeTruthy();
    });

    it('when AlertModal only When toggleControl', () => {
        const testID = instance.container.findAllByType(PodCastMiniPlayer)[0];
        fireEvent(testID, 'toggleControl');
        expect(mockFunction).toBeTruthy();
    });

    it('when AlertModal only When onClose', () => {
        const testID = instance.container.findAllByType(PodCastMiniPlayer)[0];
        fireEvent(testID, 'onClose');
        expect(setShowMiniPlayer).toBeTruthy();
        expect(setPlayerTrack).toBeTruthy();
    });

    it('when onPress password icon', () => {
        const testId = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(testId, 'onPress');
        expect(navigation.goBack).toHaveBeenCalled();
    });
})