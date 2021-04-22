class InvalidArgumentError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidArgumentError';
    }
  }
  
  class InternalServerError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InternalServerError';
    }
  }
  
  class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
    }
  }
  
  class MethodNotAllowedError extends Error {
    constructor(message, replaceDefault) {
      const defaultMessage = 'Operação não permitida!';
      if (!message) { 
        message = defaultMessage 
      } else {
        if (!replaceDefault) message = `${defaultMessage} ${message}`   
      }       
      super(message);
      this.name = 'MethodNotAllowedError';
    }
  }
  
  class NotFoundError extends Error {
    constructor (message) {
      const defaultMessage = 'Registro não encontrado!'
      if (!message) { message = defaultMessage }
      super(message)
      this.name = 'NotFoundError'
    }
  }
  
  class UnauthorizedError extends Error {
    constructor () {
      const message = 'Acesso não autorizado!'
      super(message)
      this.name = 'UnauthorizedError'
    }
  } 
  
  class EmailNotVerifiedError extends Error {
    constructor () {
      const message = 'Este e-mail ainda não foi verificado!'
      super(message)
      this.name = 'EmailNotVerifiedError'
    }
  }
  
  class InvalidCredentialsError extends Error {
    constructor () {
      const message = 'Credenciais inválidas!'
      super(message)
      this.name = 'InvalidCredentialsError'
    }
  }
  
  module.exports = {
    InvalidArgumentError, 
    InternalServerError,
    MethodNotAllowedError,
    BadRequestError, 
    UnauthorizedError, 
    NotFoundError, 
    EmailNotVerifiedError, 
    InvalidCredentialsError 
  };