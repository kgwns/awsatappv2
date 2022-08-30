import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  ArticleDetailVideo from '../ArticleDetailVideo'

describe('<ArticleDetailVideo />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <ArticleDetailVideo paused={false} mediaId={'2'} currentTime={'10:00:56'} playerVisible={true} isFullScreen={true}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
})

