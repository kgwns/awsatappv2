import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { AlertModal } from 'src/components/organisms/AlertModal/AlertModal'

describe('<AlertModal>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();

    beforeEach(() => {
        const component = <AlertModal 
        title= {'title'}
        message= {'message'}
        isVisible= {true}
        buttonText= {'Button'}
        onClose = {()=>{}}
        onPressSuccess={mockFunction}
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

    it('When AlertModalTO1 is pressed', () => {
        const testItemId = instance.getByTestId('AlertModalTO1');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });

    it('When AlertModalTO2 is pressed', () => {
        const testItemId = instance.getByTestId('AlertModalTO2');
        fireEvent(testItemId, 'onPress');
        expect(mockFunction).toBeTruthy();
    });
      
})