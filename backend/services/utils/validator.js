import validator from 'validator';

function isEmail(value) {
  if (!value) return false;
  return validator.isEmail(value);
}

function isUsername(value) {
  if (!value) return false;
  return validator.isAlphanumeric(value) && value.length >= 6;
}

function isPassword(value) {
  if (!value) return false;
  return value.length >= 8;
}

export default {
  isEmail,
  isUsername,
  isPassword
}
