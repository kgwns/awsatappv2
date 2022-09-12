import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { JournalistSection } from 'src/components/organisms/journalistSection/JournalistSection'
import { journalistData } from 'src/constants/SampleData'

describe('<Journalist Section />', () => {

  let instance: RenderAPI
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = <JournalistSection
      data={journalistData}
      isLoading={false}
      onScroll={mockFunction}
      onUpdateArticlesBookmark={mockFunction}
    />
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })
})
