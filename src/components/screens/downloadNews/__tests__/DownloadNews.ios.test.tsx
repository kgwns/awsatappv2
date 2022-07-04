import {render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {DownloadNewsIOS} from 'src/components/screens/downloadNews/DownloadNews.ios'

describe('<DownloadNews />', () => {
  let instance: RenderAPI
  beforeEach(() => {
    const component = <DownloadNewsIOS/>
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