import React from 'react';
import { fireEvent, render, RenderAPI } from "@testing-library/react-native"
import { FilterComponent, FilterDataType } from "../FilterComponent"
import { TouchableOpacity } from 'react-native';

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

    it('When MenuButton Press', () => {
        const listButton = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(listButton, 'onPress', 2);
        expect(mockFunction).toHaveBeenCalled;
    });
})