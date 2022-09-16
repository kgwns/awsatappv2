import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { DetailHeader } from '../DetailHeader'

describe('<DetailHeader />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = <DetailHeader
      visibleHome={true}
      onBackPress={mockFunction}
      onHomePress={mockFunction}
    />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should render DetailHeader', () => {
    expect(instance).toBeDefined();
  });

  it('Should render DetailHeader with visibleHome false', () => {
    expect(render(<DetailHeader
      onBackPress={mockFunction}
      onHomePress={mockFunction}
    />)).toBeDefined
  });

})