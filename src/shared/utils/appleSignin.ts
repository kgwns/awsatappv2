import {appleAuth} from '@invertase/react-native-apple-authentication';
let user: any = null;

export const appleSignin = async () => {
  console.log('Beginning Apple Authentication');
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  console.log('check response appleSignin: - ', appleAuthRequestResponse);
  return appleAuthRequestResponse;
  const {
    user: newUser,
    email,
    nonce,
    identityToken,
    realUserStatus /* etc */,
  } = appleAuthRequestResponse;

  console.log(`appleSignin user :- `, newUser);
  console.log(`appleSignin email :- `, email);
};

