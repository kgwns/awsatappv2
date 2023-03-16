import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'

import { TextWithFlag } from 'src/components/atoms/textWithFlag/TextWithFlag'
import { sampleTextWithFlag } from '../../../../constants/Constants'

describe('<TextWithFlag>', () => {
  let instance: RenderAPI
  const data = sampleTextWithFlag

  beforeEach(() => {
    const component = (
      <TextWithFlag
        title={data.title} titleColor={data.titleColor}
        flag={data.flag} flagColor={data.flagColor}
        barColor={data.barColor} numberOfLines={2}
        labelType={data.labelType}
      />
    )
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
