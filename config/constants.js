// Weet messages
exports.WEET_GET_FOUND = 'Weet was found';
exports.WEET_GET_NOT_FOUND = 'Weet was not found';

// validation messages
exports.validationMessage = (keyName, msg) => `'${keyName}' ${msg}`;
exports.VALIDATE_EXISTS = 'is required';
exports.VALIDATE_IS_STRING = 'must be a string';
exports.VALIDATE_NOT_EMPTY = 'must be a non-empty';
exports.VALIDATE_PASSWORD_MATCHES = 'is not valid password';
exports.VALIDATE_EMAIL_MATCHES = 'is not a valid email address';

// status messages
exports.CREATED = 'Created';

// Hashing config
exports.PASSWORD_SALT = 10;

// Session messages
exports.BAD_CREDENTIALS = 'User Credentials are not valid';
exports.SIGN_IN_SUCCESSFUL = 'Sing in was successful';
exports.INVALID_TOKEN = 'Unauthorized for this request';

// Users
exports.GET_USERS_OK = 'Users were successfully obtained';
exports.PAGINATION_OFFSET = 0;
exports.PAGINATION_LIMIT = 5;
