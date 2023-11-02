import ErrorCategory from '../enums/errorCategory';

const ErrorDitionary = {
  //#region ERR0000 ... ERR0099 = Generales aplicativo
  INTERNAL_SERVER_ERROR: {
    code: 1,
    category: ErrorCategory.SYSTEM,
    msg: 'INTERNAL_SERVER_ERROR',
    description: 'An unexpected error occurred on the server. Please try again later.',
  },
  NOT_FOUND: {
    code: 2,
    category: ErrorCategory.USER,
    msg: 'NOT_FOUND',
    description: 'The requested resource was not found.',
  },
  CANNOT_UPDATE_DUE_TO_OUTDATED_DATA: {
    code: 3,
    category: ErrorCategory.USER,
    msg: 'CANNOT_UPDATE_DUE_TO_OUTDATED_DATA',
    description: 'The data is outdated and cannot be updated.',
  },
  INVALID_PAGINATION_FORMAT: {
    code: 4,
    category: ErrorCategory.USER,
    msg: 'INVALID_PAGINATION_FORMAT',
    description: 'The pagination format is invalid.',
  },
  INVALID_PAGINATION_LIMIT: {
    code: 5,
    category: ErrorCategory.USER,
    msg: 'INVALID_PAGINATION_LIMIT',
    description: '',
  },
  INVALID_PARAMETERS: {
    code: 6,
    category: ErrorCategory.USER,
    msg: 'INVALID_PARAMETERS',
    description: 'Ensure that at least one parameter is brought.',
  },
  MISSING_PARAMETERS: {
    code: 7,
    category: ErrorCategory.USER,
    msg: 'MISSING_PARAMETERS',
    description: 'One or more required parameters are missing.',
  },
  DUPLICATED_KEY: {
    code: 8,
    category: ErrorCategory.USER,
    msg: 'DUPLICATED_KEY',
    description: 'A duplicate key was found.',
  },
  BAD_REQUEST: {
    code: 9,
    category: ErrorCategory.USER,
    msg: 'BAD_REQUEST',
    description: 'The request was malformed or invalid.',
  },
  METHOD_DEPRECATED: {
    code: 10,
    category: ErrorCategory.USER,
    msg: 'METHOD_DEPRECATED',
    description: 'The method used is deprecated.',
  },
  DATABASE_UNAVAILABLE: {
    code: 11,
    category: ErrorCategory.SYSTEM,
    msg: 'DATABASE_UNAVAILABLE',
    description: 'The database is currently unavailable.',
  },
  SERVICE_UNAVAILABLE: {
    code: 12,
    category: ErrorCategory.SYSTEM,
    msg: 'SERVICE_UNAVAILABLE',
    description: 'The service is currently unavailable.',
  },
  COLUMN_NOT_FOUND: {
    code: 13,
    category: ErrorCategory.SYSTEM,
    msg: 'COLUMN_NOT_FOUND',
    description: 'The specified column was not found in the database.',
  },
  DUPLICATED_ID_FOUND: {
    code: 14,
    category: ErrorCategory.SYSTEM,
    msg: 'DUPLICATED_ID_FOUND',
    description: 'A duplicate ID was found in the database.',
  },
  ITEM_INACTIVE: {
    code: 15,
    category: ErrorCategory.SYSTEM,
    msg: 'ITEM_INACTIVE',
    description: 'The requested item is inactive.',
  },
  RULE_NOT_APPLY: {
    code: 16,
    category: ErrorCategory.BUSINESS,
    msg: 'RULE_NOT_APPLY',
    description: 'The business rule does not apply.',
  },
  CANNOT_CONNECT_TO_DATABASE: {
    code: 17,
    category: ErrorCategory.SYSTEM,
    msg: 'CANNOT_CONNECT_TO_DATABASE',
    description: 'Unable to establish a connection to the database.',
  },
  API_VERSION_NOT_SUPPORTED: {
    code: 18,
    category: ErrorCategory.SYSTEM,
    msg: 'API_VERSION_NOT_SUPPORTED',
    description: 'The API version you are trying to access is not supported.',
  },
  API_LIMIT_REACHED: {
    code: 19,
    category: ErrorCategory.SYSTEM,
    msg: 'API_LIMIT_REACHED',
    description: 'You have reached the limit of API calls.',
  },
  API_KEY_INVALID: {
    code: 20,
    category: ErrorCategory.SYSTEM,
    msg: 'API_KEY_INVALID',
    description: 'The API key provided is invalid.',
  },
  //#endregion General
  //#region ERR0100 ... ERR0199 = PR-Moments
  PARTICIPANTS_MUST_BE_ADULTS: {
    code: 1001,
    category: ErrorCategory.BUSINESS,
    msg: 'PARTICIPANTS_MUST_BE_ADULTS',
    description: 'Couple participants must be adults',
  },
  INVALID_PARTICIPANT_ROLE: {
    code: 1002,
    category: ErrorCategory.BUSINESS,
    msg: 'INVALID_PARTICIPANT_ROLE',
    description: 'The role assigned to the participant is invalid.',
  },
  PARTICIPANT_NOT_FOUND: {
    code: 1003,
    category: ErrorCategory.BUSINESS,
    msg: 'PARTICIPANT_NOT_FOUND',
    description: 'The specified participant was not found.',
  },
  //#endregion PR-Moments
};

export default ErrorDitionary;
