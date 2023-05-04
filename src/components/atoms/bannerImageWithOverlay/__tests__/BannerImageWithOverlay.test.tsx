import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React, { useState } from 'react'
import { BannerImageWithOverlay } from '../BannerImageWithOverlay'
import { Image } from 'src/components/atoms/image/Image';
import { Overlay } from '../../overlay/Overlay';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));

describe('<BannerImageWithOverlay />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const isError = jest.fn()

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [true, isError]);
    const component = <BannerImageWithOverlay image={'abc.png'} onImageLoadEnd={mockFunction} isImageLoaded={true} showOverlay={true}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should call onError when the image load fails', () => {
    const element = instance.container.findAllByType(Image)[0];
    fireEvent(element, 'onError');
  });
})

describe('<BannerImageWithOverlay />', () => {
  const mockFunction = jest.fn();
  const isError = jest.fn()

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [false, isError]);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should not display Photo Icon, when the type is not photoGallery",() => {
    const { queryByTestId } = render(
      <BannerImageWithOverlay image={'abc.png'} onImageLoadEnd={mockFunction} isImageLoaded={false} showOverlay={false}/>
    )
    expect(queryByTestId('photoIconId')).toBeNull();
  })

  it("should display Photo Icon, when the type is photoGallery",() => {
    const { queryByTestId } = render(
      <BannerImageWithOverlay image={'abc.png'} isAlbum = {true} onImageLoadEnd={mockFunction} isImageLoaded={false} showOverlay={false}/>
    )
    expect(queryByTestId('photoIconId')).not.toBeNull();
  })

  it("should render DisplayType Label",() => {
    const { queryByTestId } = render(
      <BannerImageWithOverlay image={'abc.png'} displayType={'special'} isAlbum = {true} onImageLoadEnd={mockFunction} isImageLoaded={false} showOverlay={false}/>
    )
    expect(queryByTestId('labelId')).not.toBeNull();
  })

  it("should render Overlay container",() => {
    const { container } = render(
      <BannerImageWithOverlay image={'abc.png'} displayType={'special'} isAlbum = {true} onImageLoadEnd={mockFunction} isImageLoaded={true} showOverlay={true}/>
    )
    expect(container.findByType(Overlay)).not.toBeNull();
  })

  it('Should call onImageLoadEnd props when the image loads', () => {
    const { container } = render(
      <BannerImageWithOverlay image={'abc.png'} displayType={'special'} isAlbum = {true} onImageLoadEnd={mockFunction} isImageLoaded={true} showOverlay={true}/>
    )
    const element = container.findAllByType(Image)[0];
    fireEvent(element, 'onLoadEnd');
    expect(mockFunction).toHaveBeenCalled();
  });

  it('Should call onError when the image load fails', () => {
    const { container } = render(
      <BannerImageWithOverlay image={'abc.png'} displayType={'special'} isAlbum = {true} onImageLoadEnd={mockFunction} isImageLoaded={true} showOverlay={true}/>
    )
    const element = container.findAllByType(Image)[0];
    fireEvent(element, 'onError');
  });

})
