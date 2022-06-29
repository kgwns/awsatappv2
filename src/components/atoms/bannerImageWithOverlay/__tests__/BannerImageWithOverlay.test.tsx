import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { BannerImageWithOverlay } from '../BannerImageWithOverlay'
import { Image } from 'src/components/atoms/image/Image';

describe('<BannerImageWithOverlay />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    const component = <BannerImageWithOverlay />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  it('Should Press PlayIcon', () => {
    const element = instance.container.findAllByType(Image)[0];
    fireEvent(element, 'onLoadEnd');
    expect(mockFunction).toHaveBeenCalled;
  });

  it('Should Press PlayIcon', () => {
    const element = instance.container.findAllByType(Image)[0];
    fireEvent(element, 'onError');
    expect(mockFunction).toHaveBeenCalled;
  });
})
