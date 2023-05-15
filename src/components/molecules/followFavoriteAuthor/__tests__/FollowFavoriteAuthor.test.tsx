import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import {FollowFavoriteAuthor} from 'src/components/molecules';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

jest.mock("react",() => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn().mockImplementation(() => [false,(temp) => (temp)])
  }
})
describe('<FollowFavoriteAuthor />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  jest.mock('react-native-color-matrix-image-filters', () => {
    return {
      Grayscale: jest.fn().mockImplementation(() => jest.fn())
    }
  })

  // Test Data
  const authorName = 'authorName';
  const authordescription = 'authorDescription';
  const authorImage = 'https://picsum.photos/200';
  const isSelected = false;
  const testID = 'FollowFavoriteAuthorTestId';

  beforeEach(() => {
    const component = (
      <FollowFavoriteAuthor
        authorName={authorName}
        authorDescription={authordescription}
        authorImage={authorImage}
        isSelected={isSelected}
        testId={testID}
        onPress={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render FollowFavoriteAuthor', () => {
    expect(instance).toBeDefined();
  });
  it('Should render FollowFavoriteAuthor in Tab', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });
  it('Should render FollowFavoriteAuthor in iOS', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined();
  });
  it('should label name is AuthorName', () => {
    expect(instance.container.props.authorName).toBe('authorName');
  });
  it('should label name is AuthorDescription', () => {
    expect(instance.container.props.authorDescription).toBe(
      'authorDescription',
    );
  });
  it('When FollowFavoriteAuthor is pressed', () => {
    const testItemId = instance.getByTestId('FollowFavoriteAuthorTestId');
    fireEvent(testItemId, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('<FollowFavoriteAuthor />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  // Test Data
  const authorName = 'authorName';
  const authordescription = 'authorDescription';
  const authorImage = 'https://picsum.photos/200';
  const isSelected = '';
  const testID = 'FollowFavoriteAuthorTestId';

  beforeEach(() => {
    const component = (
      <FollowFavoriteAuthor
        authorName={authorName}
        authorDescription={authordescription}
        authorImage={authorImage}
        isSelected={isSelected as any}
        testId={testID}
        onPress={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('When FollowFavoriteAuthor is pressed, called onPress with true', () => {
    const testItemId = instance.getByTestId('FollowFavoriteAuthorTestId');
    fireEvent(testItemId, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
    expect(instance.container.props.isSelected).toBe('');
    expect(mockFunction).toHaveBeenCalledWith(true)
  });

});

describe('<FollowFavoriteAuthor /> with isSelected as true', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  // Test Data
  const authorName = 'authorName';
  const authordescription = 'authorDescription';
  const authorImage = 'https://picsum.photos/200';
  const isSelected = true;
  const testID = 'FollowFavoriteAuthorTestId';

  beforeEach(() => {
    const component = (
      <FollowFavoriteAuthor
        authorName={authorName}
        authorDescription={authordescription}
        authorImage={authorImage}
        isSelected={isSelected}
        testId={testID}
        onPress={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render FollowFavoriteAuthor', () => {
    Platform.OS = 'android'
    DeviceTypeUtilsMock.isTab = false;
    expect(instance).toBeDefined();
  });

  it('Should render FollowFavoriteAuthor in Tab', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });

});

describe('<FollowFavoriteAuthor /> ', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setFallBack = jest.fn();

  // Test Data
  const authorName = 'authorName';
  const authordescription = 'authorDescription';
  const authorImage = 'https://picsum.photos/200';
  const isSelected = true;
  const testID = 'FollowFavoriteAuthorTestId';

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [true,setFallBack]);
    const component = (
      <FollowFavoriteAuthor
        authorName={authorName}
        authorDescription={authordescription}
        authorImage={authorImage}
        isSelected={isSelected}
        testId={testID}
        onPress={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should call setTimeout', () => {
    const spyon = jest.spyOn(global,'setTimeout');
    expect(spyon).toHaveBeenCalled();
    expect(spyon).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(setFallBack).toHaveBeenCalled();
  });

});