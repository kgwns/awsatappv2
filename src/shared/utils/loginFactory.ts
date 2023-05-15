import SignInFaceBook from './SignInFacebook';
import SignInGoogle from './SigninGoogle'

export enum Connection {
  Facebook = 'Facebook',
  Google = 'Google',
}

export class LoginFactory {
    static getInstance(loginType: Connection, callback: Function) {
        switch (loginType) {
            case Connection.Facebook:
                return new SignInFaceBook(callback)
            case Connection.Google:
                return new SignInGoogle(callback)
            default:
                return null;
        }
    }
}
