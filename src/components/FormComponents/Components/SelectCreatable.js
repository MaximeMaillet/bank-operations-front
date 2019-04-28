import React from 'react';
import {Form} from "semantic-ui-react";
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';

const handleLoad = (input, callback) => {
	if(callback) {
		return callback(input);
	}

	return new Promise((resolve) => resolve([]));
};

export default function(field) {
	const {meta, input, width, load, formatChange, ...rest} = field;
	let value = input.value;

	if(!rest.isMulti) {
		value = {label: input.value, value: input.value, key: input.value};
	}

	return <Form.Field width={width}>
			<AsyncCreatableSelect
				className='form-errors'
				value={value}
				valueKey="value"
				isValid={meta.valid}
				onChange={(value) => input.onChange(formatChange ? formatChange(value) : value)}
				loadOptions={(i) => handleLoad(i, load)}
				styles={{
					control: (provided) => {
						if(!meta.valid) {
							return {
								...provided,
								color: '#9f3a38',
								backgroundColor: '#fff6f6',
								borderColor: '#e0b4b4',
							}
						}
						return provided;
					}
				}}
				{...rest}
			/>
			<div className={`form-input-errors ${!meta.valid ? 'visible':'hidden'}`}>{meta.error}</div>
		</Form.Field>;
}