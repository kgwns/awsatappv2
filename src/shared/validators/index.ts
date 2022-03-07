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
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;
  if (password === '') {
    return i18next.t('validation.passwordEmpty');
  }
  else if (password.length < 8) {
    return i18next.t('validation.passwordStrength');
  }
  else if (!regex.test(password)) {
    return i18next.t('validation.passwordRequirement');
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
  else if (password.length < 8) {
    return i18next.t('validation.passwordStrength');
  }
  if (password !== reTypePassword) {
    return i18next.t('validation.passwordNotMatch');
  }
  return '';
};

