/**
 * Create Custom Error
 * @param {status} status 
 * @param {message} message 
 * @returns error
 */

const CreateError = ( status, message) => {
	const error = new Error();
	error.status = status
	error.message = message; 
	return error;
}

export default CreateError;