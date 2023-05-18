import { useNavigation } from '@react-navigation/native';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SectionArticleItem from 'src/components/molecules/sectionArticleItem/SectionArticleItem';
import {moleculesTestID, ScreensConstants} from 'src/constants/Constants';
import { Image, Label, LabelTypeProp } from 'src/components/atoms';
import { isDarkTheme } from 'src/shared/utils';
import { Styles } from 'src/shared/styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock("src/shared/utils/utilities", () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
  isDarkTheme:jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

describe('<SectionArticleItem/>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mock';
  const navigation = {
    navigate: jest.fn()
  }
  const isDarkThemeMock = jest.fn();

  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
      isDarkThemeMock.mockReturnValueOnce(true).mockReturnValueOnce(false);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SectionVideoFooter', () => {
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      expect(instance).toBeDefined();
    });

    it('Should Press bookMark', () => {
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.getByTestId(moleculesTestID.storySaveBtn);
      fireEvent.press(element);
    });
    it('Should go Article Detail Screen when the user clicks article', () => {
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.getByTestId('onPressTestID');
      fireEvent.press(element);
      expect(navigation.navigate).toHaveBeenCalled();
      expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: '2'});
    });
    it('Should not go to Article Detail Screen when the nid is empty', () => {
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.getByTestId('onPressTestID');
      fireEvent.press(element);
      expect(navigation.navigate).not.toHaveBeenCalled();
    });
    it('Should display image in mobile', () => {
      DeviceTypeUtilsMock.isTab = false;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.container.findByType(Image);
      expect(element.props.url).toBe('imageUrl');
    });
    it('Should display title in h2 type in mobile', () => {
      DeviceTypeUtilsMock.isTab = false;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.container.findAllByType(Label)[0];
      expect(element.props.labelType).toBe(LabelTypeProp.h2);
    });
    it('Should display title in title4 type in tab', () => {
      DeviceTypeUtilsMock.isTab = true;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.container.findAllByType(Label)[0];
      expect(element.props.labelType).toBe(LabelTypeProp.title4);
    });
    it('Should display body in mobile', () => {
      DeviceTypeUtilsMock.isTab = false;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const bodyId = instance.getByTestId('bodyId');
      expect(bodyId).not.toBeNull();
      expect(bodyId.props.style[0].color).toEqual(Styles.color.doveGray)
    });
    it('Should not display body in tab', () => {
      DeviceTypeUtilsMock.isTab = true;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      expect(instance.queryByTestId('bodyId')).toBeNull();
    });
    it('should display vertical divider', () => {
      DeviceTypeUtilsMock.isTab = true;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} hideFooter = {false} leftTitle={'test'} rightTitle={'rightTitleTest'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.getByTestId('verticalDividerId');
      expect(element).not.toBeNull();
    });
    it('should display leftTitle and rightTitle', () => {
      DeviceTypeUtilsMock.isTab = false;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} hideFooter = {false} leftIcon={mockFunction} rightTitle={'rightTitleTest'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>
        </GestureHandlerRootView>
      )
      instance = render(component);
      const element = instance.getAllByTestId('titleID');
      expect(element).not.toBeNull();
    });
    it('should not display footer related things, when the footer is hidden', () => {
      DeviceTypeUtilsMock.isTab = false;
      const component = (
        <GestureHandlerRootView>
          <SectionArticleItem image = {'imageUrl'} hideFooter = {true} leftIcon={mockFunction} rightTitle={'rightTitleTest'} isBookmarked={true} onPressBookmark={mockFunction} body={mockString} nid={'2'} hideBookMark={false}/>;
        </GestureHandlerRootView>
      )
      instance = render(component);
      expect(instance.queryByTestId('footerContainerId')).toBeNull();
    });
  });
});
