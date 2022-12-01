import React from 'react'
import { fireEvent, render, RenderAPI } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { storeSampleData } from "src/constants/Constants"
import { ToggleWithLabel } from "../ToggleWithLabel"
import ToggleSwitch from 'toggle-switch-react-native'

describe('<Toggle With Label>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    beforeEach(() => {
        const component = <Provider store={storeSampleData}>
            <ToggleWithLabel title={""} 
            isActive={false} 
            onPress={mockFunction} 
        />
        </Provider>
        instance = render(component)
    })

    it('Check render method of Toggle with label', () => {
        expect(instance).toBeDefined()
    })

    it('Check call onPress toggle method', () => {
        const element = instance.container.findByType(ToggleSwitch)
        fireEvent(element, 'onToggle')
        expect(mockFunction).toBeCalled()
    })
})