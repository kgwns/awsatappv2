import { RenderAPI,render } from '@testing-library/react-native'
import React from 'react'
import { FavoriteVideo } from '../favoriteVideo'

describe('<Favorite Video Component >', () => {
    let instance: RenderAPI
    beforeEach(() => {
       const component = <FavoriteVideo data={[]} />
       instance= render(component)
    })

    it('Should render the component', () => {
        expect(instance).toBeDefined()
    })
})