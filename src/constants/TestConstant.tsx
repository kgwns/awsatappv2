import { FC } from 'react';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';

export const ScreenTestId = {
  dmaFeedback: {
    commentLabel: 'feed-back-comment-label',
  },
  dmaDeleteAccount: {
    typeDeleteLabel: 'type-delete-label',
    description: 'description-label',
  },
};

type MockProviderWrapperType = {
  children: JSX.Element;
};

export const MockProviderWrapper: FC<MockProviderWrapperType> = ({
  children,
}) => <Provider store={storeSampleData} children={children}></Provider>;
