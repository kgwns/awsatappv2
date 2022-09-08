import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React, { useState } from 'react'
import { BannerImageWithOverlay } from '../BannerImageWithOverlay'
import { Image } from 'src/components/atoms/image/Image';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<BannerImageWithOverlay />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const isError = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [true, isError]);
    const component = <BannerImageWithOverlay image={'abc.png'} onImageLoadEnd={mockFunction} isImageLoaded={true} showOverlay={true}/>
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

describe('<BannerImageWithOverlay />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const isError = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, isError]);
    const component = <BannerImageWithOverlay image={'abc.png'} onImageLoadEnd={mockFunction} isImageLoaded={false} showOverlay={false}/>
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
