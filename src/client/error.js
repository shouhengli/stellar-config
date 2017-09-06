function ClientError(cause) {
  const causeIsString = typeof cause === 'string';

  if (causeIsString) {
    this.message = cause;
  } else {
    this.message = cause.message;
    this.cause = cause;
  }

  this.name = this.constructor.name;

  if (Error.hasOwnProperty('captureStackTrace')) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    if (causeIsString) {
      this.stack = (new Error(cause)).stack;
    } else {
      this.stack = (new Error(cause.message)).stack;
    }
  }
}

ClientError.prototype = Object.create(Error.prototype);

module.exports = ClientError;
