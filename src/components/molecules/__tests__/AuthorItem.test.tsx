import React, {useState} from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { AuthorItem } from '..'
import { ButtonImage } from '../../atoms'
import {useNavigation} from '@react-navigation/native';
import { useAppPlayer } from 'src/hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data =   {
        author: 'عادل درويش',
        body: 'الصحافة بين الخصوصية والصالح العام',
        duration: '3:22',
        image: 'https://picsum.photos/200/300'
    }
    const mockFunction = jest.fn();
    const navigation = {
        goBack: mockFunction,
        navigate: mockFunction,
    }

    const setMediaData = jest.fn();
    const setTimeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [{}, setMediaData]);
        (useState as jest.Mock).mockImplementation(() => [null, setTimeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: {id: 1},
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render the component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(ButtonImage)
        fireEvent(element, 'onPress', {nid:'1'});
        expect(mockFunction).toBeTruthy();
    })

    it('When AutherItemTO1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO1');
        fireEvent(testItemId, 'onPress', {nid:'1'});
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemTO2 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO2');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

    it('When AutherItemTO3 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress', {tid:'1'});
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemLabel1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemLabel1');
        fireEvent(testItemId, 'onPress', {tid:'1'});
        expect(navigation.navigate).toBeTruthy();
    });
})