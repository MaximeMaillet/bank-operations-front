import { reducer as formReducer } from 'redux-form';
import UserReducer from './user/reducer';
import OperationsReducer from './operations/reducer';
import CurrentPeriod from './currentPeriod/reducer';
import StatisticsReducer from './statistics/reducers';

export default {
	form: formReducer,
	user: UserReducer,
	operations: OperationsReducer,
	currentPeriod: CurrentPeriod,
	statistics: StatisticsReducer,
};