import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { WidgetHeader } from 'src/components/atoms/widgetHeader/WidgetHeader'
import { authorHeaderData } from 'src/constants/Constants'

describe('<WidgetHeader>', () => {
    let instance: RenderAPI
    const data = authorHeaderData

    beforeEach(() => {
        const component = <WidgetHeader {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render the component', () => {
        expect(instance).toBeDefined()
    })
})