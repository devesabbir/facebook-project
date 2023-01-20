/**
 * Custom Error Handler
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const HandleError = (err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success : false, 
		status  :  errorStatus, 
		message : errorMessage, 
		Stack : err.stack
	});	

}

export default HandleError;
