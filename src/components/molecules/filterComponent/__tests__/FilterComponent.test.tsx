import React from 'react';
import { render, RenderAPI } from "@testing-library/react-native"
import { FilterComponent, FilterDataType } from "../FilterComponent"

describe('< Filter Component >', () => {
    let instance: RenderAPI

    const data: FilterDataType[] = [
        {
            name: 'filter_one',
            isSelected: true
        },
        {
            name: 'filter_two',
            isSelected: false
        }
    ]
    const mockFunction = jest.fn()

    beforeEach(() => {
        const component = <FilterComponent data={data} onPress={mockFunction} />
        instance = render(component)
    })

    it('should render the component', () => {
        expect(instance).toBeDefined()
    })
})