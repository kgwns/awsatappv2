import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {DownloadNews} from 'src/components/screens/downloadNews/DownloadNews.android'

describe('<DownloadNews />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <DownloadNews/>
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