import React, {Component} from 'react';
import {HotKeys} from "react-hotkeys";

export default class ModalComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		}

		this.keyMap = {
			onEnter: 'enter',
		};

		this.handlers = {
			onEnter: (event) => {
				this.onEnter();
				console.log(this.props.component)
			}
		}
	}

	handleClose = () => {
		console.log('handle close')
		this.setState({ isOpen: false });
	};

	handleOpen = () => this.setState({ isOpen: true });

	onEnter = () => {
		console.log('onEnter')
	}

	render() {

		return <HotKeys keyMap={this.keyMap} handlers={this.handlers}>
			{React.cloneElement(this.props.component, { close: this.onEnter })}
		</HotKeys>
	}
}