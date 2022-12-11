import { useState, useEffect } from "react";

import Container from "./Container";

function getBaseComponent(props, index = 1)
{
	return {
		key: index
	};
}

function addChildren(setChildren, props, insertedValues)
{
	setChildren((previousChildren) =>
		[
			...previousChildren,
			getBaseComponent(props, previousChildren.length + 1)
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

export default function FieldController(props)
{
	const [ children, setChildren ] = useState([ getBaseComponent(props) ]);

	return (
		<Container
			class="medium-sub-container"
			title={props.title}
		>
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
			</div>

			<div ref={props.innerRef}>
				{children.map((childProps, index) => {
					return (
						<props.field
							key={index}
							{...childProps}
						/>
					);
				})}
			</div>
		</Container>
	);
}
