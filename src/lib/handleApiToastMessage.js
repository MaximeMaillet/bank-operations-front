import {toast} from "react-semantic-toasts";

export default (error) => {
	toast({
		position: 'top-right',
		type: 'error',
		title: 'An error is occured',
		description: error.message,
		animation: 'bounce',
		time: 10000
	});
}