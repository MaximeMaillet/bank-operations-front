import {SubmissionError} from "redux-form";

export default (e) => {
	const error = e.data;
	let mainMessage = 'An error occured';
	const _errors = {};

	if(error.message) {
		mainMessage = error.message;
	}
	if(error.errors && Array.isArray(error.errors)) {
		error.errors.map(err => _errors[err.field] = err.message);
	}

	throw new SubmissionError({
		_error: mainMessage,
		..._errors,
	});
}