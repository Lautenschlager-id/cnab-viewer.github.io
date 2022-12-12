import { useState, useEffect } from "react";

import Container from "./Container";

function getBaseComponent(props, index = 1, position = 1)
{
	return {
		key: index,
		srcHandler: props.srcHandler,
		fieldId: `${props.fieldPrefix}-${position}`,
		position: `#${position}`,
	};
}

function addChildren(setChildren, props)
{
	setChildren((previousChildren) =>
		[
			...previousChildren,
			getBaseComponent(props,
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

function clearChildren(setChildren, props)
{
	setChildren([ getBaseComponent(props, Date.now()) ]);
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
							key={index} // tmp to avoid build error
							{...childProps}
						/>
					);
				})}
			</div>
		</Container>
	);
}

