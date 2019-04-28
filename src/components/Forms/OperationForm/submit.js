import api from '../../../lib/api'
import actionsOperation from "../../../redux/operations/actions";
import handleApiErrors from "../../../lib/handleApiErrors";
import handleNotAuthorized from "../../../lib/handleNotAuthorized";

export default function(data, dispatch) {
	if(data.tags) {
		data.tags = data.tags.map((item) => item.value);
	}

	if(data.id) {
		return api('PATCH', `/users/operations/${data.id}`, data)
			.then((response) => {
				dispatch(actionsOperation.reLoad());
				return response.data;
			})
			.catch((e) => handleNotAuthorized(e, dispatch))
			.catch(handleApiErrors);
	} else {
		return api('POST', '/users/operations', data)
			.then((response) => {
				dispatch(actionsOperation.reLoad());
				return response.data;
			})
			.catch((e) => handleNotAuthorized(e, dispatch))
			.catch(handleApiErrors);
	}
}