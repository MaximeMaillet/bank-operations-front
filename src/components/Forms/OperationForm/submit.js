import api from '../../../lib/api'
import actionsOperation from "../../../redux/operations/actions";
import handleApiErrors from "../../../lib/handleApiErrors";
import handleNotAuthorized from "../../../lib/handleNotAuthorized";

export default function(data, dispatch) {

	return api('POST', '/users/operations', data)
		.then((response) => {
			dispatch(actionsOperation.added(response.data));
			return response.data;
		})
		.catch((e) => handleNotAuthorized(e, dispatch))
		.catch(handleApiErrors);
}