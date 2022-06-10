import i18next from 'i18next';

export const emailValidation = (email: string): string => {
  const regex = /^\w+([\.-]?\w+)*@[a-zA-Z_]+\.[a-zA-z]{2,4}$/;

  if (email === '') {
    return i18next.t('validation.emailEmpty');
  }
  if (!regex.test(email)) {
    return i18next.t('validation.emailNotValid');
  }
  return '';
};

export const loginPasswordValidation = (passwordText: string): string => {
  const password = passwordText.trim()
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  if (password.length < 5) {
    return i18next.t('validation.minLengthPassword');
  }
  return '';
};

export const emptyPasswordValidation = (password: string): string => { 
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  return '';
}

export const reTypePasswordValidation = (
  passwordText: string,
  reTypePassword: string,
): string => {
  const password = passwordText.trim()
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  if (password.length < 5) {
    return i18next.t('validation.minLengthPassword');
  }
  if (password !== reTypePassword) {
    return i18next.t('validation.passwordNotMatch');
  }
  return '';
};

export const oldPasswordValidation = (
  password: string,
): string => {
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  return '';
};

