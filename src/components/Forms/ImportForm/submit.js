import api from '../../../lib/api'
import actionsOperation from "../../../redux/operations/actions";
import actionsStats from "../../../redux/statistics/actions";
import handleNotAuthorized from "../../../lib/handleNotAuthorized";
import handleApiErrors from "../../../lib/handleApiErrors";

export default function(data, dispatch) {
	const file = data.file;
	const formData = new FormData();
	formData.append('csv', file, file.name);

	return api('PUT', `/users/operations`, formData, {'Content-Type': ''})
		.then((response) => {
			dispatch(actionsOperation.reload());
			dispatch(actionsStats.reload());
			return response.data;
		})
		.catch((e) => handleNotAuthorized(e, dispatch))
		.catch(handleApiErrors);
}