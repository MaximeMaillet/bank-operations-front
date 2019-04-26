export default async(method, endpoint, parameters, queryString, headers) => {

	const params = new URLSearchParams();

	if(queryString) {
		for(let param in queryString) {
			params.set(param, queryString[param]);
		}
	}

	if(method === 'GET' && parameters) {
		for(let param in parameters) {
			params.set(param, parameters[param]);
		}
	}

	const config = {
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		method,
	};

	if(method !== 'GET') {
		config['body'] = JSON.stringify(parameters);
	}

	const result = await fetch(`${process.env.REACT_APP_REST_API_LOCATION}/api${endpoint}${params.toString()}`, config);

	if (result.headers.has('content-type')) {
		if(result.headers.get('content-type').match(/^application\/json/i)) {
			result.data = await result.json();
		} else if(result.headers.get('content-type').match(/^application\/pdf/i)) {
			result.data = await result.blob();
		} else {
			result.data = await result.text();
		}
	} else {
		result.data = await result.text();
	}

	if (result.status.toString().substr(0,1) !== '2') {
		throw result;
	}

	return result;
};