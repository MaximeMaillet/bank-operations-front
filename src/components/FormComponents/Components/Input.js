import React from "react";
import { Form, Message } from 'semantic-ui-react'

export default function(field) {
	const {meta, input, type, placeHolder, width, ...rest} = field;
	return <Form.Field width={width}>
		<Form.Input
			error={!field.meta.valid}
			{...input}
			type={type || 'text'}
			placeholder={placeHolder}
			{...rest}
		/>
		<div className={`form-input-errors ${!meta.valid ? 'visible':'hidden'}`}>{meta.error}</div>
	</Form.Field>;
}