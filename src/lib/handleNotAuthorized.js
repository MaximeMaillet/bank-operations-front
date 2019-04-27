import actionsUser from '../redux/user/actions';

export default (e, dispatch) => {
	if(e.status === 401) {
		dispatch(actionsUser.logout());
	}

	return true;
}