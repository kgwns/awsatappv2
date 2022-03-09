import i18next from 'i18next';

export const emailValidation = (email: string): string => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
  if (password.length < 8) {
    return i18next.t('validation.minLengthPassword');
  }
  if (password.length >20) {
    return i18next.t('validation.maxLengthPassword');
  }
  if (!regex.test(password)) {
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
  if (password.length < 8) {
    return i18next.t('validation.minLengthPassword');
  }
  if (password.length >20) {
    return i18next.t('validation.maxLengthPassword');
  }
  if (password !== reTypePassword) {
    return i18next.t('validation.passwordNotMatch');
  }
  return '';
};

