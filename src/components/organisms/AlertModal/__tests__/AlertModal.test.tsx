import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { AlertModal } from 'src/components/organisms/AlertModal/AlertModal'

describe('<AlertModal>', () => {
    let instance: RenderAPI
    beforeEach(() => {
        const component = <AlertModal 
        title= {'title'}
        message= {'message'}
        isVisible= {true}
        buttonText= {'Button'}
        onClose = {()=>{}}
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
})