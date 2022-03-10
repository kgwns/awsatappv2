import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { FavoriteScreen } from '../FavoriteScreen'
import { TabBarComponent } from 'src/components/molecules'

describe('<FavoriteScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component =
            <Provider store={storeSampleData}>
                <FavoriteScreen />
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
    
    //Removed since we commented the code
    xit('Check tab getting change when onClick', () => {
        const tabBar = instance.container.findByType(TabBarComponent)
        fireEvent(tabBar, 'onPressTabItem', 0)
        expect(tabBar).toBeTruthy()
    })
})