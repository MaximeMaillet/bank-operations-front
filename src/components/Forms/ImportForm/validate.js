export default function validate(values) {
	const errors = {};
	const acceptedFiles = ['text/csv'];

	if(values.file) {
		if(acceptedFiles.indexOf(values.file.type) === -1) {
			errors._error = 'This file is not accepted';
			errors.file = 'This file is not accepted';
		}
	}
	return errors
}