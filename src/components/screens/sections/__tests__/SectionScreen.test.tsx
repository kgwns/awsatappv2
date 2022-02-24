import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { SectionsScreen } from '../SectionsScreen'
import { TabBarComponent } from 'src/components/molecules'
import { SectionStoryScreen, OpinionScreen, PodcastProgram } from 'src/components/screens';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));
describe('<SectionsScreen>', () => {
    let instance: RenderAPI
    const setTabSelectedIndex = jest.fn()
    // const tabContent = require('./tabContent');
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [0, setTabSelectedIndex]);
        const component = 
            <Provider store={storeSampleData}>
                <SectionsScreen />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
    test('Check tab getting change when onClick', () => {
        const tabBar = instance.container.findByType(TabBarComponent)
        fireEvent(tabBar, 'onPressTabItem', 0)
        expect(tabBar).toBeTruthy()
    })
    test('Check tab getting change when SectionStoryScreen', () => {
        const firstTab = instance.container.findByType(SectionStoryScreen)
        fireEvent(firstTab, 'onCalled', 0)
        expect(firstTab).toBeTruthy()
    })
    it('when onTextChange is called from SectionStoryScreen', () => {
        const sectionStoryId = instance.getByTestId('tabContent');
        expect(sectionStoryId).toBeTruthy
    });    
})