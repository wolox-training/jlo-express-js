// Weet messages
exports.WEET_GET_FOUND = 'Weet was found';
exports.WEET_GET_NOT_FOUND = 'Weet was not found';
exports.WEET_CREATED = 'Weet was created successful';
exports.MIN_WEET_LENGTH = 1;
exports.MAX_WEET_LENGTH = 140;
exports.VALIDATE_MIN_MAX_LENGTH = `must be greater than ${this.MIN_WEET_LENGTH} and less than ${this.MAX_WEET_LENGTH} characters`;
exports.GET_WEETS_OK = 'Weets were successfully obtained';
exports.RESOURCE_DOES_NOT_EXIST = 'Resource does not exist'

// validation messages
exports.validationMessage = (keyName, msg) => `'${keyName}' ${msg}`;
exports.VALIDATE_EXISTS = 'is required';
exports.VALIDATE_IS_STRING = 'must be a string';
exports.VALIDATE_NOT_EMPTY = 'must be a non-empty';
exports.VALIDATE_PASSWORD_MATCHES = 'is not valid password';
exports.VALIDATE_EMAIL_MATCHES = 'is not a valid email address';

// status messages
exports.CREATED = 'Created';
exports.UPDATED = 'Updated';

// Hashing config
exports.PASSWORD_SALT = 10;

// Session messages
exports.BAD_CREDENTIALS = 'User Credentials are not valid';
exports.SIGN_IN_SUCCESSFUL = 'Sing in was successful';
exports.INVALID_TOKEN = 'Unauthorized for this request';
exports.ADMIN_ROLE = 'admin';
exports.REGULAR_ROLE = 'regular';

// Users
exports.GET_USERS_OK = 'Users were successfully obtained';
exports.PAGINATION_OFFSET = 0;
exports.PAGINATION_LIMIT = 5;
exports.USER_POSITIONS = ['Developer', 'Lead', 'TL', 'EM', 'HEAD', 'CEO'];
