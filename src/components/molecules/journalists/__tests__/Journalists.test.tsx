import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { Journalist } from 'src/components/molecules/journalists/Journalists'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { requestJournalistDetail } from 'src/services/articleDetailService';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
}));

jest.mock('src/services/articleDetailService', () => ({
  requestJournalistDetail: jest.fn(),
}));


describe('<Journalist />', () => {

  let instance: RenderAPI
  const mockFunction = jest.fn();

  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,

  }
  beforeEach(() => {

    jest.useFakeTimers('legacy');
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (requestJournalistDetail as jest.Mock).mockImplementation(() =>Promise.resolve({rows:[{not_clickable: '1'}]}));
    const component = <Journalist
      journalistId={['106611']}
      journalistName={["«الشرق الأوسط»"]}
      journalistCity={["بغداد"]} />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  it('When tap on journalist', () => {
    const listButton = instance.container.findByType(TouchableOpacity);
    fireEvent(listButton, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });
})
