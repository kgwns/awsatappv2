import React from 'react';
import { fireEvent, render, RenderAPI } from "@testing-library/react-native"
import { FilterComponent, FilterDataType } from "src/components/molecules/filterComponent/FilterComponent"
import { TouchableOpacity } from 'react-native';

describe('< Filter Component >', () => {
    let instance: RenderAPI

    const data: FilterDataType[] = [
        {
            name: 'filter_one',
            isSelected: true,
            isVisible: true,
            child: [
                {
                    name: 'abc',
                    isSelected: true
                }
            ]
        },
        {
            name: 'filter_two',
            isSelected: false,
            isVisible: true,
            child: [
                {
                    name: 'abc',
                    isSelected: false
                }
            ]
        }
    ]
    const mockFunction = jest.fn()

    beforeEach(() => {
        const component = <FilterComponent data={data} onPress={mockFunction} onPressSubChild={mockFunction}/>
        instance = render(component)
    })

    it('should render the component', () => {
        expect(instance).toBeDefined()
    })

    it('When MenuButton Press', () => {
        const listButton = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(listButton, 'onPress', 2);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should press childitem', () =>{
        const testItemId = instance.getByTestId('renderSubChild');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toHaveBeenCalled();
    })
})