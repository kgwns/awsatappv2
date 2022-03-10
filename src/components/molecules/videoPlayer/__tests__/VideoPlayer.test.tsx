import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { VideoPlayerComponent } from '../VideoPlayer';

describe('<VideoPlayer>', () => {
    let instance: RenderAPI

    beforeEach(() => {
      const component = <VideoPlayerComponent url='https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4'  />
      instance = render(component)
      jest.useFakeTimers();
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayer', () => {
        expect(instance).toBeDefined()
    })
})