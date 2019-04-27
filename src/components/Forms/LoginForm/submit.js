import {SubmissionError} from "redux-form";
import api from '../../../lib/api'
import actionsUser from "../../../redux/user/actions";


export default async function(data, dispatch) {
	try {
		const response = await api('POST', '/users/login', {
			username: data.username,
			password: data.password,
		});

		dispatch(actionsUser.login(response.data));
		return response.data;
	} catch(e) {
		const errors = {};
		e.data.errors.map(err => errors[err.field] = err.message);
		throw new SubmissionError({
			_error: e.data.message,
			...errors,
		});
	}
}