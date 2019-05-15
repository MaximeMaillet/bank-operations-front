import {SubmissionError} from "redux-form";

export default (e) => {
	const error = e.data;
	let mainMessage = 'An error occured';
	if(error && error.message) {
		mainMessage = error.message;
	}

	throw new SubmissionError({
		_error: mainMessage,
		...(error ? error.errors : {}),
	});
}
