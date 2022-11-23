import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ContentBundleWidget} from 'src/components/screens/articleDetail/components/ContentBundleWidget';
import { storeSampleData } from 'src/constants/Constants';
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

    it('When ListenToArticleCardTO1 is pressed', () => {
        const testItemId = instance.getByTestId('ContentBundleWidgetTO1');
        fireEvent(testItemId, 'onPress');
        expect(navigation.push).toBeTruthy();
    });
})

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
                <ContentBundleWidget title={'abc'} data={{
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

    it('When ListenToArticleCardTO1 is pressed', () => {
        const testItemId = instance.getByTestId('ContentBundleWidgetTO1');
        fireEvent(testItemId, 'onPress');
        expect(navigation.push).toBeTruthy();
    });
})

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
                <ContentBundleWidget title={'abc'} data={{
                    title: 'asd',
                    body: 'as',
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

    it('When ListenToArticleCardTO1 is pressed', () => {
        const testItemId = instance.getByTestId('ContentBundleWidgetTO1');
        fireEvent(testItemId, 'onPress');
        expect(navigation.push).toBeTruthy();
    });
})

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
                <ContentBundleWidget title={'abc'} />
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
})