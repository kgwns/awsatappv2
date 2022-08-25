import {appleAuth} from '@invertase/react-native-apple-authentication';
const user: any = null;

export const appleSignin = async () => {
  console.log('Beginning Apple Authentication');
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  console.log('check response appleSignin: - ', appleAuthRequestResponse);
  return appleAuthRequestResponse;
};

