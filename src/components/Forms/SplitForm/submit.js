import api from "../../../lib/api";
import clone from "lodash.clone";
import handleApiErrors from "../../../lib/handleApiErrors";
import handleNotAuthorized from "../../../lib/handleNotAuthorized";
import actionsOperation from "../../../redux/operations/actions";


export default function(data, dispatch) {
	const _data= clone(data);
	for(const i in _data.subs) {
		if(_data.subs[i].tags) {
			_data.subs[i].tags = _data.subs[i].tags.map((item) => item.value);
		}
	}

	return api('POST', `/users/operations/${data.id}/sub_operations`, _data)
		.then(() => dispatch(actionsOperation.reload()))
		.catch((e) => handleNotAuthorized(e, dispatch))
		.catch(handleApiErrors);
}