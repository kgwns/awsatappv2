import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage'
import { SocialMediaType } from 'src/navigation/CustomDrawerContent'
import  {WriterBannerImage} from 'src/components/molecules/writerBannerImage/WriterBannerImage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

jest.mock("react-native/Libraries/Linking/Linking", () => ({
	openURL: jest.fn(() => Promise.resolve("mockResolve")),
}))

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.reject('some error reason'))
}));

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
    const component = (
      <GestureHandlerRootView>
        <WriterBannerImage
          data={data}
          onPressReturn={mockFunction}
          isFollowed={false}
          onPressFollow={mockFunction}
          onPressHome={mockFunction}
          hideBackArrow={true}
          visibleHome={true}
        />
      </GestureHandlerRootView>
    )
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
  test('Should call button image onPress', () => {
    const element = instance.container.findAllByType(ButtonImage)[0];
    fireEvent(element, 'onPress', SocialMediaType.instagram, data.instagram_url);
    expect(mockFunction).toBeTruthy();
    expect(Linking.openURL(data.instagram_url)).toBeTruthy();
  })
  test('Should call button image onPress', () => {
    const element = instance.container.findAllByType(ButtonImage)[1];
    fireEvent(element, 'onPress', SocialMediaType.facebook, data.facebook_url);
    expect(mockFunction).toBeTruthy();
    expect(Linking.openURL(data.facebook_url)).toBeTruthy();
  })
  test('Should call button image onPress', () => {
    const element = instance.container.findAllByType(ButtonImage)[2];
    fireEvent(element, 'onPress', SocialMediaType.twitter, data.twitter_url);
    expect(mockFunction).toBeTruthy();
    expect(Linking.openURL(data.twitter_url)).toBeTruthy();
  })
  test('Should call TouchableOpacity onPress', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy();
  })
})