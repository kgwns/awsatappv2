import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { JournalistSection } from 'src/components/organisms/journalistSection/JournalistSection'
import { journalistData } from 'src/constants/Constants'
import { ArticleItem } from 'src/components/molecules'

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

describe('<Journalist Section /> when device is a Tablet', () => {

  let instance: RenderAPI
  const mockFunction = jest.fn();
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true
    const component = <JournalistSection
      data={journalistData}
      isLoading={true}
      onScroll={mockFunction}
      onUpdateArticlesBookmark={mockFunction}
    />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component',() => {
    expect(instance).toBeDefined();
  })

  it('should check onpress function in ArticleItem', () => {
    const element = instance.container.findAllByType(ArticleItem)[0];
    fireEvent(element,'onPressBookmark');
    expect(mockFunction).toHaveBeenCalled();
  })
})

describe('<Journalist Section /> renders when device is not a Tab', () => {

  let instance: RenderAPI
  const mockFunction = jest.fn();
  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false
    const component = <JournalistSection
      data={journalistData}
      isLoading={true}
      onScroll={mockFunction}
      onUpdateArticlesBookmark={mockFunction}
    />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component',() => {
    expect(instance).toBeDefined();
  })

  it('should check onpress function in ArticleItem', () => {
    const element = instance.container.findAllByType(ArticleItem)[0];
    fireEvent(element,'onPressBookmark');
    expect(mockFunction).toHaveBeenCalled();
  })
})

