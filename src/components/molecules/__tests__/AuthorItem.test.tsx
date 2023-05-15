import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { AuthorItem } from '..'
import { Divider } from '../../atoms'
import { useNavigation } from '@react-navigation/native';
import { useAppPlayer } from 'src/hooks';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';
import { ScreensConstants } from 'src/constants/Constants';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { isDarkTheme } from 'src/shared/utils';
import { Styles } from 'src/shared/styles';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock('src/shared/utils/utilities',() => ({
    ...jest.requireActual('src/shared/utils/utilities'),
    isDarkTheme: jest.fn()
}))

jest.mock('src/shared/styles/svgImages',() => ({
    ...jest.requireActual('src/shared/styles/svgImages'),
    getSvgImages: jest.fn()
}))

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

jest.mock('src/services/narratedOpinionArticleService', () => ({
    fetchNarratedOpinionArticleApi: jest.fn()
}))

jest.mock('src/hooks/useAppPlayer', () => ({ useAppPlayer: jest.fn() }));

jest.mock("react-native-track-player", () => ({
    TrackPlayer: jest.fn().mockReturnValue({
        getState: jest.fn()
    }),
    Event: ['PlaybackState', 'PlaybackError', 'PlaybackQueueEnded'],
    usePlaybackState: jest.fn(),
    State: ['Playing', 'Buffering']
}))
  
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
    const prevPlayBackState = jest.fn();
    const mediaData = jest.fn();
    const timeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
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
        (useState as jest.Mock).mockImplementation(() => [false, prevPlayBackState]);
        (useState as jest.Mock).mockImplementation(() => [100, timeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem index={0} showInMainScreen={false} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'2opinion'} {...data} mediaVisibility={true} nid = "1opinion" renderLabelsOrder = {['authorName','title','default']} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should not Display MainScreen Author UI', () => {
        expect(instance.queryByTestId('mainScreenAuthorId')).toBeNull();
    })

    test('Should render the component', () => {
        DeviceTypeUtilsMock.isTab = false;
        expect(instance).toBeDefined()
    })
    it('Should Navigate to WritersDetailScreen when the user clicks the author', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'2'});
    });

    test('Should render the component in Tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        expect(instance).toBeDefined()
    })

    it('When AutherItemTO2 is pressed', () => {
        const testItemId = instance.getByTestId('AutherItemTO2');
        fireEvent(testItemId, 'onPress');
    });

    it('Should navigate to WriterDetailScreen when the user clicks author', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'2'});
    });

    it('Should navigate to WriterDetailScreen when the user clicks author name', () => {
        const testItemId = instance.getByTestId('AutherItemLabel1');
        fireEvent(testItemId, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'2'});
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
    const prevPlayBackState = jest.fn();
    const mediaData = jest.fn();
    const timeDuration = jest.fn()

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
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
        (useState as jest.Mock).mockImplementation(() => [false, prevPlayBackState]);
        (useState as jest.Mock).mockImplementation(() => [100, timeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem index={0} showInMainScreen={false} togglePlayback={mockFunction} selectedType={'yes'} selectedTrack={'2opinion'} {...data} mediaVisibility={true} nid = "1opinion" renderLabelsOrder = {['authorName','title','default']} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should not navigate to WriterDetailScreen when the author is clicked', () => {
        const testItemId = instance.getByTestId('AutherItemTO3');
        fireEvent(testItemId, 'onPress');
        expect(navigation.navigate).not.toHaveBeenCalled();
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
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12',
                    duration: 336,
                    sources: [
                        {
                            file: 'file'
                        }
                    ]
                },
                {
                    name: 'abc',
                    id: '13',
                    duration: 336,
                    sources: [
                        {
                            file: 'file1'
                        }
                    ]
                },
            ],
            title: 'abc'
        }, mediaData]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '4opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem showInMainScreen = {true} nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should display MainScreen Author UI",() => {
        expect(instance.queryByTestId('MainScreenAuthorId')).not.toBeNull();
    })

    it("should navigate to OpinionArticleDetailScreen when the user clicks the author name",() => {
        const authorId = instance.getByTestId('authorId');
        fireEvent.press(authorId);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN,{nid:'2'});
    });

    it('Should navigate to WriterDetailScreen if the user clicks author image', () => {
        const testItemId = instance.getByTestId('mainScreenAuthorItemId');
        fireEvent.press(testItemId);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'2'});
    });

    it('Should navigate to WriterDetailScreen if the user clicks author title', () => {
        const testItemId = instance.getByTestId('mainScreenAuthorLabelId');
        fireEvent.press(testItemId);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.WRITERS_DETAIL_SCREEN,{tid:'2'});
    });

    it('Should click play icon in MainScreen', () => {
        const testItemId = instance.getByTestId('mainScreenMediaId');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
    });

    it("test fetchNarratedOpinionArticleApi return response", async () => {
        const response = await fetchNarratedOpinionArticleApi({ jwPlayerID: '2' });
        expect(response).toEqual({playList:{duration:'duration'}});
    })
})

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data = {
        author: 'عادل درويش',
        duration: '3:22',
        image: 'https://picsum.photos/200/300'
    }
    const mockFunction = jest.fn();
    const navigation = {
        goBack: mockFunction,
        navigate: mockFunction,
    }
    const mediaData = jest.fn();
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        DeviceTypeUtilsMock.isIOS = true;
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12',
                    sources: []
                },
                {
                    name: 'abc',
                    id: '13',
                    sources: []
                },
            ],
        }, mediaData]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: null,
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem showInMainScreen = {true} nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should click play icon in MainScreen', () => {
        const testItemId = instance.getByTestId('mainScreenMediaId');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
    });

})

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data = {
        author: 'عادل درويش',
        duration: '3:22',
        image: 'https://picsum.photos/200/300'
    }
    const mockFunction = jest.fn();
    const navigation = {
        goBack: mockFunction,
        navigate: mockFunction,
    }
    const mediaData = jest.fn();
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12',
                    sources: []
                },
                {
                    name: 'abc',
                    id: '13',
                    sources: []
                },
            ],
        }, mediaData]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: true,
            isPlaying: false,
            selectedTrack: { id: '2opinion'},
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem showInMainScreen = {true} nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should click play icon in MainScreen', () => {
        const testItemId = instance.getByTestId('mainScreenMediaId');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
    });

})

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data = {
        author: 'عادل درويش',
        duration: '3:22',
        image: 'https://picsum.photos/200/300'
    }
    const mockFunction = jest.fn();
    const navigation = {
        goBack: mockFunction,
        navigate: mockFunction,
    }
    const mediaData = jest.fn();
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [],
        }, mediaData]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: true,
            isPlaying: false,
            selectedTrack: { id: '2opinion'},
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem showInMainScreen = {true} nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should click play icon in MainScreen', () => {
        const testItemId = instance.getByTestId('mainScreenMediaId');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
    });

})

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data = {
        author: 'عادل درويش',
        duration: '3:22',
        image: 'https://picsum.photos/200/300'
    }
    const mockFunction = jest.fn();
    const navigation = {
        goBack: mockFunction,
        navigate: mockFunction,
    }
    const mediaData = jest.fn();
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [{
            playlist: [
                {
                    name: 'abc',
                    id: '12',
                    sources: []
                },
                {
                    name: 'abc',
                    id: '13',
                    sources: []
                },
            ],
        }, mediaData]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem showInMainScreen = {true} nid='2' jwPlayerID='2' index={0} togglePlayback={mockFunction} authorId={'2'} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should click play icon in MainScreen', () => {
        const testItemId = instance.getByTestId('mainScreenMediaId');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
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
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
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
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });
        const component = <AuthorItem showDivider={true} showInMainScreen = {true} jwPlayerID='2' index={0} togglePlayback={mockFunction} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should not navigate to OpinionArticleDetailScreen when the user clicks the author name if the nid is empty",() => {
        const authorId = instance.getByTestId('authorId');
        fireEvent.press(authorId);
        expect(navigation.navigate).not.toHaveBeenCalled();
    });

    it('Should not navigate to WriterDetailScreen if the user clicks author image when the authorId is empty', () => {
        const testItemId = instance.getByTestId('mainScreenAuthorItemId');
        fireEvent.press(testItemId);
        expect(navigation.navigate).not.toHaveBeenCalled();
    });


    it('Should not navigate to WriterDetailScreen if the user clicks author title when the authorId is empty', () => {
        const testItemId = instance.getByTestId('mainScreenAuthorLabelId');
        fireEvent.press(testItemId);
        expect(navigation.navigate).not.toHaveBeenCalled();
    });

    it("should display Divider",() => {
        const element = instance.container.findByType(Divider);
        expect(element).not.toBeNull();
    })
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
    const timeDuration = jest.fn()
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => ['15:30', timeDuration]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });

    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should display time duration in MainSectionScreen",() => {
        const component = <AuthorItem showDivider={true} showInMainScreen = {true} jwPlayerID='2' index={0} togglePlayback={mockFunction} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component);
        const mainScreenTimeDuration = instance.getByTestId('mainScreenTimeDuration');
        expect(mainScreenTimeDuration).not.toBeNull();
        expect(mainScreenTimeDuration.props.children).toBe('15:30')
    });

    it("should display time duration",() => {
        const component = <AuthorItem showDivider={true} showInMainScreen = {false} jwPlayerID='2' index={0} togglePlayback={mockFunction} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component);
        const authorTimeDuration = instance.getByTestId('authorTimeDuration');
        expect(authorTimeDuration).not.toBeNull();
        expect(authorTimeDuration.props.children).toBe('15:30')
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
    const isBuffering = jest.fn()
    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchNarratedOpinionArticleApi as jest.Mock).mockImplementation(fetchNarratedOpinionArticleApiMock);
        (fetchNarratedOpinionArticleApiMock).mockReturnValue({playList:{duration:'duration'}});
        (useState as jest.Mock).mockImplementation(() => [false, isBuffering]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
            showControls: false,
            setControlState: setControlStateMock,
            setShowMiniPlayer: setShowMiniPlayerMock,
            setPlay: setPlayMock,
            setPlayerTrack: setPlayerTrackMock,
        });

    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it("should clicks play icon in MainScreen",() => {
        const component = <AuthorItem showDivider={true} showInMainScreen = {true} jwPlayerID='2' index={0} togglePlayback={mockFunction} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component);
        const testItemId = instance.getByTestId('mainScreenMediaId');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
    });

    it("should clicks play icon in OpinionScreen",() => {
        const component = <AuthorItem showDivider={true} showInMainScreen = {false} jwPlayerID='2' index={0} togglePlayback={mockFunction} selectedType={'yes'} selectedTrack={'abc'} {...data} mediaVisibility={true} />
        instance = render(component);
        const testItemId = instance.getByTestId('AutherItemTO2');
        fireEvent.press(testItemId);
        expect(getSvgImages).toHaveBeenCalled();
    });
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
    const prevPlayBackState = jest.fn();

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();
    const fetchNarratedOpinionArticleApiMock = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
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
        (useState as jest.Mock).mockImplementation(() => [true, prevPlayBackState]);
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
        useAppPlayerMock.mockReturnValue({
            showMiniPlayer: false,
            isPlaying: false,
            selectedTrack: { id: '2opinion' },
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
