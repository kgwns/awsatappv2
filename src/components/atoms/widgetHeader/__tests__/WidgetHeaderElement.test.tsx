import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { authorHeaderData } from '../../../../constants/Constants'
import { WidgetHeaderElement } from '../WidgetHeaderElement'
import { atomTestID } from '../../../../constants/Constants'

describe('<WidgetHeader Element>', () => {
    let instance: RenderAPI
    const data = authorHeaderData

    beforeEach(() => {
        const component = <WidgetHeaderElement {...data.headerRight} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render the component', () => {
        expect(instance).toBeDefined()
    })

    test('Should work onPress', () => {
        const element = instance.getByTestId(atomTestID.widgetHeaderButton)
        fireEvent.press(element)
        expect(element).toBeTruthy()
    })
})