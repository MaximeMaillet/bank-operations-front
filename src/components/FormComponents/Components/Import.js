import React from "react";
import Dropzone from "react-dropzone";
import {Button, Header, Icon, Segment} from "semantic-ui-react";

export default function(field) {
	const {meta} = field;
	const onDrop = (acceptedFiles) => {
		field.input.onChange(acceptedFiles[0]);
	};

	return (
		<div>
			<Dropzone
				name={field.name}
				onDrop={( filesToUpload, e ) => onDrop(filesToUpload)}
			>
				{({getRootProps, getInputProps}) => (
					<div {...getRootProps()}>
					<Segment placeholder inverted={!meta.valid} color={!meta.valid ? 'red' : (meta.dirty && meta.valid ? 'green' : 'grey')}>
						<Header icon>
							<Icon name={field.icon} />
							Drag 'n' drop some files here, or click to select files
						</Header>
						<input {...getInputProps()} />
						<Button primary>Add Document</Button>
					</Segment>
					</div>
				)}
			</Dropzone>
		</div>
	);
}