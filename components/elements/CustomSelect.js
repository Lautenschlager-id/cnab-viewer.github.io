function _CustomOption(props)
{
	let value = props.option.toLowerCase().replaceAll(' ', '_');
	return (
		<option value={value}>
			{props.option}
		</option>
	);
}

const mapFromDynamicOption = (opt, index) => (
	<_CustomOption
		key={index}
		option={opt}
	/>
);

export default function CustomSelect(props)
{
	let options = props.options?.split(',') || [];
	options = options.map(mapFromDynamicOption);

	return (
		<select
			ref={props.innerRef}
			className={props.isCNABField ? "field" : ""}
			onChange={props.srcHandler}
		>
			{options}
		</select>
	);
}
