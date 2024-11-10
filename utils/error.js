export const errorHandler = (statusCode, message ) =>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error  // returns an error object with the status code and message
}