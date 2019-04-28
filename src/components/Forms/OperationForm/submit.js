import api from '../../../lib/api'
import actionsOperation from "../../../redux/operations/actions";
import actionsStats from "../../../redux/statistics/actions";
import handleApiErrors from "../../../lib/handleApiErrors";
import handleNotAuthorized from "../../../lib/handleNotAuthorized";
import clone from 'lodash.clone';

export default function(data, dispatch) {
	const _data= clone(data);
	if(_data.tags) {
		_data.tags = _data.tags.map((item) => item.value);
	}

	let promise = null;
	if(data.id) {
		promise = api('PATCH', `/users/operations/${data.id}`, _data);
	} else {
		promise = api('POST', '/users/operations', _data);
	}

	return promise
		.then((response) => {
			dispatch(actionsOperation.reload());
			dispatch(actionsStats.reload());
			return response.data;
		})
		.catch((e) => handleNotAuthorized(e, dispatch))
		.catch(handleApiErrors);
}