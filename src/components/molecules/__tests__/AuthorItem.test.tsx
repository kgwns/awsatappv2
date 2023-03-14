import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { AuthorItem } from '..'
import { ButtonImage } from '../../atoms'
import { useNavigation } from '@react-navigation/native';
import { useAppPlayer } from 'src/hooks';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';
import { ScreensConstants } from 'src/constants/Constants';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

jest.mock('src/services/narratedOpinionArticleService', () => ({
    fetchNarratedOpinionArticleApi: jest.fn()
}))

jest.mock('src/hooks/useAppPlayer', () => ({ useAppPlayer: jest.fn() }));

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data = {
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

    const mediaData = jest.fn();
    const timeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12'
                },
                {
                    name: 'abc',
                    id: '13'
                },
            ],
            title: 'abc'
        }, mediaData]);
        (useState as jest.Mock).mockImplementation(() => [100, timeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: 1 },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} nid = "12" renderLabelsOrder = {['authorName','title','default']} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render the component', () => {
        DeviceTypeUtilsMock.isTab = false;
        expect(instance).toBeDefined()
    })


    test('Should render the component in Tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined()
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(ButtonImage)
        fireEvent(element, 'onPress', { nid: '1' });
        expect(mockFunction).toBeTruthy();
    })

    it('When AutherItemTO1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO1');
        fireEvent(testItemId, 'onPress', { nid: '1' });
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemTO2 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO2');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

    it('When AutherItemTO3 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress', { tid: '1' });
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemTO3 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress', { tid: '' });
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemLabel1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemLabel1');
        fireEvent(testItemId, 'onPress', { tid: '1' });
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemLabel1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemLabel1');
        fireEvent(testItemId, 'onPress', { tid: '' });
        expect(navigation.navigate).toBeTruthy();
    });
    it('When titleId is pressed', () => {
        const testItemId = instance.getByTestId('titleId');
        fireEvent(testItemId, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:'12'});
    });
})

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data = {
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

    const mediaData = jest.fn();
    const timeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers('legacy');
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12'
                },
                {
                    name: 'abc',
                    id: '13'
                },
            ],
            title: 'abc'
        }, mediaData]);
        (useState as jest.Mock).mockImplementation(() => [100, timeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: 1 },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
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
        fireEvent(element, 'onPress', { nid: '1' });
        expect(mockFunction).toBeTruthy();
    })

    it('When AutherItemTO1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO1');
        fireEvent(testItemId, 'onPress', { nid: '1' });
        expect(navigation.navigate).toBeTruthy();
    });

    it('When AutherItemTO2 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO2');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

    it('When AutherItemTO3 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress', { tid: '1' });
        expect(navigation.navigate).toBeTruthy()
    });

    it('When AutherItemLabel1 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemLabel1');
        fireEvent(testItemId, 'onPress', { tid: '1' });
        expect(navigation.navigate).toBeTruthy();
    });

    it("test fetchNarratedOpinionArticleApi return response", async () => {
        const response = await fetchNarratedOpinionArticleApi({ jwPlayerID: '2' });
        expect(response).toEqual({playList:{duration:'duration'}});
    })
})



describe('<Author Item> should call fetchNarratedOpinionArticleApi', () => {
    let instance: RenderAPI
    const data = {
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

    const mediaData = jest.fn();
    const timeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers('legacy');
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockRejectedValue({response:{data:"error"}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12'
                },
                {
                    name: 'abc',
                    id: '13'
                },
            ],
            title: 'abc'
        }, mediaData]);
        (useState as jest.Mock).mockImplementation(() => [100, timeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: 1 },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("test fetchNarratedOpinionArticleApi throws error", async () => {
        try{
            await fetchNarratedOpinionArticleApi({jwPlayerID:'2'});
        }
        catch(error) {
            const errormes = error as AxiosError;
            expect(errormes?.response?.data).toBeDefined();
        }
    })
})
