import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { AuthorItem } from '..'
import { ButtonImage } from '../../atoms'

describe('<Author Item>', () => {
    let instance: RenderAPI
    const data =   {
        author: 'عادل درويش',
        description: 'الصحافة بين الخصوصية والصالح العام',
        duration: '3:22',
        image: 'https://picsum.photos/200/300'
    }

    beforeEach(() => {
        const component = <AuthorItem  {...data}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render the component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(ButtonImage)
        fireEvent.press(element)
    })

})