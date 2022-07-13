import { requestUserPermission } from '../FirebaseUtil';

jest.mock('@react-native-firebase/messaging', () => {
  return jest.fn().mockReturnValue({
    getToken: jest.fn().mockResolvedValue(''),
    requestPermission: jest.fn().mockResolvedValue(true),
    AuthorizationStatus: jest.fn().mockResolvedValue('PROVISIONAL' || 'AUTHORIZED'),
  });
});

describe('<App>', () => {
  describe('when App only', () => {
    it('Should render App', () => {
      expect(requestUserPermission).toBeTruthy();
    });
  });
});
