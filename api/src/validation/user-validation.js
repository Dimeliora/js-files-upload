const { check } = require('express-validator');

const MIN_PASSWORD_LENGTH = 6;
const INVALID_EMAIL_WARN = 'Invalid e-mail address';
const GET_INVALID_PASSWORD_WARN = (min) =>
    `Password must be longer than ${min} symbols`;

exports.emailValidator = check('email', INVALID_EMAIL_WARN).isEmail();

exports.passwordValidator = check(
    'password',
    GET_INVALID_PASSWORD_WARN(MIN_PASSWORD_LENGTH)
).isLength({
    min: MIN_PASSWORD_LENGTH,
});
