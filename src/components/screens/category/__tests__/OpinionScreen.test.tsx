import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { OpinionScreen } from '../OpinionScreen'
import { FlatList } from 'react-native';

jest.mock("src/hooks/useOpinionWriter", () => ({
    useOpinionWriter: () => {
        return {
            isLoading: true,
            opinionWriterData: [],
            relatedArticleData: [],
            opinionWriterError: '',
            fetchOpinionWriterRequest: () => {
                return []
            },
        }
    },
}));

jest.mock("src/hooks/useOpinions", () => ({
    useOpinions: () => {
        return {
            isLoading: true,
            opinionsData: [],
            opinionsError: '',
            writerOpinionsData: [],
            isWriterOpinionLoading: true,
            writerOpinionsError: '',
            fetchOpinionsRequest: () => {
                return []
            },
            fetchWriterOpinionsRequest: () => {
                return []
            },
            emptyWriterOpinionData: () => {
                return
            },
            emptyOpinionsData: () => {
                return
            },
        }
    },
}));

describe('<OpinionScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component = <OpinionScreen tabIndex={0} currentIndex={0}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render OpinionScreen', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

})