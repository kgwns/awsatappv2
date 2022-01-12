// /**
//  * @format
//  */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });
import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
// import {Provider} from 'react-redux';
// import {MockedStore} from 'src/data';
import App from '../../App';

describe('<App>', () => {
  let instance: RenderAPI;

  describe('when App only', () => {
    beforeEach(() => {
      const component = <App />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render App', () => {
      expect(instance).toBeDefined();
    });
  });
});
