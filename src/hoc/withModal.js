import React from 'react';
import {HotKeys} from "react-hotkeys";

export default (BaseComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				isOpen: false,
				closeEnable: true,
			};

			this.child = null;

			this.keyMap = {
				onKeyEnter: 'enter',
			};

			this.handlers = {
				onKeyEnter: () => {
					console.log('enter')
					if(this.child) {
						this.child.onKeyEnter();
					}
				}
			}
		}

		handleClose = () => {
			if(this.state.closeEnable) {
				this.setState({ isOpen: false })
			}
		};

		handleOpen = () => this.setState({ isOpen: true });

		unlockClose = () => {
			if(!this.state.closeEnable) {
				this.setState({ closeEnable: true });
			}
		};

		lockClose = () => {
			this.setState({ closeEnable: false });
		};

		render() {
			return (
				<HotKeys keyMap={this.keyMap} handlers={this.handlers}>
					<BaseComponent
						{...this.props}
						onRef={(childRef) => (this.child = childRef)}
						open={this.handleOpen}
						close={this.handleClose}
						unlockClose={this.unlockClose}
						lockClose={this.lockClose}
						closeable={this.state.closeEnable}
						isOpen={this.state.isOpen}
					/>
				</HotKeys>
			);
		}
	}
}