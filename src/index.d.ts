declare module '*.png' {
  export default content as number;
}
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-stories-view';

declare module 'react-native-video';