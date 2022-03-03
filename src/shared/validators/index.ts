import i18next from 'i18next';

export const emailValidation = (email: string): string => {
  const regex = /^[\w!#$%&*+./=?^`{|}~’-]+@[\dA-Za-z-]+\.[\dA-Za-z-]+$/;

  if (email === '') {
    return i18next.t('validation.emailEmpty');
  }
  if (!regex.test(email)) {
    return i18next.t('validation.emailNotValid');
  }
  return '';
};

export const loginPasswordValidation = (password: string): string => {
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  else if (password.length < 7) {
    return i18next.t('validation.passwordStrength');
  }
  return '';
};

export const reTypePasswordValidation = (
  password: string,
  reTypePassword: string,
): string => {
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  else if (password.length < 7) {
    return i18next.t('validation.passwordStrength');
  }
  if (password !== reTypePassword) {
    return i18next.t('validation.passwordNotMatch');
  }
  return '';
};

