import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { ScreenContainer } from '../ScreenContainer'

describe('<Screen Container>', () => {
    let instance: RenderAPI
    const screenComponent = <></>

    beforeEach(() => {
        const component = <ScreenContainer children={screenComponent} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
})