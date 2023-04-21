import '@testing-library/jest-dom';
import React, { useRef, useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { ScreensConstants, myNewsTopTabData, storeSampleData } from '../../../../constants/Constants'
import { MyNewsScreen, MyNewsTabType } from '../MyNewsScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { CustomTabBarItem, SignupAlertCard } from 'src/components/molecules'
import { ArticlesListItemType } from 'src/redux/contentForYou/types'
import { useLogin } from 'src/hooks'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native';
import { Styles } from 'src/shared/styles';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

jest.mock('src/components/organisms/myNews/MyNewsWriters',() => ({MyNewsWriters:() => <></>}));
jest.mock('src/components/organisms/myTopics/MyNewsTopics',() => ({MyNewsTopics: () => <></>}));

jest.mock("react-native-tab-view", () => {
  const real = jest.requireActual("react-native-tab-view");
  return {
    ...real,
    TabView: ({ navigationState, renderTabBar,renderScene }:any) => (
      <>
        {renderTabBar({
          navigationState,
        })}

        {renderScene({
          route:{key:{match:jest.fn()},keyName:'media',child:{isSelected:false,findIndex:jest.fn()}},
        })}

        {renderScene({
          route:{key:{match:jest.fn()},keyName:'writers',child:{isSelected:false,findIndex:jest.fn()}},
        })}

        {renderScene({
          route:{key:{match:jest.fn()},keyName:'topics',child:{isSelected:false,findIndex:jest.fn()}},
        })}

        {renderScene({
          route:{key:{match:jest.fn()},child:{isSelected:false,findIndex:jest.fn()}},
        })}

      </>

    ),

    TabBar: ({ renderTabBarItem,renderIndicator }:any) => (
      <>
        {renderTabBarItem({
          key:'key',route:{title:'كتابي'},navigationState:{index:0}
        })}
        {renderTabBarItem({
          key:'key1',route:{title:'مواضيعي'},navigationState:{index:0}
        })}
        {renderTabBarItem({
          key:'key2',route:{title:'مواضيعي'},navigationState:{index:2}
        })}
        {renderTabBarItem({
          key:'key3',route:{title:'كتابي'},navigationState:{index:0}
        })}
        {renderIndicator()}

      </>

    ),
  };
});

jest.mock('src/hooks/useLogin', () => ({ useLogin: jest.fn() }));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: jest.fn()
}));

const sampleData: ArticlesListItemType[] = [
  {
    nid: '1',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    view_node: 'abc',
    field_news_categories_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  },
  {
    nid: '2',
    title: 'example',
    body: 'abc',
    field_image: 'abc',
    view_node: 'abc',
    field_news_categories_export: [
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      }
    ],
    field_publication_date_export: '2021-05-20T20:05:45+0000',
    created_export: '2021-05-20T20:05:45+0000',
    author_resource: 'author',
    type: 'type',
    field_new_photo: 'abc'
  }
];

jest.mock("src/hooks/useContentForYou", () => ({
  useContentForYou: () => {
    return {
      isLoading: false,
      favouriteOpinionsData: [],
      error: 'error',
      fetchFavouriteOpinionsRequest: () => {
        return []
      },
      isArticleLoading: false,
      favouriteArticlesData: sampleData,
      articleError: 'error',
      fetchFavouriteArticlesRequest: () => {
        return []
      },
      emptyAllData: () => {
        return
      },
    }
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn()
}));

const data = [
  {
    keyName: MyNewsTabType.media,
  },
  {
    keyName: MyNewsTabType.writers,
  },
  {
    keyName: MyNewsTabType.topics,
  },
];

describe('<MyNewsScreen> when the user is not Logged in', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();

  const index = mockFunction;
  const routes = mockFunction;
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    (useState as jest.Mock).mockImplementation(() => [0, index]);
    (useState as jest.Mock).mockImplementation(() => [data, routes]);
    (useRef as jest.Mock).mockReturnValue({current:true});
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should render component in IOS', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined()
  })

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call SignupAlertCard onPress', () => {
    const element = instance.container.findByType(SignupAlertCard)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
    expect(navigation.reset).toHaveBeenCalled();
    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
    expect(instance.queryByTestId('signUpAlertContainerID')).not.toBeNull();
  });
})

describe('<MyNewsScreen> when the user is Logged in', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const setState = jest.fn();
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, setState]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    DeviceTypeUtilsMock.isIOS = true;
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })
  
  it("should call CustomTabBarItem[0] onPress, render with MyTopics as Tab Title",() => {
    const element = instance.container.findAllByType(CustomTabBarItem)[0];
    fireEvent(element,'onPress');
    expect(element.props.tabName).toEqual(myNewsTopTabData[1].tabName);
  })

  it("should set scene Style when the device is in iOS and it is in Portrait mode",() => {
    const dimensionsSpy = jest.spyOn(Dimensions,'get').mockReturnValue({width:10,height:20,fontScale:3,scale:4});
    const testId = instance.getByTestId('tabContent');
    expect(testId.props.style).toStrictEqual({flex: 1});
    dimensionsSpy.mockClear();
  })
})

describe('<MyNewsScreen> when the user is Logged in Android', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const setState = jest.fn();
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, setState]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    DeviceTypeUtilsMock.isIOS = false;
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it("should set scene Style when the device is not in iOS and it is not in Portrait mode",() => {
    jest.spyOn(Dimensions,'get').mockReturnValue({width:30,height:20,fontScale:3,scale:4});
    const testId = instance.getByTestId('tabContent');
    expect(testId.props.style).toEqual({flex: 1});
  })
})

describe('<MyNewsScreen> when the user is Logged in iOS and in Landscape Mode', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const setState = jest.fn();
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, setState]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    DeviceTypeUtilsMock.isIOS = true;
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it("should set scene Style when the device is in iOS and it is not in Portrait mode",() => {
    jest.spyOn(Dimensions,'get').mockReturnValue({width:30,height:20,fontScale:3,scale:4});
    const testId = instance.getByTestId('tabContent');
    expect(testId.props.style).toEqual({flex: 1});
  })
})

describe('<MyNewsScreen> when the user is Logged in Android, in Portrait Mode', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const setState = jest.fn();
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, setState]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    DeviceTypeUtilsMock.isIOS = false;
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it("should set scene Style when the device is not in iOS and it is in Portrait mode",() => {
    jest.spyOn(Dimensions,'get').mockReturnValue({width:10,height:20,fontScale:3,scale:4});
    const testId = instance.getByTestId('tabContent');
    expect(testId.props.style).toEqual({flex: 1});
  })
})

describe('<MyNewsScreen> when the user is Logged in', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const setState = jest.fn();
  const useLoginMock = mockFunction;

  const navigation = {
    reset: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [data, setState]);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    DeviceTypeUtilsMock.isIOS = true;
    const component =
      <Provider store={storeSampleData}>
        <MyNewsScreen />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })
  
  it("should Display Topics and Writers tab",() => {
    const element = instance.getAllByTestId('tabNameId');
    expect(element[0].children[0]).toEqual(myNewsTopTabData[1].tabName);
    expect(element[1].children[0]).toEqual(myNewsTopTabData[0].tabName);
  });

  it("MyTopicsTab display in GreenishBlue when MyTopicsTab is clicked",() => {
    const element = instance.container.findAllByType(CustomTabBarItem)[2];
    fireEvent(element,'onPress');
    const testId = instance.getAllByTestId('tabNameId')[2];
    console.log(testId.props)
    expect(testId.props.style[0].color).toEqual(Styles.color.greenishBlue);
  })

  it("MyWritersTab display in GreenishBlue while MyWritersTab is clicked",() => {
    const element = instance.container.findAllByType(CustomTabBarItem)[0];
    fireEvent(element,'onPress');
    const testId = instance.getAllByTestId('tabNameId')[0];
    expect(testId.props.style[0].color).toEqual(Styles.color.greenishBlue);
  })

  it("By Default, MyWritersTab is displayed in GreenishBlue and MyTopicsTab is displayed in doveGray",() => {
    const myWritersTestId = instance.getAllByTestId('tabNameId')[0];
    expect(myWritersTestId.props.style[0].color).toEqual(Styles.color.greenishBlue);
    const myTopicsTestId = instance.getAllByTestId('tabNameId')[1];
    expect(myTopicsTestId.props.style[0].color).toEqual(Styles.color.doveGray);
  })

  it("Should display MyWriters Tab in doveGray while MyTopics Tab is selected",() => {
    const element = instance.container.findAllByType(CustomTabBarItem)[2];
    fireEvent(element,'onPress');
    const myTopicsTestId = instance.getAllByTestId('tabNameId')[2];
    expect(myTopicsTestId.props.style[0].color).toEqual(Styles.color.greenishBlue)
    const myWritersTestId = instance.getAllByTestId('tabNameId')[3];
    expect(myWritersTestId.props.style[0].color).toEqual(Styles.color.doveGray);
  })
})

