import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { OpinionScreen } from '../OpinionScreen'

jest.mock("src/hooks/useOpinionWriter", () => ({
    useOpinionWriter: (...args: any) => {
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
    useOpinions: (...args: any) => {
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

    beforeEach(() => {
        const component = <OpinionScreen/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render OpinionScreen', () => {
        expect(instance).toBeDefined()
    })
})