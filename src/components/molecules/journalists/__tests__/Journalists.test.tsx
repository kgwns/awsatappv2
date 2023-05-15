import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { Journalist } from 'src/components/molecules/journalists/Journalists'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { requestJournalistDetail } from 'src/services/articleDetailService';
import { ScreensConstants } from 'src/constants/Constants';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
}));

jest.mock('src/services/articleDetailService', () => ({
  requestJournalistDetail: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
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

    jest.useFakeTimers({
      legacyFakeTimers: true
    });
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
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined()
  })

  it('When tap on journalist', () => {
    const listButton = instance.container.findByType(TouchableOpacity);
    fireEvent(listButton, 'onPress');
    expect(navigation.push).toHaveBeenCalled();
    expect(navigation.push).toHaveBeenCalledWith(ScreensConstants.JOURNALIST_DETAIL_SCREEN,{isRelatedArticle: true, tid: '106611'});
  });
})

describe('<Journalist />', () => {

  let instance: RenderAPI
  const mockFunction = jest.fn();

  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,

  }
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    DeviceTypeUtilsMock.isTab = true;
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (requestJournalistDetail as jest.Mock).mockImplementation(() =>Promise.resolve({rows:[{not_clickable: '1'}]}));
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component in Tab', () => {
    const component = <Journalist
    journalistId={[]}
    journalistName={["«الشرق الأوسط»"]}
    journalistCity={["بغداد"]} />
    instance = render(component)
    expect(instance.queryByTestId('containerId')).toBeNull();
  })

  it('should display separator',() => {
    const component = <Journalist
    journalistId={['102212','347282']}
    journalistName={["«الشرق الأوسط»"]}
    journalistCity={["بغداد"]} />
    instance = render(component)
    const separatorId = instance.getByTestId('separatorId');
    expect(separatorId).not.toBeNull();
  })
})
