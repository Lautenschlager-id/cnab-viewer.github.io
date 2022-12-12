import { useState, useEffect } from "react";

import Container from "../Container";
import FileInput from "./FileInput";

function getBaseComponent(props, insertedValues, index = 1, position = 1)
{
	return {
		key: index,
		srcHandler: props.srcHandler,
		fieldId: `${props.fieldPrefix}-${position}`,
		position: `#${position}`,
		...insertedValues
	};
}

function addChildren(setChildren, props, insertedValues)
{
	setChildren((previousChildren) =>
		[
			...previousChildren,
			getBaseComponent(props, insertedValues,
				previousChildren[previousChildren.length - 1].key + 1,
				previousChildren.length + 1)
		]
	);
}

function remChildrenCbk(previousChildren)
{
	if (previousChildren.length == 1)
		return previousChildren;

	const newChildren = [ ...previousChildren ];
	newChildren.pop();
	return newChildren;
}

function remChildren(setChildren)
{
	setChildren(remChildrenCbk);
}

function clearChildren(setChildren, props, insertedValues)
{
	setChildren([ getBaseComponent(props, insertedValues, Date.now()) ]);
}

export default function FieldController(props)
{
	const [ children, setChildren ] = useState([ getBaseComponent(props) ]);
	useEffect(props.srcHandler, [ children ]);

	return (
		<Container
			class="medium-sub-container"
			title={props.title}
		>
			<FileInput
				title={props.title.split(" - ").pop()}
				onFileDataValidated={
					(data) => props.fileInputData.
						onFileDataValidated(data, props, setChildren, clearChildren, addChildren)
				}
				fileInputData={props.fileInputData}
			/>
			<div>
				<button
					type="action"
					onClick={() => addChildren(setChildren, props)}
				>
					+
				</button>
				&nbsp;
				<button
					type="action"
					onClick={() => remChildren(setChildren)}
				>
					-
				</button>
				&nbsp;
				<button
					type="action"
					className="red"
					onClick={() => clearChildren(setChildren, props)}
				>
					x
				</button>
			</div>

			<div ref={props.innerRef}>
				{children.map((childProps, index) => {
					return (
						<props.field
							key={index} // tmp to avoid build error
							{...childProps}
						/>
					);
				})}
			</div>
		</Container>
	);
}
