import {
  ALL_DIGITS,
  EMAIL,
  FIRST_CAPITAL_LETTER,
  LATIN_LETTERS,
  NO_DIGITS,
  ONE_CAPITAL_LETTER,
  ONE_DIGIT,
  ONE_SPACE_SYMBOL,
  ONLY_LETTERS_AND_DASH,
  PHONE,
  SPECIAL_CHARACTERS,
} from '../data/validateReg';

export enum ValidateType {
  Login = 'login',
  Password = 'password',
  FirstName = 'firstname',
  LastName = 'lastname',
  File = 'file',
  Email = 'email',
  Phone = 'phone',
  Attach = 'attach',
  Message = 'message',
}

export type ValidateRule = {
  type: ValidateType;
  value: string;
};

export const validateForm = (rulesArray: ValidateRule[]) => {
  const errors: { [key: string]: string } = {};

  rulesArray.forEach(rule => {
    const { type, value } = rule;

    switch (type) {
      case ValidateType.Login:
        if (!value.length) {
          errors[type] = 'Login не может быть пустым';
          return;
        }

        if (value.match(ALL_DIGITS)) {
          errors[type] = 'Login должен содержать хотя бы одну букву';
          return;
        }

        if (value.length > 20 || value.length < 3) {
          errors[type] = 'Login должен состоять из 3 до 20 символов';
          return;
        }

        if (!value.match(LATIN_LETTERS)) {
          errors[type] = 'В login используются только латинские буквы ';
          return;
        }

        if (value.match(SPECIAL_CHARACTERS)) {
          errors[type] = 'Login не должен содержать специальные символы';
          return;
        }

        if (!value.match(ONE_SPACE_SYMBOL)) {
          errors[type] = 'Login не должен содержать специальные символы';
          return;
        }

        break;

      case ValidateType.Password:
        if (!value.length) {
          errors[type] = 'Password не может быть пустым';
          return;
        }

        if (!value.match(ONE_CAPITAL_LETTER)) {
          errors[type] = 'Password должен содержать хотя бы одну большую букву';
          return;
        }

        if (value.length > 40 || value.length < 8) {
          errors[type] = 'Password должен состоять из 8 до 40 символов';
          return;
        }

        if (!value.match(ONE_DIGIT)) {
          errors[type] = 'Password должен содержать хотя бы одноу цифру';
          return;
        }

        break;

      case ValidateType.Email:
        if (!value.length) {
          errors[type] = 'Email не может быть пустым';
          return;
        }

        if (!value.match(EMAIL)) {
          errors[type] = 'Некорректный e-mail';
          return;
        }

        break;

      case ValidateType.Phone:
        if (!value.length) {
          errors[type] = 'Phone не может быть пустым';
          return;
        }
        if (!value.match(PHONE)) {
          errors[type] = 'Некорректный phone';
          return;
        }

        if (!value.match(NO_DIGITS)) {
          errors[type] = 'Phone number не должен содержать буквы';
          return;
        }

        break;

      case ValidateType.FirstName:
        if (!value.length) {
          errors[type] = 'Name не может быть пустым';
          return;
        }

        if (!value.match(ONLY_LETTERS_AND_DASH)) {
          errors[type] = 'Name может содержать только буквы и тире';
          return;
        }

        if (!value.match(FIRST_CAPITAL_LETTER)) {
          errors[type] = 'Name должен начинаться с большой буквы';
          return;
        }

        break;

      case ValidateType.LastName:
        if (!value.length) {
          errors[type] = 'Second Name не может быть пустым';
          return;
        }

        if (!value.match(ONLY_LETTERS_AND_DASH)) {
          errors[type] = 'Second Name может содержать только буквы и тире';
          return;
        }

        if (!value.match(FIRST_CAPITAL_LETTER)) {
          errors[type] = 'Last Name должен начинаться с большой буквы';
          return;
        }

        break;

      case ValidateType.Message:
        if (!value.length) {
          errors[type] = 'Ваше сообщение не может быть пустым';
          return;
        }

        break;

      default:
        errors[type] = 'Неопределенная ошибка';
    }
  });

  return errors;
};
