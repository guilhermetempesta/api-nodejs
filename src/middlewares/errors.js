const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken')
const { ValidationError } = require('sequelize')

module.exports = (error, req, res, next) => {
  
    let status = 500

    const errorBody = {
        name: error.name,
        message: error.message
    }

    if (error.name === 'BadRequestError') status = 400
    if (error.name === 'InvalidArgumentError') status = 400
    if (error.name === 'UnauthorizedError') status = 401
    if (error.name === 'AccountBlockedError') status = 401
    if (error.name === 'InvalidCredentialsError') status = 401
    if (error.name === 'EmailNotVerifiedError') status = 401
    if (error.name === 'NotFoundError') status = 404
    if (error.name === 'NotAllowedError') status = 405

    if ((error instanceof JsonWebTokenError) ||
        (error instanceof TokenExpiredError)) {
        status = 401
        errorBody.message = 'Acesso não autorizado!'
    }

    if (error instanceof ValidationError) {
        status = 400
        errorBody.name = 'ValidationError'
        errorBody.message = error.errors[0].message
    }

    console.log('status: ' + status, 'error: ' + error)

    res.status(status).json(errorBody)
}