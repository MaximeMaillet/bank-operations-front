import React from "react";
import { Form, Message } from 'semantic-ui-react'

export default function(field) {
	return (
		<div>
			<Form.Input
				error={!field.meta.valid}
				{...field.input}
				type={field.type || 'text'}
				placeholder={field.placeholder}
			/>
			<Message
				error
				size='tiny'
				hidden={field.meta.valid}
				header={field.meta.error}
				style={{
					marginBottom: '1em'
				}}
			/>
		</div>
	);
}