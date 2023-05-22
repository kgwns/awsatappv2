import i18next from "i18next";
import { emailValidation, emptyPasswordValidation, loginPasswordValidation, reTypePasswordValidation } from "..";


describe('Validators', () => {

    test('email validation with correct email', () => {
        expect(emailValidation('awsat@awsat.com')).toBe('');
    });

    test('email validation with empty email', () => {
        expect(emailValidation('')).toBe(i18next.t('validation.emailEmpty'));
    });

    test('email validation with Invalid email', () => {
        expect(emailValidation('awsatawsat.com')).toBe(i18next.t('validation.emailNotValid'));
    });

    test('login password validation with correct password', () => {
        expect(loginPasswordValidation('#Awsat01')).toBe('');
    });

    test('login password validation with empty password', () => {
        expect(loginPasswordValidation('')).toBe(i18next.t('validation.passwordEmpty'));
    });

    test('login password validation with password length less that 5', () => {
        expect(loginPasswordValidation('#Aws')).toBe(i18next.t('validation.minLengthPassword'));
    });

    test('login password validation with password length less that 5', () => {
        expect(loginPasswordValidation('#Aw')).toBe(i18next.t('validation.minLengthPassword'));
    });

    test('empty password validation with empty password', () => {
        expect(emptyPasswordValidation('')).toBe(i18next.t('validation.passwordEmpty'))
    });

    test('empty password validation with password', () => {
        expect(emptyPasswordValidation('#Awsat01')).toBe('')
    });

    test('reType password validation with correct passwords', () => {
        expect(reTypePasswordValidation('#Awsat01', '#Awsat01')).toBe('');
    });

    test('reType password validation with password length less than 5', () => {
        expect(reTypePasswordValidation('#Aws', '#Awsat01')).toBe(i18next.t('validation.minLengthPassword'));
    });

    test('reType password validation with password not match with reType password', () => {
        expect(reTypePasswordValidation('#Awsat012', '#Awsat01')).toBe(i18next.t('validation.passwordNotMatch'));
    });

    test('reType password validation with empty passwords', () => {
        expect(reTypePasswordValidation('', '')).toBe(i18next.t('validation.passwordEmpty'));
    });

    test('reType password validation with password length less than 5', () => {
        expect(reTypePasswordValidation('#Aw', '#Awsat01')).toBe(i18next.t('validation.minLengthPassword'));
    });
})