import { reducer as formReducer } from 'redux-form';
import UserReducer from './user/reducer';
import OperationsReducer from './operations/reducer';

export default {
	form: formReducer,
	user: UserReducer,
	operations: OperationsReducer,
};