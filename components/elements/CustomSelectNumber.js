import { useState, useEffect } from "react";

function updateInputValue(value, setValue, step, props)
{
	if (!/^[0-9]+$/.test(value))
	{
		if (value === '')
			setValue('');
		return;
	}

	let newValue = value * 1 + step;

	if (props.min && newValue < props.min)
		return;
	if (props.max && newValue > props.max)
		return;

	setValue(newValue);
}

export default function CustomSelectNumber(props)
{
	const [ value, setValue ] = useState(props.value || props.min || 1);
	const [ hasSkippedEffect, setHasSkippedEffect ] = useState(false);

	useEffect(() => {
		// Without this chunk, cnab.process is spammed by N component times.
		if (!hasSkippedEffect)
		{
			setHasSkippedEffect(true);
			return;
		}
		props.srcHandler();
	}, [ value ]);

	return (
		<div className="flex">
			<input
				ref={props.innerRef}
				type="number"
				min={props.min}
				max={props.max}
				value={value}
				onInput={(e) => updateInputValue(e.target.value, setValue, 0, props)}
				className={props.isCNABField ? "field" : ""}
			/>
			<div className="quantity">
				<button
					className="up"
					onClick={() => updateInputValue(value, setValue, 1, props)}
				>▲</button>
				<button
					className="down"
					onClick={() => updateInputValue(value, setValue, -1, props)}
				>▼</button>
			</div>
		</div>
	);
}
