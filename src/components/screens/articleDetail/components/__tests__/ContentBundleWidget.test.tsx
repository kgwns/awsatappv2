import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ContentBundleWidget} from 'src/components/screens/articleDetail/components/ContentBundleWidget';
import { storeSampleData } from 'src/constants/SampleData';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

jest.mock("src/hooks/useArticleDetail", () => ({
    useArticleDetail: () => {
      return {
        emptyAllData: () => [],
      }
    },
}));

describe('<ContentBundleWidget>', () => {
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
                <ContentBundleWidget title={''} data={{
                    title: 'asd',
                    body: 'as',
                    nid: '2',
                    image: 'qwesd'
                }} />
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

    it('Should render component', () => {
        expect(render(<Provider store={storeSampleData}>
            <ContentBundleWidget title={'abc'} data={{
                title: 'abc',
                body: 'abc',
                nid: '12',
                image: 'abc.png'
            }}/>
        </Provider>)).toBeDefined()
    })

    it('Should render component', () => {
        expect(render(<Provider store={storeSampleData}>
            <ContentBundleWidget title={'abc'}/>
        </Provider>)).toBeDefined()
    })

    it('When ListenToArticleCardTO1 is pressed', () => {
        const testItemId = instance.getByTestId('ContentBundleWidgetTO1');
        fireEvent(testItemId, 'onPress', {nid: '2', hasHTMLContent: true});
        expect(navigation.push).toBeTruthy();
    });
})