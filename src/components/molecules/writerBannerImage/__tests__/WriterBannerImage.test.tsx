import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import  {WriterBannerImage} from '../WriterBannerImage'

describe('<WriterBannerImage />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const authorName = 'authorName';
  const authorDescription = 'authorDescription';
  const data = {
    authorImage: 'abc.com',
    authorName: authorName,
    authorDescription: authorDescription,
    facebook_url: 'abc.com',
    twitter_url: 'abc.com',
    instagram_url: 'abc.com'
  }
  beforeEach(() => {
    const component = <WriterBannerImage 
      data={data}
      onPressReturn={mockFunction}
      isFollowed={false}
      onPressFollow={mockFunction} 
      onPressHome={mockFunction}   
      hideBackArrow={true} 
    />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  }); 
  it('when playVideo is pressed', () => {
    const testID = instance.getByTestId('touchableImage');
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });
  it('when playVideo is pressed', () => {
    const testID = instance.getByTestId('touchableLabel');
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });
})