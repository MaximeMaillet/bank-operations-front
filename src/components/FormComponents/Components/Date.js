import React from "react";
import { Form, } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import moment from "moment";

import '../form.scss'

class CustomInput extends React.Component {
	render() {
		const {value, meta, placeHolder, icon, iconPosition, onClick} = this.props;
		return (
			<Form.Input
				value={value}
				fluid
				onClick={onClick}
				icon={icon ? icon : 'calendar check outline'}
				iconPosition={iconPosition ? iconPosition : 'left'}
				placeholder={placeHolder}
				error={!meta.valid}
			/>
		);
	}
}

export default function(field) {
	const {meta, input, placeHolder, dateFormat, width} = field;
	return <Form.Field width={width}>
		<DatePicker
			selected={input.value ? input.value : null}
		  dateFormat={dateFormat || 'd/MM/YYYY'}
			onChange={(value) => {
				return input.onChange(moment(value).utc().toDate())
			}}
			todayButton="Today"
			dropdownMode="scroll"
			customInput={<CustomInput meta={meta} placeHolder={placeHolder} />}
			className='react-datepicker-custom'
		/>
		<div className={`form-input-errors ${!meta.valid ? 'visible':'hidden'}`}>{meta.error}</div>
	</Form.Field>;
}