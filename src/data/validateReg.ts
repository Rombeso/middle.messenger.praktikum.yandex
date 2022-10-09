export const EMAIL = /^\S+@\S+\.([A-Za-z]{2,4})$/;

export const PHONE = /^[\d\+][\d\(\)\ -]{10,15}\d$/;

export const ONE_CAPITAL_LETTER = /[A-Z]+/;

export const FIRST_CAPITAL_LETTER = /^[A-ZА-Я]+.*$/;

export const ONLY_LETTERS_AND_DASH = /^[A-ZА-Яa-zа-я-]+$/;

export const LATIN_LETTERS = /[a-zA-z]+/;

export const ONE_DIGIT = /[0-9]+/;

export const NO_DIGITS = /[a-zA-Z\(\)\ -]/;

export const ALL_DIGITS = /^\d+$/;

export const SPECIAL_CHARACTERS = /[^\s\w\dа-яА-ЯёЁ]/;

export const ONE_SPACE_SYMBOL = /^\S*$/;
