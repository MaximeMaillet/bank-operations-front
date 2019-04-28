import api from '../../../lib/api'
import actionsUser from "../../../redux/user/actions";
import handleApiErrors from "../../../lib/handleApiErrors";


export default function(data, dispatch) {
	return api('POST', '/users/login', data)
		.then((response) => {
			dispatch(actionsUser.login(response.data.token, response.data.user));
			return response.data;
		})
		.catch(handleApiErrors);
}