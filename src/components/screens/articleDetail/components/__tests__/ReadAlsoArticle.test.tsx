import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ReadAlsoArticle, ReadAlsoDataType} from 'src/components/screens/articleDetail/components/ReadAlsoArticle';
import { storeSampleData } from 'src/constants/Constants';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

const data: ReadAlsoDataType[] = 
[
    { 
        title: 'example1',
        nid: '1',
    },
    { 
        title: 'example2',
        nid: '2',
    },
    { 
        title: 'example3',
        nid: '3',
    },
]


const data1 = 
[
    { 
        title: 'example1',
    },
    { 
        title: 'example2',
    },
    { 
        title: 'example3',
    },
]

describe('<ReadAlsoArticle>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        push: mockFunction,
        navigate: mockFunction,
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = 
            <Provider store={storeSampleData}>
                <ReadAlsoArticle title={'example'} data={data}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When MenuButton Press', () => {
        const listButton = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(listButton, 'onPress', data[0]);
        expect(navigation.push).toHaveBeenCalled;
    });
    
})

describe('<ReadAlsoArticle>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        push: mockFunction,
        navigate: mockFunction,
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = 
            <Provider store={storeSampleData}>
                <ReadAlsoArticle title={'example'} data={data1}/>
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })

    it('When MenuButton Press', () => {
        const listButton = instance.container.findAllByType(TouchableOpacity)[0];
        fireEvent(listButton, 'onPress', data1[0]);
        expect(navigation.push).toHaveBeenCalled;
    });
    
})