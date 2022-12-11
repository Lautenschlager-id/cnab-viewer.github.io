export default function CustomTextArea(props)
{
	return (
		<>
			<div className="square blue" />
			<textarea
				ref={props.innerRef}
				required={props.required}
				placeholder={props.placeholder}
				spellCheck="false"
				style={{width: props.width}}
			/>
		</>
	);
}
