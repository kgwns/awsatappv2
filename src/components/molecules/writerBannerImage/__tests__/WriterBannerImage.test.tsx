import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import  {WriterBannerImage} from '../WriterBannerImage'

describe('<WriterBannerImage />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const authorName = 'authorName';
  const authorDescription = 'authorDescription';
  beforeEach(() => {
    const component = <WriterBannerImage data={{
        authorImage: '',
        authorName: authorName,
        authorDescription: authorDescription,
        facebook_url: '',
        twitter_url: '',
        instagram_url: ''
    }} 
    onPressReturn={mockFunction} 
    isFollowed={false} 
    onPressFollow={mockFunction}
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
  it('When Press closeIcon', () => {
    const testID = instance.container.findByType(TouchableOpacity);
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
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