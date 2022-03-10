import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { VideoPlayerScreen } from '../VideoPlayerScreen'


describe('<VideoPlayerScreen>', () => {
    let instance: RenderAPI
    const route = {
      params:{
        videoUrl: 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4',
      },
    }

    beforeEach(() => {
        const component = <VideoPlayerScreen route={route} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayerScreen', () => {
        expect(instance).toBeDefined()
    })
})