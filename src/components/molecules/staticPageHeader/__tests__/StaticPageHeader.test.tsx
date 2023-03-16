import { useNavigation } from '@react-navigation/native';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import { ButtonIconWithLabel } from 'src/components/atoms/buttonIconWithLabel/ButtonIconWithLabel';
import {StaticPageHeader} from 'src/components/molecules/staticPageHeader/StaticPageHeader'

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

const navigation = {
    goBack: jest.fn(),
  }

describe('<StaticPageHeader />', () => {
  let instance: RenderAPI
  
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <StaticPageHeader title={''} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  it('When Press onPress', () => {
    const testID = instance.container.findAllByType(ButtonIconWithLabel)[0];
    fireEvent(testID, 'onPress')
    expect(navigation.goBack).toHaveBeenCalled;
  });
  
})