import UserReducer from './user/reducer';
import { reducer as formReducer } from 'redux-form';

export default {
	form: formReducer,
	user: UserReducer,
};