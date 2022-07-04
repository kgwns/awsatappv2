import React, {FunctionComponent} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {loadingStateStyle} from 'src/components/atoms/loading/LoadingState.style';
import {Styles} from 'src/shared/styles';

export const LoadingState: FunctionComponent = () => {
  return (
    <View testID={'loading'} style={loadingStateStyle.container}>
        <ActivityIndicator
          testID={'activityIndicator'}
          size={'large'}
          color={Styles.color.greenishBlue}
        />
      </View>
  );
};
